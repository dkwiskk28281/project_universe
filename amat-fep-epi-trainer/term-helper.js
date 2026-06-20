const englishTermGuide = [
  ["Fab", "팹/공장", "Fab기초", "반도체 wafer를 실제로 생산하는 공장입니다.", "Fab 안에서는 안전, 오염 방지, 생산 흐름을 항상 같이 봅니다."],
  ["Wafer", "웨이퍼 원판", "Fab기초", "반도체 회로를 만드는 얇고 둥근 기판입니다.", "장비는 wafer를 깨끗하고 안전하게 처리하기 위해 존재합니다."],
  ["Lot", "웨이퍼 묶음", "Fab기초", "여러 wafer를 하나의 생산 단위로 묶은 것입니다.", "장비 문제가 lot hold나 생산 지연으로 이어질 수 있습니다."],
  ["FOUP", "웨이퍼 보관통", "Fab기초", "wafer를 담아 장비 사이를 이동시키는 표준 용기입니다.", "slot mapping, contamination, load port 문제가 연결됩니다."],
  ["Cleanroom", "청정실", "Fab기초", "먼지와 오염을 엄격하게 관리하는 생산 공간입니다.", "CE는 고치는 사람인 동시에 오염을 만들지 않는 사람이어야 합니다."],
  ["Sub-fab", "하부 지원 공간", "Facility", "pump, abatement, gas support 설비가 놓이는 공간입니다.", "장비 알람의 원인이 cleanroom 밖 support 설비일 수 있습니다."],
  ["Facility", "공장 유틸리티", "Facility", "전기, 냉각수, 가스, 배기, 네트워크 같은 장비 지원 시스템입니다.", "install CE는 tool과 facility 경계를 증거로 연결해야 합니다."],
  ["Utility", "공급 설비", "Facility", "장비에 공급되는 전기, 물, 가스, 배기, 공압 등을 말합니다.", "utility 조건이 맞지 않으면 장비 성능과 안전이 무너집니다."],
  ["CDA", "깨끗한 건조공기", "Facility", "Clean Dry Air. 공압 valve나 actuator 동작에 쓰입니다.", "공압 부족은 valve delay와 sensor mismatch로 보일 수 있습니다."],
  ["PCW", "공정 냉각수", "Facility", "Process Cooling Water. 장비 열을 제거하는 냉각수입니다.", "열 안정성, leak sensor, flow switch와 연결됩니다."],
  ["UPW", "초순수", "Facility", "Ultra Pure Water. 반도체 공정에 쓰는 매우 깨끗한 물입니다.", "오염과 water quality가 공정 품질에 영향을 줍니다."],
  ["Exhaust", "배기", "Facility", "장비에서 나오는 gas나 열을 밖으로 빼내는 시스템입니다.", "gas 장비는 exhaust ready가 안전 조건입니다."],
  ["Abatement", "유해가스 처리", "Gas", "배출 gas를 태우거나 흡착·세정해 위험을 낮추는 설비입니다.", "abatement ready가 없으면 gas qualification을 진행하면 안 됩니다."],
  ["Scrubber", "가스 세정기", "Gas", "유해/부식성 gas를 처리하는 장치입니다.", "HCl, dopant, chlorosilane 계열에서는 downstream도 봐야 합니다."],
  ["Gas Cabinet", "가스 안전 캐비닛", "Gas", "위험 gas cylinder와 valve/manifold를 안전하게 보관·배기하는 cabinet입니다.", "detector, exhaust, purge, shutoff 상태가 중요합니다."],
  ["Gas Detector", "가스 감지기", "Gas", "누출이나 산소 농도 이상을 감지하는 안전 장치입니다.", "냄새나 감각 대신 detector와 alarm을 믿어야 합니다."],
  ["Purge", "안전가스 치환", "Gas", "line이나 chamber 안의 gas를 안전한 gas로 밀어내는 과정입니다.", "purge complete 기준은 site 공식 문서만 따릅니다."],
  ["MFC", "가스 유량 제어기", "Gas", "Mass Flow Controller. gas flow를 setpoint에 맞추는 장치입니다.", "setpoint와 actual이 다르면 supply, valve, restriction, MFC를 나눠 봅니다."],
  ["Setpoint", "목표값", "Controls", "장비가 맞추려는 목표 수치입니다.", "actual과 비교해야 control 상태를 알 수 있습니다."],
  ["Actual", "실제값", "Controls", "sensor나 controller가 읽은 현재 값입니다.", "setpoint와 다르면 원인을 subsystem별로 좁힙니다."],
  ["Interlock", "안전 잠금 조건", "Safety", "조건이 안전하지 않을 때 장비 동작을 막는 보호 체인입니다.", "우회가 아니라 왜 걸렸는지 확인해야 합니다."],
  ["EMO", "비상 전원 차단", "Safety", "Emergency Machine Off. 비상 시 장비 에너지를 끊는 기능입니다.", "install bring-up 전에 반드시 확인합니다."],
  ["E-stop", "비상정지", "Safety", "Emergency stop. 위험 시 장비 동작을 멈추는 버튼/회로입니다.", "접근성, 기능, reset 조건을 확인합니다."],
  ["LOTO", "잠금표시 절차", "Safety", "Lockout/Tagout. 에너지를 잠그고 표시해 사고를 막는 절차입니다.", "전기뿐 아니라 공압, 열, 기계 에너지도 고려합니다."],
  ["SDS", "물질안전자료", "Safety", "Safety Data Sheet. gas/chemical 위험성과 대응법 문서입니다.", "가스 작업 전 hazard 이해의 출발점입니다."],
  ["Permit", "작업허가", "Safety", "위험 작업을 site가 승인하는 절차입니다.", "전기, gas, 고소, hot work는 승인 없이 진행하지 않습니다."],
  ["JSA", "작업위험분석", "Safety", "Job Safety Analysis. 작업 전에 위험을 나누어 보는 절차입니다.", "무엇이 움직이고, 새고, 뜨겁고, 전기가 있는지 묻습니다."],
  ["Pumpdown", "진공으로 빼기", "Vacuum", "chamber 압력을 낮춰 vacuum 상태로 만드는 과정입니다.", "시간이 길어지면 leak, pump, valve, seal, gauge를 의심합니다."],
  ["Base Pressure", "최저 안정 압력", "Vacuum", "충분히 배기한 뒤 도달하는 낮은 압력입니다.", "chamber integrity와 contamination 단서입니다."],
  ["Foreline", "펌프 전단 배기라인", "Vacuum", "chamber에서 pump/exhaust로 이어지는 배기 라인입니다.", "restriction, condensation, routing 문제가 pumpdown에 영향을 줍니다."],
  ["Throttle Valve", "압력 조절 밸브", "Vacuum", "배기량을 조절해 chamber pressure를 맞추는 valve입니다.", "pressure control 안정성의 핵심입니다."],
  ["Leak Check", "누설 검사", "Vacuum", "gas나 vacuum line이 새는지 확인하는 검사입니다.", "가스 도입 전 release 조건의 핵심입니다."],
  ["RTP", "급속 열처리", "RTP", "Rapid Thermal Processing. wafer를 매우 빠르게 가열하는 공정입니다.", "temperature trace, lamp, pyrometry, rotation, cooling을 같이 봅니다."],
  ["Ramp", "온도 올림/내림", "RTP", "온도가 시간에 따라 올라가거나 내려가는 구간입니다.", "ramp rate가 thermal budget과 stress에 영향을 줍니다."],
  ["Soak", "온도 유지", "RTP", "목표 온도에서 일정 시간 유지하는 단계입니다.", "시간과 온도 안정성이 결과를 좌우합니다."],
  ["Spike", "짧은 고온 피크", "RTP", "아주 짧게 높은 온도까지 올리는 anneal 방식입니다.", "activation과 diffusion 억제 사이 균형을 봅니다."],
  ["Pyrometry", "빛으로 온도 측정", "RTP", "wafer가 내는 빛을 읽어 온도를 추정하는 방식입니다.", "emissivity와 window 상태가 측정 정확도에 영향을 줍니다."],
  ["Emissivity", "열복사 성질", "RTP", "표면이 열복사를 얼마나 내는지 나타내는 성질입니다.", "patterned wafer는 emissivity 차이로 온도 측정이 어려워집니다."],
  ["Temperature Trace", "온도 기록선", "RTP", "시간에 따른 온도 변화 기록입니다.", "qualification과 troubleshooting의 baseline입니다."],
  ["Wafer Rotation", "웨이퍼 회전", "RTP", "공정 중 wafer를 돌려 균일도를 높이는 동작입니다.", "rotation 문제가 온도/막 균일도 문제처럼 보일 수 있습니다."],
  ["Epitaxy", "결정성 박막 성장", "EPI", "기판 결정 구조를 따라 crystal layer를 성장시키는 공정입니다.", "surface, gas, temperature, pressure, defect를 함께 봅니다."],
  ["Precursor", "막 원료가스", "EPI", "film을 만드는 원료 gas 또는 화합물입니다.", "delivery 안정성이 thickness와 defect에 연결됩니다."],
  ["Dopant", "전기특성 조절 불순물", "EPI", "반도체 전기 특성을 바꾸려고 넣는 원소입니다.", "resistivity와 activation을 이해할 때 중요합니다."],
  ["Selective Epi", "선택 성장", "EPI", "원하는 영역에만 epitaxy layer를 키우는 공정입니다.", "deposition과 etch balance, surface 상태가 중요합니다."],
  ["Source/Drain", "전류 출입 영역", "Device", "transistor에서 전류가 들어오고 나가는 영역입니다.", "EPI는 advanced transistor source/drain 형성과 연결됩니다."],
  ["Channel", "전류 통로", "Device", "transistor에서 전류 흐름이 gate로 제어되는 통로입니다.", "strain, material, interface 품질이 성능에 영향을 줍니다."],
  ["GAA", "게이트가 둘러싼 구조", "Device", "Gate-All-Around. gate가 channel을 사방에서 감싸는 구조입니다.", "최신 EPI 장비 설명에서 source/drain와 함께 나옵니다."],
  ["Uniformity", "균일도", "Quality", "wafer 안 또는 wafer 간 결과가 얼마나 고른지입니다.", "온도, 두께, 저항, defect 모두 uniformity로 봅니다."],
  ["Defect", "결함", "Quality", "막, 표면, particle, pattern 문제 등 품질 이상입니다.", "defect map과 장비 변경점을 연결해 봅니다."],
  ["Particle", "미세입자", "Quality", "wafer나 chamber에 붙는 아주 작은 입자입니다.", "PM 후 증가하면 cleaning, handling, seal, purge를 봅니다."],
  ["Thickness", "막 두께", "Quality", "증착된 film의 두께입니다.", "EPI qualification에서 균일도와 repeatability가 중요합니다."],
  ["Resistivity", "전기저항률", "Quality", "전류가 얼마나 흐르기 어려운지 나타내는 값입니다.", "dopant와 열처리, 막 품질에 연결됩니다."],
  ["Metrology", "측정", "Quality", "공정 결과를 수치로 확인하는 측정 영역입니다.", "CE 조치가 효과 있었는지 확인하는 증거입니다."],
  ["Qualification", "성능검증", "Install", "장비가 site 기준을 만족하는지 확인하는 단계입니다.", "설치 완료가 아니라 data와 sign-off로 증명해야 합니다."],
  ["Acceptance", "인수승인", "Install", "고객/내부 기준으로 장비 사용 가능을 승인받는 절차입니다.", "open issue와 release 조건을 문서화합니다."],
  ["POC", "연결 지점", "Install", "Point of Connection. fab utility와 tool이 만나는 지점입니다.", "label, drawing revision, owner 확인이 기본입니다."],
  ["Hook-up", "유틸리티 연결", "Install", "power, gas, exhaust, cooling 등을 장비에 연결하는 작업입니다.", "scope와 승인 경계를 명확히 해야 합니다."],
  ["As-built", "실제 설치 도면", "Install", "현장에 실제로 설치된 상태를 반영한 기록입니다.", "나중에 정비할 때 매우 중요합니다."],
  ["Punch List", "미완료 항목표", "Install", "남은 문제와 후속 조치를 모은 목록입니다.", "owner, impact, ETA를 함께 관리합니다."],
  ["SAT", "현장 인수시험", "Install", "Site Acceptance Test. 고객 site에서 하는 acceptance test입니다.", "현장 조건에서 장비가 기준을 만족하는지 봅니다."],
  ["FAT", "출하 전 인수시험", "Install", "Factory Acceptance Test. 공장 출하 전 test입니다.", "site 문제와 출하 전 상태를 구분하는 기준이 됩니다."],
  ["PM", "예방정비", "Maintenance", "Preventive Maintenance. 고장을 막기 위해 계획적으로 하는 정비입니다.", "체크리스트보다 baseline 회복과 early failure 예방이 중요합니다."],
  ["CM", "고장복구정비", "Maintenance", "Corrective Maintenance. 문제가 생긴 뒤 원인을 찾아 복구하는 정비입니다.", "증상 제거와 재발 방지를 구분합니다."],
  ["Baseline", "정상 기준값", "Troubleshooting", "정상일 때의 trace, 압력, 유량, 결과 data입니다.", "시니어 CE는 baseline을 많이 알고 있습니다."],
  ["Trend", "시간 변화", "Troubleshooting", "값이 시간에 따라 어떻게 움직이는지 보는 것입니다.", "한 순간 값보다 변화 패턴이 더 중요할 때가 많습니다."],
  ["Alarm", "경보", "Troubleshooting", "장비가 이상 조건을 감지해 띄우는 메시지입니다.", "알람명보다 발생 조건과 전후 로그가 중요합니다."],
  ["Log", "기록", "Troubleshooting", "장비 event와 상태가 저장된 기록입니다.", "추정보다 log가 먼저입니다."],
  ["Escalation", "상위지원 요청", "Work", "선임, 전문가, 고객 담당자에게 문제를 올리는 절차입니다.", "안전, 반복 장애, 권한 밖 작업에서는 빨리 해야 합니다."],
  ["Downtime", "장비 정지시간", "Work", "장비가 생산에 쓰이지 못하는 시간입니다.", "고객에게 가장 민감한 영향입니다."],
  ["ETA", "예상 시간", "Work", "Estimated Time of Arrival/Action. 도착 또는 완료 예상 시간입니다.", "고객 업데이트에서 꼭 필요합니다."]
];

englishTermGuide.push(
  ["Cluster Tool", "다중 챔버 장비", "Structure", "중앙 이송부와 여러 공정/로딩 chamber가 붙은 장비 구조입니다.", "Centura 같은 platform을 이해하는 가장 중요한 그림입니다."],
  ["Transfer Module", "중앙 이송 챔버", "Structure", "wafer를 load lock과 process module 사이에서 옮기는 중앙 공간입니다.", "robot, blade, pressure boundary, particle risk를 함께 봅니다."],
  ["TM", "중앙 이송부", "Structure", "Transfer Module의 약어입니다.", "Centura 구성에서 중심에 있고 PM/LL/CM을 연결합니다."],
  ["Process Module", "공정 챔버", "Structure", "실제 deposition, anneal, clean 같은 공정이 일어나는 chamber입니다.", "문맥에 따라 PM은 Preventive Maintenance가 아니라 Process Module일 수 있습니다."],
  ["PM", "공정모듈/예방정비", "Structure", "Process Module 또는 Preventive Maintenance를 뜻할 수 있습니다.", "설치 구성 이야기에서는 Process Module, 정비 이야기에서는 Preventive Maintenance로 읽어야 합니다."],
  ["Load Lock", "대기-진공 경계 챔버", "Structure", "대기압 FOUP/FI와 vacuum transfer module 사이에서 wafer를 넣고 빼는 chamber입니다.", "pump/vent time과 door seal, pressure matching이 중요합니다."],
  ["LL", "로드락", "Structure", "Load Lock의 약어입니다.", "일반적으로 FI/EFEM과 TM 사이의 boundary로 이해합니다."],
  ["Factory Interface", "전면 인터페이스", "Structure", "FOUP/loadport와 장비 내부 이송계를 연결하는 앞단입니다.", "loadport, mapping, host, wafer handoff가 연결됩니다."],
  ["FI", "전면 인터페이스", "Structure", "Factory Interface의 약어입니다.", "FOUP에서 load lock으로 들어가기 전 대기압 쪽 영역입니다."],
  ["EFEM", "전면 웨이퍼 이송부", "Structure", "Equipment Front End Module. 대기압 쪽 wafer handling interface입니다.", "FOUP와 load lock 사이 wafer 흐름을 담당합니다."],
  ["Facet", "챔버가 붙는 면", "Structure", "central transfer module 주변에 chamber가 붙는 위치 또는 면입니다.", "PM 수와 chamber option을 이해할 때 씁니다."],
  ["CM", "보조 챔버/문맥확인", "Structure", "문서마다 chamber module, clean module, cooldown module 등 의미가 달라질 수 있습니다.", "현장에서는 CM이 무엇을 뜻하는지 반드시 해당 tool 문서로 확인해야 합니다."],
  ["Chamber Matching", "챔버 간 결과 맞춤", "Structure", "여러 chamber가 유사한 결과를 내도록 맞추는 작업입니다.", "multi-chamber tool qualification에서 핵심입니다."],
  ["Recipe Routing", "웨이퍼 이동 경로", "Structure", "wafer가 어떤 chamber 순서로 이동해 공정을 받는지입니다.", "PM 개수만 맞아도 route가 다르면 throughput과 결과가 달라집니다."]
);

const englishTermMap = new Map(englishTermGuide.map(([term, short, category, plain, ce]) => [
  term.toLowerCase(),
  { term, short, category, plain, ce }
]));

const sortedEnglishTerms = [...englishTermGuide].sort((a, b) => b[0].length - a[0].length);
const termRegex = new RegExp(`\\b(${sortedEnglishTerms.map(([term]) => escapeRegExp(term)).join("|")})\\b`, "gi");
let termEnhanceTimer = null;
let isEnhancingTerms = false;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderEnglishTerms() {
  const grid = document.querySelector("#english-terms-grid");
  if (!grid) return;
  const query = (document.querySelector("#english-search")?.value || "").trim().toLowerCase();
  const terms = englishTermGuide.filter(([term, short, category, plain, ce]) =>
    !query || `${term} ${short} ${category} ${plain} ${ce}`.toLowerCase().includes(query)
  );
  grid.innerHTML = terms.map(([term, short, category, plain, ce]) => `
    <article class="english-card">
      <h2>${term}</h2>
      <span class="tag">${category} · ${short}</span>
      <p>${plain}</p>
      <strong>CE 관점</strong>
      <p>${ce}</p>
    </article>
  `).join("") || `<article class="english-card"><h2>검색 결과 없음</h2><p>다른 단어로 검색해보세요.</p></article>`;
}

function shouldSkipTextNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (!node.nodeValue || !termRegex.test(node.nodeValue)) {
    termRegex.lastIndex = 0;
    return true;
  }
  termRegex.lastIndex = 0;
  return !!parent.closest("script, style, input, textarea, select, option, .term-explain, .english-card, .glossary-grid, #source-list, .cluster-board, .cluster-palette, .cluster-controls, .cluster-feedback");
}

function enhanceEnglishTerms(root = document.querySelector("main")) {
  if (!root || isEnhancingTerms) return;
  isEnhancingTerms = true;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipTextNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (nodes.length < 300) {
    const node = walker.nextNode();
    if (!node) break;
    nodes.push(node);
  }
  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const text = node.nodeValue;
    text.replace(termRegex, (match, _term, index) => {
      const info = englishTermMap.get(match.toLowerCase());
      if (!info) return match;
      fragment.append(document.createTextNode(text.slice(lastIndex, index)));
      const span = document.createElement("span");
      span.className = "term-explain";
      span.tabIndex = 0;
      span.dataset.short = info.short;
      span.title = `${info.term}: ${info.plain} CE 관점: ${info.ce}`;
      span.textContent = match;
      fragment.append(span);
      lastIndex = index + match.length;
      return match;
    });
    fragment.append(document.createTextNode(text.slice(lastIndex)));
    node.parentNode.replaceChild(fragment, node);
  });
  isEnhancingTerms = false;
}

function scheduleTermEnhance() {
  if (termEnhanceTimer) clearTimeout(termEnhanceTimer);
  termEnhanceTimer = setTimeout(() => enhanceEnglishTerms(), 80);
}

renderEnglishTerms();
enhanceEnglishTerms();
document.querySelector("#english-search")?.addEventListener("input", renderEnglishTerms);

const observer = new MutationObserver(() => {
  if (!isEnhancingTerms) scheduleTermEnhance();
});
observer.observe(document.querySelector("main"), { childList: true, subtree: true });
