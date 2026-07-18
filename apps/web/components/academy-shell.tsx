"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { knowledgeNodes, unresolvedPrerequisites } from "@/lib/curriculum/knowledge-graph";
import { mvpLessons, ratioGasFlowLesson } from "@/lib/curriculum/courses";
import {
  estimateDiagnosticLevel,
  evaluateChoice,
  ratioDiagnosticQuestions,
  selectNextDiagnosticQuestion
} from "@/lib/diagnostics/diagnostic-engine";
import { evaluateRatioAttempt } from "@/lib/exercises/ratio-gas-flow";
import { classifyMastery, initialMastery, updateMastery } from "@/lib/mastery/mastery-engine";
import { scheduleReview } from "@/lib/review/review-scheduler";
import { mockTutorResponse } from "@/lib/ai/tutor";
import type { DiagnosticAnswer, MasteryState, ReviewItem, TutorResponse } from "@/lib/types";

type View = "dashboard" | "diagnostic" | "lesson" | "practice" | "review" | "tutor" | "map";

type AcademyState = {
  answers: DiagnosticAnswer[];
  mastery: Record<string, MasteryState>;
  reviews: ReviewItem[];
  xp: number;
  streak: number;
  h2Slm: number;
  precursorSccm: number;
  submittedRatio: string;
  ratioFeedback: string;
  diagnosticFeedback: string;
  tutorResponse: TutorResponse;
  note: string;
};

const STORAGE_KEY = "epiMaterialsMasteryMvpState";
const USER_ID = "local-mvp-user";

const defaultState: AcademyState = {
  answers: [],
  mastery: {},
  reviews: [],
  xp: 0,
  streak: 1,
  h2Slm: 20,
  precursorSccm: 200,
  submittedRatio: "",
  ratioFeedback: "아직 제출 전입니다. 이 값들은 특정 장비 recipe가 아닌 교육용 가상값입니다.",
  diagnosticFeedback: "첫 문제를 풀면 정답 여부와 보충해야 할 선수개념이 바로 표시됩니다.",
  tutorResponse: mockTutorResponse({
    nodeId: "epi-gas-ratio",
    userMessage: "비율과 가스 유량을 수포자 관점으로 설명해줘.",
    learnerLevel: "math-anxious-field-engineer",
    mode: "beginner"
  }),
  note: ""
};

export function AcademyShell({ initialView }: { initialView: View }) {
  const [view, setView] = useState<View>(initialView);
  const [state, setState] = useState<AcademyState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(ratioGasFlowLesson.id);
  const [packetFeedback, setPacketFeedback] = useState("아직 복사하지 않았습니다.");
  const nextQuestion = selectNextDiagnosticQuestion(state.answers);
  const activeMastery = state.mastery["epi-gas-ratio"] ?? initialMastery(USER_ID, "epi-gas-ratio");
  const masteryByNode = useMemo(
    () => Object.fromEntries(Object.entries(state.mastery).map(([nodeId, mastery]) => [nodeId, mastery.masteryScore])),
    [state.mastery]
  );
  const gaps = unresolvedPrerequisites("epi-gas-ratio", masteryByNode);
  const diagnosticLevel = estimateDiagnosticLevel(state.answers);
  const ratio = state.precursorSccm > 0 ? state.h2Slm * 1000 / state.precursorSccm : 0;
  const h2Sccm = state.h2Slm * 1000;
  const learningLoop = buildLearningLoop(state, activeMastery.masteryScore);
  const selectedLesson = mvpLessons.find((lesson) => lesson.id === selectedLessonId) ?? ratioGasFlowLesson;
  const selectedLessonNode = knowledgeNodes.find((node) => node.id === selectedLesson.nodeId);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState({ ...defaultState, ...JSON.parse(stored) as AcademyState });
      } catch {
        setState(defaultState);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const readiness = computeReadiness(state.mastery, state.answers);
  const packet = buildLocalPacket(state, readiness, gaps.map((item) => item.titleKo));

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">MS</span>
          <div>
            <strong>EPI Materials Mastery</strong>
            <div className="muted">Field Technician → Materials Science M.S. → EPI Fellow path</div>
          </div>
        </div>
        <nav className="top-nav" aria-label="main navigation">
          <Link href="/">홈</Link>
          <Link href="/diagnostic">진단</Link>
          <Link href="/lesson/ratio-gas-flow">수업</Link>
          <Link href="/practice">실습</Link>
          <Link href="/review">복습</Link>
          <Link href="/tutor">AI Tutor</Link>
          <Link href="/knowledge-map">지도</Link>
        </nav>
      </header>

      <section className="layout">
        <section className="hero">
          <div>
            <p className="eyebrow">오늘의 운영 브리핑</p>
            <h1>오늘은 단위와 비율을 장비 언어로 바꾸는 날입니다.</h1>
            <p>
              수포자 친화 루프는 현상, 그림, 숫자, 공식, 현장 문장 순서로 갑니다.
              H2와 precursor 유량은 교육용 가상값이며 실제 장비 recipe나 setpoint가 아닙니다.
            </p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={() => setView(nextQuestion ? "diagnostic" : "practice")}>
                {nextQuestion ? "진단 이어가기" : "실습으로 이동"}
              </button>
              <button className="btn" type="button" onClick={() => setView("map")}>지식지도 보기</button>
            </div>
          </div>
          <article className="stat">
            <span>Current mastery</span>
            <strong>{activeMastery.masteryScore}%</strong>
            <small>{classifyMastery(activeMastery.masteryScore)} · XP {state.xp} · streak {state.streak}</small>
            <ProgressBar value={activeMastery.masteryScore} />
            <small>{hydrated ? "로컬 저장 활성" : "저장 상태 확인 중"}</small>
          </article>
        </section>

        <section className="session-rail" aria-label="daily learning loop">
          {learningLoop.map((step) => (
            <button
              className={`rail-step ${step.done ? "done" : ""} ${view === step.view ? "active" : ""}`}
              key={step.label}
              aria-label={step.label}
              onClick={() => setView(step.view)}
              type="button"
            >
              <span>{step.index}</span>
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </button>
          ))}
        </section>

        {view === "dashboard" && (
          <>
            <section className="stats-grid" aria-label="readiness dashboard">
              {readiness.map((item) => (
                <article className="stat" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                  <small>{item.reason}</small>
                  <ProgressBar value={item.value} />
                </article>
              ))}
            </section>
            <section className="grid-2">
              <article className="panel action-panel">
                <p className="eyebrow">Today's learning</p>
                <h2>현재 가장 중요한 학습: 비율과 단위 환산</h2>
                <p>
                  이유: Arrhenius plot, gas ratio, wafer uniformity, SPC를 이해하려면 먼저 숫자와 단위를 두려워하지 않아야 합니다.
                  오늘 권장 시간은 25분입니다.
                </p>
                <button className="btn primary" type="button" onClick={() => setView("diagnostic")}>진단 시작</button>
              </article>
              <article className="panel">
                <p className="eyebrow">Prerequisite gaps</p>
                <h2>선수개념 자동 보충</h2>
                {gaps.length ? (
                  gaps.slice(0, 6).map((gap) => <p key={gap.id}>• {gap.titleKo}: {gap.learningObjectives[0]}</p>)
                ) : (
                  <p>현재 `EPI 가스 유량 비율`의 선행 노드는 기준 이상입니다. 다음은 growth-rate regime으로 확장할 수 있습니다.</p>
                )}
              </article>
            </section>
            <section className="grid-3">
              <article className="panel compact">
                <p className="eyebrow">Why this matters</p>
                <h2>장비 화면의 숫자를 무서워하지 않게 만드는 첫 단계</h2>
                <p>유량, 압력, 두께, 온도, uniformity는 모두 단위와 비율 감각 위에 올라갑니다.</p>
              </article>
              <article className="panel compact">
                <p className="eyebrow">Today's output</p>
                <h2>내 말로 설명할 문장</h2>
                <p>“먼저 단위를 sccm으로 맞춘 뒤 H2와 precursor를 비교하면 비율을 안전하게 계산할 수 있습니다.”</p>
              </article>
              <article className="panel compact warning-panel">
                <p className="eyebrow">Safety boundary</p>
                <h2>교육용 값과 현장 recipe는 분리</h2>
                <p>이 앱의 숫자는 연습용입니다. 실제 조건은 공식 교육과 승인 문서만 따릅니다.</p>
              </article>
            </section>
            <section className="panel">
              <p className="eyebrow">MVP course spine</p>
              <h2>첫 출시용 10개 실제 수업</h2>
              <div className="roadmap">
                {mvpLessons.slice(0, 10).map((lesson) => (
                  <button
                    className={`stage-card lesson-option ${lesson.id === selectedLesson.id ? "current" : ""}`}
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    type="button"
                  >
                    <span>{lesson.estimatedMinutes} min · {lesson.nodeId}</span>
                    <strong>{lesson.title}</strong>
                    <small>{lesson.masteryEvidence[0]}</small>
                  </button>
                ))}
              </div>
            </section>
            <section className="grid-2">
              <article className="panel selected-lesson">
                <p className="eyebrow">Selected lesson</p>
                <h2>{selectedLesson.title}</h2>
                <p>{selectedLessonNode?.learningObjectives[0] ?? "이 수업은 다음 단계로 가는 연결 수업입니다."}</p>
                <div className="lesson-meta-grid">
                  <span>{selectedLesson.estimatedMinutes}분</span>
                  <span>{selectedLesson.courseSlug}</span>
                  <span>{selectedLesson.nodeId}</span>
                </div>
                <div className="mini-list">
                  {selectedLesson.masteryEvidence.map((item) => <p key={item}>• {item}</p>)}
                </div>
                <button
                  className="btn primary"
                  type="button"
                  onClick={() => setView(selectedLesson.id === ratioGasFlowLesson.id ? "lesson" : "map")}
                >
                  {selectedLesson.id === ratioGasFlowLesson.id ? "이 수업 열기" : "선수지식에서 위치 보기"}
                </button>
              </article>
              <article className="panel">
                <p className="eyebrow">Quick glossary</p>
                <h2>막히기 쉬운 영어/현장 용어</h2>
                <TermGrid />
              </article>
            </section>
          </>
        )}

        {view === "diagnostic" && (
          <section className="grid-2">
            <article className="panel">
              <p className="eyebrow">Adaptive diagnostic</p>
              <h2>비율 사전 진단</h2>
              <p>오답이면 더 쉬운 선수개념으로 돌아갑니다. 자신감, 풀이시간, 힌트 사용량까지 숙련도에 반영합니다.</p>
              {nextQuestion ? (
                <DiagnosticQuestionCard
                  question={nextQuestion}
                  onAnswer={(choice) => {
                    const correct = evaluateChoice(nextQuestion, choice);
                    const answer: DiagnosticAnswer = {
                      questionId: nextQuestion.id,
                      nodeId: nextQuestion.nodeId,
                      correct,
                      confidence: correct ? 3 : 2,
                      secondsSpent: 42,
                      hintsUsed: 0,
                      explanationQuality: correct ? 2 : 1,
                      answeredAt: new Date().toISOString()
                    };
                    setState((current) => ({
                      ...current,
                      answers: [...current.answers, answer],
                      diagnosticFeedback: buildDiagnosticFeedback(nextQuestion, correct),
                      xp: current.xp + (correct ? 12 : 4)
                    }));
                  }}
                />
              ) : (
                <div className="exercise-card panel">
                  <h3>진단 완료</h3>
                  <p>추정 레벨: {diagnosticLevel}. 이제 개인 로드맵이 `비율 → 단위환산 → 농도 → EPI gas ratio`로 열립니다.</p>
                </div>
              )}
            </article>
            <article className="panel">
              <p className="eyebrow">Result so far</p>
              <h2>진단 기록</h2>
              <div className="feedback-card">{state.diagnosticFeedback}</div>
              {state.answers.length ? state.answers.map((answer) => (
                <p key={`${answer.questionId}-${answer.answeredAt}`}>{answer.questionId}: {answer.correct ? "정답" : "오답"} · confidence {answer.confidence}</p>
              )) : <p>아직 답변이 없습니다.</p>}
            </article>
          </section>
        )}

        {view === "lesson" && (
          <section className="grid-2">
            <article className="panel">
              <p className="eyebrow">Lesson</p>
              <h2>{ratioGasFlowLesson.title}</h2>
              {ratioGasFlowLesson.blocks.map((block) => (
                <article className="lesson-card" key={block.title}>
                  <p className="kicker">{block.kind}</p>
                  <h3>{block.title}</h3>
                  <small>{block.body}</small>
                </article>
              ))}
            </article>
            <article className="panel">
              <p className="eyebrow">Mastery evidence</p>
              <h2>완료 기준</h2>
              {ratioGasFlowLesson.masteryEvidence.map((item) => <p key={item}>• {item}</p>)}
              <div className="field-sentence">
                <span>현장 보고 문장</span>
                <strong>“이 계산은 교육용 예시이며, 실제 gas setting은 승인된 recipe와 site 절차로만 확인하겠습니다.”</strong>
              </div>
              <label className="reflection-box">
                <span>오늘 내 말로 정리</span>
                <textarea
                  value={state.note}
                  onChange={(event) => setState((current) => ({ ...current, note: event.target.value }))}
                  placeholder="예: slm과 sccm이 섞이면 먼저 sccm으로 맞춘다..."
                />
              </label>
              <button className="btn primary" type="button" onClick={() => completeLesson(setState, activeMastery)}>수업 완료하고 mastery 업데이트</button>
            </article>
          </section>
        )}

        {view === "practice" && (
          <section className="grid-2">
            <article className="panel">
              <p className="eyebrow">Interactive lab</p>
              <h2>가스 유량 비율 슬라이더</h2>
              <div className="lab">
                <label className="range">H2 carrier flow: {state.h2Slm} slm
                  <input type="range" min="1" max="50" value={state.h2Slm} onChange={(event) => setState((current) => ({ ...current, h2Slm: Number(event.target.value) }))} />
                </label>
                <label className="range">Precursor flow: {state.precursorSccm} sccm
                  <input type="range" min="20" max="1000" value={state.precursorSccm} onChange={(event) => setState((current) => ({ ...current, precursorSccm: Number(event.target.value) }))} />
                </label>
                <div className="flow-bars" aria-label="visual ratio bars">
                  <div>
                    <span>H2 carrier</span>
                    <strong>{h2Sccm.toLocaleString("ko-KR")} sccm</strong>
                    <i style={{ width: "100%" }} />
                  </div>
                  <div>
                    <span>Precursor</span>
                    <strong>{state.precursorSccm.toLocaleString("ko-KR")} sccm</strong>
                    <i style={{ width: `${Math.max(4, Math.min(100, state.precursorSccm / h2Sccm * 100))}%` }} />
                  </div>
                </div>
                <div className="flow-strip">
                  <span>H2<br />{h2Sccm} sccm</span>
                  <span>+</span>
                  <span>Precursor<br />{state.precursorSccm} sccm</span>
                  <span>=</span>
                  <span>Ratio<br />{ratio.toFixed(1)}:1</span>
                </div>
                <div className="formula-card">
                  <span>계산 순서</span>
                  <strong>{state.h2Slm} slm × 1000 = {h2Sccm.toLocaleString("ko-KR")} sccm</strong>
                  <strong>{h2Sccm.toLocaleString("ko-KR")} ÷ {state.precursorSccm.toLocaleString("ko-KR")} = {ratio.toFixed(1)} : 1</strong>
                </div>
              </div>
            </article>
            <article className="panel">
              <p className="eyebrow">Exercise</p>
              <h2>EPI 스타일 응용문제</h2>
              <p>H2 {state.h2Slm} slm, precursor {state.precursorSccm} sccm일 때 H2:precursor 비율을 계산하세요.</p>
              <input
                aria-label="submitted ratio"
                className="note-textarea"
                style={{ minHeight: 46 }}
                value={state.submittedRatio}
                onChange={(event) => setState((current) => ({ ...current, submittedRatio: event.target.value }))}
                placeholder="예: 100"
              />
              <button className="btn primary" type="button" onClick={() => submitRatio(setState, activeMastery)}>
                제출하고 피드백 받기
              </button>
              <p className={`feedback-card ${state.ratioFeedback.startsWith("정답") ? "good" : state.ratioFeedback.startsWith("다시") ? "bad" : ""}`}>{state.ratioFeedback}</p>
            </article>
          </section>
        )}

        {view === "review" && (
          <section className="panel">
            <p className="eyebrow">Spaced repetition</p>
            <h2>오늘 생성된 복습 카드</h2>
            {state.reviews.length ? state.reviews.map((review) => (
              <article className="exercise-card" key={review.id}>
                <h3>{review.cardType} · {review.nodeId}</h3>
                <small>{review.prompt}</small>
                <p className="muted">due {new Date(review.dueAt).toLocaleDateString("ko-KR")} · interval {review.intervalDays} days</p>
              </article>
            )) : (
              <div className="empty-state">
                <h3>아직 복습 카드가 없습니다.</h3>
                <p>수업 완료 또는 문제 제출을 하면 자동으로 복습 큐가 만들어집니다.</p>
                <button className="btn primary" type="button" onClick={() => setView("practice")}>실습에서 카드 만들기</button>
              </div>
            )}
          </section>
        )}

        {view === "tutor" && (
          <section className="grid-2">
            <article className="panel">
              <p className="eyebrow">AI Tutor mock provider</p>
              <h2>{state.tutorResponse.explanation.shortSummary}</h2>
              {state.tutorResponse.explanation.steps.map((step) => (
                <article className="lesson-card" key={step.title}>
                  <h3>{step.title}</h3>
                  <small>{step.content}</small>
                </article>
              ))}
              <button className="btn" type="button" onClick={() => setState((current) => ({
                ...current,
                tutorResponse: mockTutorResponse({
                  nodeId: "epi-gas-ratio",
                  userMessage: "소크라테스식으로 다시 설명해줘.",
                  learnerLevel: "math-anxious-field-engineer",
                  mode: "socratic"
                })
              }))}>소크라테스식 설명으로 전환</button>
            </article>
            <article className="panel">
              <p className="eyebrow">AI packet</p>
              <h2>구조화된 학습 상태</h2>
              <div className="packet-summary">
                <span>answers {state.answers.length}</span>
                <span>reviews {state.reviews.length}</span>
                <span>mastery {activeMastery.masteryScore}%</span>
              </div>
              <div className="hero-actions">
                <button
                  className="btn primary"
                  type="button"
                  onClick={() => {
                    const text = JSON.stringify(packet, null, 2);
                    void navigator.clipboard?.writeText(text).then(
                      () => setPacketFeedback("AI packet을 클립보드에 복사했습니다."),
                      () => setPacketFeedback("클립보드 복사는 실패했지만 아래 JSON은 그대로 사용할 수 있습니다.")
                    );
                  }}
                >
                  AI packet 복사
                </button>
                <span className="copy-feedback">{packetFeedback}</span>
              </div>
              <textarea className="packet" readOnly value={JSON.stringify(packet, null, 2)} />
            </article>
          </section>
        )}

        {view === "map" && (
          <section className="panel">
            <p className="eyebrow">Knowledge graph</p>
            <h2>분수에서 EPI gas ratio까지 이어지는 선수지식 그래프</h2>
            <div className="roadmap">
              {knowledgeNodes.map((node) => {
                const mastery = state.mastery[node.id]?.masteryScore ?? 0;
                const locked = node.prerequisites.some((id) => (state.mastery[id]?.masteryScore ?? 0) < 60);
                return (
                  <article className={`stage-card ${node.id === "epi-gas-ratio" ? "current" : ""} ${locked ? "locked" : ""}`} key={node.id}>
                    <span>{node.domain} L{node.level}</span>
                    <strong>{node.titleKo}</strong>
                    <small>{node.learningObjectives[0]}</small>
                    <small>mastery {mastery}% · prereq {node.prerequisites.length}</small>
                    <ProgressBar value={mastery} />
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function DiagnosticQuestionCard({
  question,
  onAnswer
}: {
  question: typeof ratioDiagnosticQuestions[number];
  onAnswer: (choice: number) => void;
}) {
  return (
    <div className="exercise-card panel">
      <p className="kicker">difficulty {question.difficulty}</p>
      <h3>{question.prompt}</h3>
      <div className="question-options">
        {question.options.map((option, index) => (
          <button key={option} onClick={() => onAnswer(index)} type="button">{option}</button>
        ))}
      </div>
      <small>정답 후 해설이 즉시 기록되고 다음 문제 난도가 조정됩니다.</small>
    </div>
  );
}

function completeLesson(setState: Dispatch<SetStateAction<AcademyState>>, previous: MasteryState) {
  const updated = updateMastery(previous, {
    nodeId: "epi-gas-ratio",
    correct: true,
    confidence: 3,
    secondsSpent: 900,
    hintsUsed: 0,
    explanationQuality: 2,
    applicationCorrect: true
  });
  const review = scheduleReview(USER_ID, updated);
  setState((current) => ({
    ...current,
    mastery: { ...current.mastery, "epi-gas-ratio": updated, "math-ratio": updateMastery(current.mastery["math-ratio"] ?? initialMastery(USER_ID, "math-ratio"), { nodeId: "math-ratio", correct: true, confidence: 3, secondsSpent: 600, hintsUsed: 0, explanationQuality: 2, applicationCorrect: true }) },
    reviews: [review, ...current.reviews].slice(0, 20),
    xp: current.xp + 30
  }));
}

function submitRatio(setState: Dispatch<SetStateAction<AcademyState>>, previous: MasteryState) {
  setState((current) => {
    const parsed = Number(current.submittedRatio);
    const result = evaluateRatioAttempt({
      h2Slm: current.h2Slm,
      precursorSccm: current.precursorSccm,
      submittedRatio: Number.isFinite(parsed) ? parsed : 0,
      explanation: "local mvp attempt"
    });
    const updated = updateMastery(previous, {
      nodeId: "epi-gas-ratio",
      correct: result.correct,
      confidence: result.correct ? 4 : 2,
      secondsSpent: 120,
      hintsUsed: result.correct ? 0 : 1,
      explanationQuality: result.correct ? 2 : 1,
      applicationCorrect: result.correct
    });
    return {
      ...current,
      mastery: { ...current.mastery, "epi-gas-ratio": updated },
      reviews: [scheduleReview(USER_ID, updated), ...current.reviews].slice(0, 20),
      ratioFeedback: `${result.correct ? "정답" : "다시 시도"} · 예상 비율 ${result.expectedRatio.toFixed(1)}:1. ${result.feedback}`,
      xp: current.xp + (result.correct ? 18 : 6)
    };
  });
}

function computeReadiness(mastery: Record<string, MasteryState>, answers: DiagnosticAnswer[]) {
  const score = (nodeIds: string[]) => Math.round(nodeIds.reduce((sum, id) => sum + (mastery[id]?.masteryScore ?? 0), 0) / nodeIds.length);
  const diagnostic = answers.length ? Math.round(answers.filter((answer) => answer.correct).length / answers.length * 100) : 0;
  const math = Math.round((score(["math-ratio", "eng-unit-conversion"]) + diagnostic) / 2);
  const epi = mastery["epi-gas-ratio"]?.masteryScore ?? 0;
  return [
    { label: "Math readiness", value: math, reason: "비율, 백분율, 단위환산 기준" },
    { label: "EPI readiness", value: epi, reason: "gas ratio 응용문제 기준" },
    { label: "MS readiness", value: Math.round((math + epi) / 2), reason: "첫 vertical slice 기준의 임시 추정" },
    { label: "Review load", value: Math.min(100, answers.length * 20), reason: "진단 답변과 복습 카드 기반" }
  ];
}

function TermGrid() {
  const terms = [
    { en: "sccm", ko: "분당 표준 cc 유량", field: "가스 유량을 작은 단위로 읽을 때 사용합니다." },
    { en: "slm", ko: "분당 표준 리터 유량", field: "carrier gas처럼 큰 유량을 볼 때 자주 나옵니다." },
    { en: "precursor", ko: "막 성장을 위한 원료 가스", field: "교육 예시에서는 숫자만 다루고 실제 recipe는 제외합니다." },
    { en: "carrier gas", ko: "원료를 운반하는 큰 흐름", field: "비율 계산에서 기준 흐름으로 볼 수 있습니다." },
    { en: "uniformity", ko: "wafer 위 균일도", field: "평균만 아니라 center-edge 산포까지 봅니다." },
    { en: "Arrhenius plot", ko: "온도와 반응속도 관계 그래프", field: "로그와 지수 개념이 필요한 다음 산입니다." }
  ];
  return (
    <div className="term-grid">
      {terms.map((term) => (
        <article key={term.en}>
          <strong>{term.en}</strong>
          <span>{term.ko}</span>
          <small>{term.field}</small>
        </article>
      ))}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" aria-label={`progress ${value}%`}>
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function buildDiagnosticFeedback(question: typeof ratioDiagnosticQuestions[number], correct: boolean): string {
  if (correct) return `정답입니다. ${question.explanation} 다음 문제는 이 개념을 EPI 계산으로 연결합니다.`;
  if (question.prerequisiteIfMissed) {
    return `오답입니다. 지금은 실패가 아니라 '${question.prerequisiteIfMissed}' 선수개념을 다시 확인하라는 신호입니다. ${question.explanation}`;
  }
  return `오답입니다. ${question.explanation} 단위, 비교 대상, 약분 순서로 다시 보겠습니다.`;
}

function buildLearningLoop(state: AcademyState, masteryScore: number): { index: string; label: string; detail: string; view: View; done: boolean }[] {
  return [
    { index: "01", label: "진단", detail: `${state.answers.length}/3 questions`, view: "diagnostic", done: state.answers.length >= 3 },
    { index: "02", label: "수업", detail: "개념을 현장 문장으로", view: "lesson", done: masteryScore >= 35 },
    { index: "03", label: "실습", detail: "단위 변환과 비율", view: "practice", done: masteryScore >= 55 },
    { index: "04", label: "복습", detail: `${state.reviews.length} cards`, view: "review", done: state.reviews.length > 0 },
    { index: "05", label: "AI 정리", detail: "packet 업데이트", view: "tutor", done: masteryScore >= 60 && state.reviews.length > 0 }
  ];
}

function buildLocalPacket(state: AcademyState, readiness: ReturnType<typeof computeReadiness>, gaps: string[]) {
  return {
    schemaVersion: "epi-materials-mastery-local-packet-v1",
    generatedAt: new Date().toISOString(),
    learnerProfile: "Korean field semiconductor engineer preparing Applied Materials EPI, Materials Science MS, PSE, SME, Principal, Fellow path",
    readiness,
    diagnosticAnswers: state.answers,
    mastery: state.mastery,
    reviewItems: state.reviews,
    prerequisiteGaps: gaps,
    activeVerticalSlice: "ratio-and-gas-flow",
    safetyBoundary: "All gas numbers are educational virtual values, not equipment recipes, setpoints, or site-specific limits."
  };
}
