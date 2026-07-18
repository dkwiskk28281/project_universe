"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type VisionMode = "pursuit" | "near-far" | "fusion" | "rest";

type VisionSession = {
  id: string;
  mode: VisionMode;
  seconds: number;
  fatigue: number;
  diplopia: number;
  control: "single" | "brief-double" | "frequent-double";
  createdAt: string;
};

const STORAGE_KEY = "visionRecoveryBookState";

const modes: Record<VisionMode, { title: string; subtitle: string; caution: string }> = {
  pursuit: {
    title: "부드러운 추적",
    subtitle: "초록 점을 머리 움직임 없이 눈으로만 천천히 따라갑니다.",
    caution: "한쪽 눈을 가리는 방식은 전문가가 지시한 경우에만 사용하세요."
  },
  "near-far": {
    title: "근거리-원거리 점프",
    subtitle: "가까운 목표와 먼 목표를 번갈아 보며 초점 전환 감각을 기록합니다.",
    caution: "화면은 실제 깊이를 만들지 못하므로 임상 pencil push-up의 대체물이 아닙니다."
  },
  fusion: {
    title: "융합 감각 이해",
    subtitle: "두 눈 입력이 하나의 선명한 이미지로 합쳐지는 느낌을 개념적으로 익힙니다.",
    caution: "프리즘, red/green filter, anti-suppression 훈련은 처방 없이 따라 하지 않습니다."
  },
  rest: {
    title: "이완과 리셋",
    subtitle: "먼 곳 보기와 눈 감기로 과훈련을 막고 증상 변화를 기록합니다.",
    caution: "피로할 때 억지로 오래 하지 않는 것이 조절력 유지에 중요합니다."
  }
};

export function VisionTrainingBook() {
  const [mode, setMode] = useState<VisionMode>("pursuit");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [fatigue, setFatigue] = useState(2);
  const [diplopia, setDiplopia] = useState(1);
  const [control, setControl] = useState<VisionSession["control"]>("single");
  const [logs, setLogs] = useState<VisionSession[]>([]);
  const [approvedMonocular, setApprovedMonocular] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { logs?: VisionSession[] };
      setLogs(parsed.logs ?? []);
    } catch {
      setLogs([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ logs }));
  }, [logs]);

  const weeklyLoad = useMemo(() => logs.slice(0, 7).reduce((sum, item) => sum + item.seconds, 0), [logs]);
  const selected = modes[mode];

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">VT</span>
          <div>
            <strong>시기능 회복훈련</strong>
            <div className="muted">간헐적외사시·복시 조절력 기록과 안전한 훈련 보조</div>
          </div>
        </div>
        <nav className="top-nav" aria-label="main navigation">
          <Link href="/">MS</Link>
          <Link href={"/vision-training" as Route}>시기능</Link>
          <Link href="/knowledge-map">지도</Link>
          <Link href="/tutor">AI Tutor</Link>
        </nav>
      </header>

      <section className="layout">
        <section className="hero vision-hero">
          <div>
            <p className="eyebrow">새 책 · vision recovery</p>
            <h1>목표는 억지 교정이 아니라, 피로와 복시 패턴을 알고 안전하게 조절력을 키우는 것입니다.</h1>
            <p>
              이 책은 진단이나 치료 처방이 아닙니다. 간헐적외사시, 복시, 융합 조절은 반드시 안과/사시 전문의,
              검안사, orthoptist의 평가와 지시에 맞춰야 합니다.
            </p>
            <div className="hero-actions">
              <button className="btn primary" type="button" onClick={() => setRunning((current) => !current)}>
                {running ? "훈련 멈춤" : "안전 모드로 시작"}
              </button>
              <button className="btn" type="button" onClick={() => setMode("rest")}>눈 이완으로 전환</button>
            </div>
          </div>
          <article className="stat">
            <span>Weekly load</span>
            <strong>{Math.round(weeklyLoad / 60)}분</strong>
            <small>최근 기록 {logs.length}개 · 오늘은 짧고 정확하게</small>
            <div className="progress-track"><span style={{ width: `${Math.min(100, weeklyLoad / 12)}%` }} /></div>
          </article>
        </section>

        <section className="grid-2">
          <article className="panel vision-panel">
            <p className="eyebrow">training window</p>
            <h2>{selected.title}</h2>
            <p>{selected.subtitle}</p>
            <div className={`vision-stage ${mode} ${running ? "running" : ""}`} aria-label={`${selected.title} visual training`}>
              {mode === "pursuit" && <PursuitStage monocular={approvedMonocular} />}
              {mode === "near-far" && <NearFarStage running={running} />}
              {mode === "fusion" && <FusionStage />}
              {mode === "rest" && <RestStage />}
            </div>
            <div className="vision-warning">{selected.caution}</div>
          </article>

          <article className="panel">
            <p className="eyebrow">control deck</p>
            <h2>오늘의 안전 세팅</h2>
            <div className="mode-grid" role="group" aria-label="vision training modes">
              {(Object.keys(modes) as VisionMode[]).map((item) => (
                <button
                  className={`mode-button ${mode === item ? "active" : ""}`}
                  key={item}
                  onClick={() => {
                    setRunning(false);
                    setMode(item);
                  }}
                  type="button"
                >
                  <strong>{modes[item].title}</strong>
                  <small>{modeHelp(item)}</small>
                </button>
              ))}
            </div>
            <label className="range">훈련 시간: {seconds}초
              <input type="range" min="30" max="180" step="30" value={seconds} onChange={(event) => setSeconds(Number(event.target.value))} />
            </label>
            <label className="range">피로도: {fatigue}/5
              <input type="range" min="1" max="5" value={fatigue} onChange={(event) => setFatigue(Number(event.target.value))} />
            </label>
            <label className="range">복시 느낌: {diplopia}/5
              <input type="range" min="0" max="5" value={diplopia} onChange={(event) => setDiplopia(Number(event.target.value))} />
            </label>
            <label className="reflection-box">
              <span>오늘의 조절 상태</span>
              <select value={control} onChange={(event) => setControl(event.target.value as VisionSession["control"])}>
                <option value="single">대체로 하나로 보임</option>
                <option value="brief-double">잠깐 복시 후 회복</option>
                <option value="frequent-double">복시가 자주 나타남</option>
              </select>
            </label>
            <label className="check-row">
              <input checked={approvedMonocular} onChange={(event) => setApprovedMonocular(event.target.checked)} type="checkbox" />
              <span>전문가가 지시한 경우에만 한쪽 눈 가림 추적 표시</span>
            </label>
            <button className="btn primary" type="button" onClick={() => saveSession({ mode, seconds, fatigue, diplopia, control }, setLogs)}>
              오늘 기록 저장
            </button>
          </article>
        </section>

        <section className="grid-3">
          <article className="panel compact warning-panel">
            <p className="eyebrow">stop conditions</p>
            <h2>즉시 멈추고 진료가 필요한 신호</h2>
            <p>새로 생긴 지속 복시, 갑작스러운 시력저하, 눈 통증, 심한 두통/어지럼, 눈꺼풀 처짐, 말/힘 빠짐 같은 신경학적 증상이 있으면 훈련하지 않습니다.</p>
          </article>
          <article className="panel compact">
            <p className="eyebrow">evidence boundary</p>
            <h2>무엇을 기대하면 안 되는가</h2>
            <p>화면 점 따라가기는 실제 사시각을 줄인다고 단정할 수 없습니다. 목표는 증상 기록, 피로 관리, 전문가 처방 훈련의 보조입니다.</p>
          </article>
          <article className="panel compact">
            <p className="eyebrow">daily rule</p>
            <h2>짧게, 선명하게, 쉬면서</h2>
            <p>불편감이 올라가면 즉시 멈추고 먼 곳을 보거나 눈을 감습니다. 더 오래 하는 것이 더 좋은 훈련은 아닙니다.</p>
          </article>
        </section>

        <section className="grid-2">
          <article className="panel">
            <p className="eyebrow">research notes</p>
            <h2>논문/공공자료 기반으로 앱에 반영한 원칙</h2>
            <div className="mini-list">
              <p>• 간헐적외사시는 피곤하거나 아플 때, 멍하게 있을 때 더 잘 나타날 수 있어 피로 기록이 중요합니다.</p>
              <p>• convergence insufficiency가 동반되면 가까운 작업에서 복시, 두통, 눈 피로가 생길 수 있고, 전문가가 convergence exercise를 처방할 수 있습니다.</p>
              <p>• 비수술 치료의 근거는 혼합적입니다. overminus lens, patching, prism, binocular vision training은 대상과 기준에 따라 효과가 다르게 보고됩니다.</p>
              <p>• 과훈련은 불편감을 키울 수 있어 훈련 뒤 먼 곳 보기나 눈 감기 같은 이완이 필요합니다.</p>
            </div>
          </article>
          <article className="panel">
            <p className="eyebrow">session log</p>
            <h2>최근 훈련 기록</h2>
            {logs.length ? (
              <div className="session-log">
                {logs.slice(0, 8).map((log) => (
                  <article key={log.id}>
                    <strong>{modes[log.mode].title}</strong>
                    <span>{log.seconds}초 · 피로 {log.fatigue}/5 · 복시 {log.diplopia}/5</span>
                    <small>{controlLabel(log.control)} · {new Date(log.createdAt).toLocaleString("ko-KR")}</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>아직 기록이 없습니다.</h3>
                <p>짧은 세션 후 기록을 남기면 피로·복시 패턴을 나중에 의사에게 설명하기 쉬워집니다.</p>
              </div>
            )}
          </article>
        </section>
      </section>
    </main>
  );
}

function PursuitStage({ monocular }: { monocular: boolean }) {
  return (
    <>
      <div className="vision-gridline" />
      <div className="moving-dot" />
      <span className="stage-label top-left">머리는 고정</span>
      <span className="stage-label bottom-right">{monocular ? "한쪽 눈 가림: 처방 시만" : "양안 추적"}</span>
    </>
  );
}

function NearFarStage({ running }: { running: boolean }) {
  return (
    <div className={`near-far-cues ${running ? "running" : ""}`}>
      <div className="cue near">가까운 목표</div>
      <div className="cue far">먼 목표</div>
      <span>선명함이 흐려지거나 둘로 보이면 멈추고 쉬기</span>
    </div>
  );
}

function FusionStage() {
  return (
    <div className="fusion-field">
      <span className="fusion-ring left">L</span>
      <span className="fusion-ring center">single</span>
      <span className="fusion-ring right">R</span>
    </div>
  );
}

function RestStage() {
  return (
    <div className="rest-field">
      <strong>20초 동안 먼 곳 보기</strong>
      <span>눈을 감고 호흡을 천천히 하며 복시가 줄어드는지 기록합니다.</span>
    </div>
  );
}

function saveSession(
  input: Omit<VisionSession, "id" | "createdAt">,
  setLogs: Dispatch<SetStateAction<VisionSession[]>>
) {
  const session: VisionSession = {
    ...input,
    id: `vision-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  setLogs((current) => [session, ...current].slice(0, 30));
}

function modeHelp(mode: VisionMode): string {
  return {
    pursuit: "점 따라가기",
    "near-far": "초점 전환",
    fusion: "양안 개념",
    rest: "피로 리셋"
  }[mode];
}

function controlLabel(control: VisionSession["control"]) {
  return {
    single: "대체로 하나",
    "brief-double": "잠깐 복시 후 회복",
    "frequent-double": "복시 잦음"
  }[control];
}
