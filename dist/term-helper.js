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

englishTermGuide.push(
  ["DVM", "디지털 전압계", "Electrical", "Digital Voltmeter. 전압을 숫자로 보여주는 계측기입니다.", "현장에서는 DMM과 함께 부르며, 측정 전 mode와 lead 위치가 생명입니다."],
  ["DMM", "디지털 멀티미터", "Electrical", "Digital Multimeter. 전압, 저항, 연속성 등을 재는 계측기입니다.", "부품을 찍는 도구가 아니라 가설을 안전하게 검증하는 증거 도구입니다."],
  ["Multimeter", "멀티미터", "Electrical", "여러 전기량을 측정하는 계측기입니다.", "voltage는 병렬, resistance/continuity는 무전원, current는 특별히 조심합니다."],
  ["Voltage", "전압", "Electrical", "전류를 흐르게 하는 전위차입니다.", "기준점이 틀리면 측정값 해석도 틀립니다."],
  ["Current", "전류", "Electrical", "회로에 흐르는 전하의 양입니다.", "meter를 직렬로 넣어야 하는 측정이라 현장에서는 위험도가 큽니다."],
  ["Resistance", "저항", "Electrical", "전류 흐름을 방해하는 정도입니다.", "전원 차단과 stored energy 방전 후 측정합니다."],
  ["Continuity", "연속성", "Electrical", "전기적으로 길이 이어져 있는지 확인하는 기능입니다.", "fuse, contact, wiring open을 찾는 기본 기능입니다."],
  ["Ohm's Law", "옴의 법칙", "Electrical", "V = I x R 관계입니다.", "24V control circuit에서 expected current와 voltage drop을 생각하게 해줍니다."],
  ["CAT Rating", "측정 안전 등급", "Electrical", "meter와 probe가 견딜 수 있는 measurement category 등급입니다.", "장비 내부, 분전, facility 위치에 맞는 등급을 사용해야 합니다."],
  ["Relay", "릴레이", "Electrical", "coil로 접점을 움직이는 전기적 스위치입니다.", "coil과 contact를 분리해서 진단합니다."],
  ["Coil", "코일", "Electrical", "전류가 흐르면 자력이 생기는 감긴 도선입니다.", "relay와 solenoid에서 voltage, resistance, polarity가 중요합니다."],
  ["Contact", "접점", "Electrical", "전기 회로를 열고 닫는 물리적 접촉부입니다.", "welded, worn, high-resistance contact가 intermittent fault를 만듭니다."],
  ["NO", "평상시 열림", "Electrical", "Normally Open. relay가 동작하지 않을 때 열려 있는 접점입니다.", "energize되면 닫히는지 확인합니다."],
  ["NC", "평상시 닫힘", "Electrical", "Normally Closed. relay가 동작하지 않을 때 닫혀 있는 접점입니다.", "energize되면 열리는지 확인합니다."],
  ["Voltage Drop", "전압강하", "Electrical", "부하가 동작할 때 배선이나 접점에 걸리는 전압 손실입니다.", "loose terminal과 worn contact를 찾는 강력한 방법입니다."],
  ["PNP", "소싱 센서", "Electrical", "보통 +전압을 output으로 내보내는 sensor 방식입니다.", "PLC input type과 맞는지 확인합니다."],
  ["NPN", "싱킹 센서", "Electrical", "보통 0V 쪽으로 output을 끌어내리는 sensor 방식입니다.", "PNP/NPN 혼동은 sensor는 켜졌는데 input이 안 바뀌는 원인이 됩니다."],
  ["SMPS", "스위칭 전원", "Electrical", "Switch Mode Power Supply. AC를 DC 전원으로 바꿉니다.", "24V sag나 ripple은 여러 I/O 문제처럼 보일 수 있습니다."],
  ["Arc Flash", "아크 플래시", "Safety", "전기 arc로 큰 열과 압력이 발생하는 위험입니다.", "live panel 작업은 자격, PPE, permit 없이는 접근하지 않습니다."],
  ["Stored Energy", "잔류 에너지", "Safety", "전원 차단 후에도 capacitor, 공압, 열, 중력 등에 남은 에너지입니다.", "LOTO 후 zero-energy 확인이 필요합니다."]
);

englishTermGuide.push(
  ["Rigging", "중량물 반입/배치", "Install", "무거운 장비나 crate를 들어 올리고 이동해 정해진 위치에 놓는 작업입니다.", "route, floor load, lift point, tilt/shock 기록, 안전 구역을 먼저 확인합니다."],
  ["Rigger", "중량물 작업자", "Install", "rigging을 전문으로 수행하는 작업자 또는 팀입니다.", "CE는 직접 무리해서 들기보다 rigger와 신호, 순서, 금지 영역을 맞춥니다."],
  ["Crate", "운송 포장상자", "Install", "장비 모듈이 운송 중 손상되지 않도록 담긴 큰 포장 구조입니다.", "crate 상태, shock indicator, 외관 손상을 사진으로 남깁니다."],
  ["Uncrate", "포장 해체", "Install", "crate를 열고 장비 모듈을 꺼내는 작업입니다.", "절차, 청정도, 부품 누락, 손상 기록이 중요합니다."],
  ["Move-in", "라인 반입", "Install", "장비를 fab 또는 cleanroom 안으로 들여오는 단계입니다.", "반입 route, elevator, door size, 바닥 보호, escort, permit을 맞춥니다."],
  ["Set in Place", "정위치 배치", "Install", "장비를 layout 도면의 정확한 좌표에 놓는 작업입니다.", "POC와 service clearance가 맞아야 hook-up과 유지보수가 막히지 않습니다."],
  ["Leveling", "수평 맞춤", "Install", "장비 base나 module을 지정된 수평 기준에 맞추는 작업입니다.", "wafer handling, chamber sealing, vibration 안정성에 영향을 줍니다."],
  ["Alignment", "정렬", "Install", "module, robot, load port, chamber 위치 관계를 기준에 맞추는 작업입니다.", "기계 정렬이 틀리면 wafer handoff와 particle 문제가 생깁니다."],
  ["Seismic", "내진 고정", "Install", "지진이나 진동에 대비해 장비를 고정하는 구조 또는 요구사항입니다.", "anchor, bracket, site rule을 도면과 승인 기준으로 확인합니다."],
  ["Anchor", "고정 볼트", "Install", "장비나 support를 바닥/프레임에 고정하는 부품입니다.", "임의 체결이 아니라 위치, torque, 승인 조건을 따릅니다."],
  ["Footprint", "장비 점유 면적", "Install", "장비가 바닥에서 차지하는 실제 크기와 위치입니다.", "facility POC, 동선, 다른 장비와 간섭 여부를 보는 기본 정보입니다."],
  ["Service Clearance", "정비 여유공간", "Install", "문을 열고 부품을 빼고 사람이 접근할 수 있도록 필요한 공간입니다.", "처음 배치가 틀리면 나중에 PM/CM 작업성이 크게 떨어집니다."],
  ["Staging Area", "임시 대기 구역", "Install", "module, crate, 부품을 임시로 놓는 구역입니다.", "동선 방해, 오염, 분실, 안전 사고를 막기 위해 관리합니다."],
  ["Route Survey", "반입 경로 확인", "Install", "장비가 지나갈 길의 폭, 높이, 하중, 회전 공간을 미리 확인하는 작업입니다.", "move-in 당일 막히는 문제를 줄이는 핵심 준비입니다."],
  ["Lift Point", "인양 지점", "Install", "장비를 들어 올릴 때 사용할 수 있도록 지정된 구조 지점입니다.", "임의 지점에 sling을 걸면 장비 손상과 안전 사고가 납니다."],
  ["Hoist", "인양 장치", "Install", "무거운 물체를 들어 올리는 장비입니다.", "정격하중, 중심, 작업 반경, 통제 구역을 확인합니다."],
  ["Forklift", "지게차", "Install", "pallet이나 crate를 들어 이동하는 장비입니다.", "cleanroom 반입 가능 여부와 바닥 보호 조건을 확인합니다."],
  ["Pallet Jack", "팔레트 이동기", "Install", "pallet을 낮은 높이로 들어 밀어 이동하는 장비입니다.", "작은 이동도 손 끼임, 경사, 충돌 위험이 있습니다."],
  ["Shock Indicator", "충격 표시기", "Install", "운송 중 큰 충격을 받았는지 보여주는 표시 장치입니다.", "반입 전에 사진으로 남기고 이상 시 damage report를 엽니다."],
  ["Tilt Indicator", "기울어짐 표시기", "Install", "운송 중 crate가 허용 이상 기울었는지 보여줍니다.", "장비 내부 damage 가능성을 판단하는 첫 증거입니다."],
  ["Damage Report", "손상 보고", "Install", "운송/반입/설치 중 손상 의심 사항을 기록하는 문서입니다.", "사진, 시간, 위치, 발견자, 영향 범위를 같이 남깁니다."],
  ["Photo Log", "사진 기록", "Install", "현장 상태를 시간순 사진으로 남기는 기록입니다.", "설치 CE에게 사진은 기억보다 강한 증거입니다."],
  ["Site Readiness", "현장 준비상태", "Install", "전기, 가스, 배기, 냉각수, 공간, 안전 승인 등이 준비되었는지 확인하는 상태입니다.", "준비 안 된 site에서 일정만 밀어붙이면 안전과 품질이 무너집니다."],
  ["Commissioning", "시운전/초기 검증", "Install", "설치 후 각 subsystem을 켜고 정상 동작을 확인하는 단계입니다.", "power, vacuum, gas, motion, software 순서로 증거를 쌓습니다."],
  ["Bring-up", "초기 가동", "Install", "장비를 설치 상태에서 실제 동작 가능 상태로 올리는 과정입니다.", "한 번에 다 켜는 것이 아니라 interlock과 baseline을 확인하며 진행합니다."],
  ["Power-on", "전원 투입", "Install", "장비에 전원을 넣는 단계입니다.", "전압, 접지, breaker, EMO, interlock, smoke/smell/noise를 확인합니다."],
  ["Dry Run", "무공정 시험", "Install", "실제 위험 gas나 wafer 결과를 만들기 전 동작만 확인하는 시험입니다.", "motion, sequence, interlock, log를 안전하게 검증합니다."],
  ["Witness", "입회 확인", "Install", "고객 또는 담당자가 현장 시험/상태를 직접 확인하는 것입니다.", "중요 test는 누가 봤고 무엇을 승인했는지 남깁니다."],
  ["Sign-off", "승인 서명", "Install", "작업이나 test가 기준을 만족했다는 공식 승인입니다.", "install 완료는 말이 아니라 sign-off와 open item 상태로 판단합니다."],
  ["Handover", "인계", "Install", "설치팀에서 운영/서비스/고객에게 상태와 이슈를 넘기는 단계입니다.", "open item, baseline, 위험, 임시 조치, 다음 일정이 빠지면 안 됩니다."],
  ["Shift Handover", "교대 인계", "Work", "교대 근무자에게 현재 상태와 다음 조치를 넘기는 과정입니다.", "반복 설명보다 정확한 로그와 action owner가 중요합니다."],
  ["Open Item", "미해결 항목", "Work", "아직 닫히지 않은 문제, 요청, 후속 작업입니다.", "owner, due date, impact, blocker 여부로 관리합니다."],
  ["Blocker", "진행 막는 문제", "Work", "다음 단계로 넘어가지 못하게 하는 치명적 미해결 조건입니다.", "안전, facility, 권한, 부품, 고객 승인 blocker를 구분합니다."],
  ["Owner", "담당 책임자", "Work", "특정 action이나 issue를 책임지고 닫는 사람/조직입니다.", "owner가 불명확하면 문제는 오래 떠 있습니다."],
  ["RACI", "역할 책임표", "Work", "Responsible, Accountable, Consulted, Informed 역할을 나누는 방식입니다.", "복잡한 install에서 누가 실행하고 승인하는지 명확히 합니다."],
  ["Closeout", "마감 정리", "Work", "작업이 끝난 뒤 문서, 부품, 청소, 이슈 종료를 정리하는 단계입니다.", "좋은 CE는 끝났다는 말보다 닫힌 증거를 남깁니다."],
  ["Deliverable", "제출 산출물", "Work", "고객이나 내부에 제출해야 하는 문서, data, report입니다.", "SAT 결과, as-built, punch list, baseline trend가 deliverable이 됩니다."],
  ["Evidence Pack", "증거 묶음", "Work", "사진, log, 측정값, 승인 기록을 하나로 묶은 자료입니다.", "분쟁과 재발 분석에서 CE를 보호하는 자료입니다."],
  ["Deviation", "기준 이탈", "Quality", "정해진 절차나 기준에서 벗어난 상태입니다.", "임의 판단으로 묻지 말고 영향과 승인 여부를 문서화합니다."],
  ["Waiver", "예외 승인", "Quality", "기준 미달이나 절차 차이에 대해 공식적으로 예외를 인정하는 승인입니다.", "waiver 없이 넘긴 예외는 나중에 품질 문제로 돌아옵니다."],
  ["MOC", "변경관리", "Quality", "Management of Change. 설계/절차/조건 변경을 통제하는 절차입니다.", "gas, exhaust, safety logic, recipe 변경은 영향 평가가 필요합니다."],
  ["Change Control", "변경 통제", "Quality", "변경 전후 이유, 승인, 영향, rollback을 관리하는 방식입니다.", "현장 임기응변을 추적 가능한 엔지니어링 변경으로 바꿉니다."],
  ["Rollback", "원복", "Quality", "변경 전 상태로 되돌리는 계획 또는 실행입니다.", "시도하기 전 원복 가능성을 알고 들어가야 합니다."],
  ["Redline", "현장 수정 표시", "Drawing", "도면과 실제가 다를 때 도면 위에 수정 표시를 남기는 것입니다.", "as-built를 만들기 위한 중간 증거입니다."],
  ["Drawing Revision", "도면 개정판", "Drawing", "도면의 버전입니다.", "오래된 revision으로 hook-up하면 POC가 틀릴 수 있습니다."],
  ["P&ID", "배관계장도", "Drawing", "Piping and Instrumentation Diagram. 배관, valve, sensor, instrument 관계를 나타냅니다.", "gas, purge, exhaust, coolant troubleshooting의 지도입니다."],
  ["Hook-up Drawing", "연결 도면", "Drawing", "장비와 facility를 어디에 어떻게 연결할지 나타내는 도면입니다.", "현장 연결 전 POC, line label, size, spec을 확인합니다."],
  ["Tool Layout", "장비 배치도", "Drawing", "장비 위치와 주변 clearance, POC 관계를 보여주는 도면입니다.", "rigging, set in place, serviceability 판단의 기준입니다."],
  ["BOM", "자재 목록", "Drawing", "Bill of Materials. 필요한 부품과 수량 목록입니다.", "누락 부품과 잘못 온 부품을 빠르게 찾는 데 씁니다."],
  ["PPE", "보호구", "Safety", "Personal Protective Equipment. 보안경, 장갑, 방진복, face shield 같은 보호 장비입니다.", "작업 위험에 맞는 PPE가 없으면 작업을 멈춥니다."],
  ["Gowning", "방진복 착용", "Safety", "cleanroom에 들어가기 위해 정해진 순서로 보호복을 입는 절차입니다.", "오염 방지와 안전 모두를 위한 기본입니다."],
  ["Cleanroom Protocol", "청정실 규칙", "Safety", "cleanroom 안에서 이동, 접촉, 청소, 물품 반입을 관리하는 규칙입니다.", "CE의 손동작 하나가 particle source가 될 수 있습니다."],
  ["Stop-work Authority", "작업중지 권한", "Safety", "위험하다고 판단되면 누구든 작업을 멈출 수 있는 원칙입니다.", "불확실한 toxic gas, live power, rigging 위험에서는 멈추는 것이 실력입니다."],
  ["EHS", "환경보건안전", "Safety", "Environment, Health and Safety 조직 또는 기준입니다.", "gas, chemical, electrical, working at height 작업은 EHS와 연결됩니다."],
  ["Evacuation Route", "대피 경로", "Safety", "비상 시 빠져나가는 길입니다.", "gas 작업 전 알람, 대피 방향, muster point를 알아둡니다."],
  ["Muster Point", "비상 집결지", "Safety", "대피 후 인원 확인을 위해 모이는 장소입니다.", "fab 사고 대응에서는 위치를 실제로 알고 있어야 합니다."],
  ["ODH", "산소결핍위험", "Safety", "Oxygen Deficiency Hazard. 산소 농도가 낮아지는 위험입니다.", "질소나 불활성 gas도 질식 위험이 될 수 있습니다."],
  ["Asphyxiant", "질식성 가스", "Gas", "독성이 낮아도 산소를 밀어내 질식을 만들 수 있는 gas입니다.", "N2, Ar 같은 inert gas도 밀폐 공간에서는 위험합니다."],
  ["Inert", "불활성", "Gas", "일반 조건에서 반응성이 낮은 성질입니다.", "안전하다는 뜻이 아니라 산소결핍과 압력 위험은 남습니다."],
  ["Toxic", "독성", "Gas", "흡입/접촉 시 건강에 해를 줄 수 있는 성질입니다.", "detector, exhaust, purge, permit, SDS 확인이 기본입니다."],
  ["Corrosive", "부식성", "Gas", "금속, 피부, 눈, 호흡기를 손상시킬 수 있는 성질입니다.", "HCl 계열은 누출뿐 아니라 배기/배관 상태도 중요합니다."],
  ["Flammable", "가연성", "Gas", "불이 붙거나 폭발 범위를 만들 수 있는 성질입니다.", "ignition source, purge, interlock, exhaust 상태가 핵심입니다."],
  ["Pyrophoric", "자연발화성", "Gas", "공기와 만나 스스로 불이 붙을 수 있는 성질입니다.", "특수 가스 작업은 site 승인과 전용 절차 없이는 접근하지 않습니다."],
  ["Oxidizer", "산화성", "Gas", "다른 물질의 연소를 강하게 도울 수 있는 성질입니다.", "가연성 물질과 분리, compatible material 확인이 필요합니다."],
  ["TGM", "독성가스 감시장치", "Gas", "Toxic Gas Monitor. 독성 gas 누출을 감시하는 장치입니다.", "first gas introduction 전 detector 상태와 alarm path를 확인합니다."],
  ["VMB", "밸브 매니폴드 박스", "Gas", "Valve Manifold Box. 여러 gas line의 valve와 purge 경로를 담은 box입니다.", "line isolation, purge, leak check, label 확인 지점입니다."],
  ["VMP", "밸브 매니폴드 패널", "Gas", "Valve Manifold Panel. gas line valve와 계장을 모은 panel입니다.", "facility와 tool gas boundary를 이해할 때 봅니다."],
  ["Gas Box", "장비 내 가스 박스", "Gas", "장비 내부의 MFC, valve, sensor가 모인 gas control 영역입니다.", "gas flow 문제는 supply, gas box, chamber 쪽으로 나눠 봅니다."],
  ["Gas Panel", "가스 제어 패널", "Gas", "gas routing, valve, MFC, purge 요소가 모인 panel입니다.", "label과 P&ID를 맞춰보며 진단합니다."],
  ["Line Release", "라인 사용 승인", "Gas", "gas/coolant/exhaust line을 안전하게 사용할 수 있다고 승인하는 절차입니다.", "release 전 leak check, purge, detector, owner sign-off를 확인합니다."],
  ["First Gas Introduction", "첫 가스 도입", "Gas", "설치 후 처음으로 위험 또는 공정 gas를 장비에 넣는 단계입니다.", "가장 조심해야 하는 순간 중 하나이며 EHS, facility, tool 상태를 함께 봅니다."],
  ["Bump Test", "감지기 반응 확인", "Gas", "gas detector가 특정 gas에 반응하는지 확인하는 시험입니다.", "site 절차와 자격이 필요한 영역이며 임의로 수행하지 않습니다."],
  ["Slit Valve", "슬릿 밸브", "Vacuum", "chamber 사이 wafer가 지나가는 좁은 문 역할의 valve입니다.", "open/close sensor, seal, pressure match가 중요합니다."],
  ["Gate Valve", "게이트 밸브", "Vacuum", "vacuum line이나 chamber를 열고 닫는 큰 valve입니다.", "pumpdown 실패와 isolation 문제에서 자주 확인합니다."],
  ["Roughing Pump", "초기 배기 펌프", "Vacuum", "대기압 근처에서 vacuum으로 내려갈 때 쓰는 펌프입니다.", "roughing valve, foreline, leak과 함께 봅니다."],
  ["Dry Pump", "드라이 펌프", "Vacuum", "oil 없이 vacuum을 만드는 펌프입니다.", "반도체 장비에서 contamination과 maintenance를 줄이기 위해 많이 씁니다."],
  ["Turbo Pump", "터보 펌프", "Vacuum", "고진공을 만들기 위해 빠르게 회전하는 펌프입니다.", "vent, vibration, backing pressure, interlock을 조심합니다."],
  ["Backing Pump", "보조 배기 펌프", "Vacuum", "turbo pump 뒤쪽 압력을 낮춰주는 펌프입니다.", "backing 상태가 나쁘면 turbo 성능도 나빠집니다."],
  ["Vent", "대기압 복귀", "Vacuum", "vacuum chamber에 gas를 넣어 압력을 올리는 동작입니다.", "빠른 vent는 particle과 wafer movement 위험을 키울 수 있습니다."],
  ["O-ring", "밀봉 고무링", "Vacuum", "vacuum이나 gas가 새지 않도록 막는 ring seal입니다.", "손상, particle, 꼬임, 윤활 상태가 leak 원인이 됩니다."],
  ["Door Seal", "문 밀봉부", "Vacuum", "load lock이나 chamber door가 닫힐 때 sealing하는 부분입니다.", "particle, scratch, compression 문제가 pumpdown 실패로 보입니다."],
  ["Robot Blade", "웨이퍼 받침팔", "Automation", "robot이 wafer를 올려 옮기는 얇은 arm 끝부분입니다.", "scratch, sag, contamination, teach 위치를 확인합니다."],
  ["End Effector", "로봇 말단부", "Automation", "robot이 wafer를 실제로 잡거나 받치는 끝 부분입니다.", "wafer handoff 품질과 particle 리스크에 직접 연결됩니다."],
  ["Teach", "위치 학습", "Automation", "robot이 load port, aligner, chamber 위치를 정확히 알도록 기준 위치를 저장하는 작업입니다.", "teach가 틀리면 wafer break와 transfer error가 납니다."],
  ["Home", "원점 복귀", "Automation", "robot이나 actuator가 기준 위치로 돌아가는 동작입니다.", "home sensor와 limit sensor 문제를 구분합니다."],
  ["Mapping", "슬롯 확인", "Automation", "FOUP 안 어느 slot에 wafer가 있는지 확인하는 동작입니다.", "double wafer, cross slot, missing wafer 문제 예방에 중요합니다."],
  ["Aligner", "웨이퍼 정렬기", "Automation", "wafer notch/flat 위치와 중심을 맞추는 장치입니다.", "정렬 불량은 chamber handoff와 process uniformity 문제로 이어질 수 있습니다."],
  ["Slot", "웨이퍼 자리", "Automation", "FOUP이나 cassette 안에서 wafer가 들어가는 번호 위치입니다.", "slot mismatch는 lot 사고로 이어질 수 있습니다."],
  ["Cassette", "웨이퍼 운반틀", "Automation", "wafer 여러 장을 담는 용기 또는 내부 구조입니다.", "FOUP와 함께 wafer handling 문맥에서 나옵니다."],
  ["Load Port", "FOUP 접속부", "Automation", "FOUP를 장비 앞단에 올려 docking하는 장치입니다.", "door open, mapping, clamp, host carrier ID와 연결됩니다."],
  ["Docking", "맞물림 접속", "Automation", "FOUP나 module이 정확한 위치에 맞물려 연결되는 동작입니다.", "mechanical alignment와 sensor 확인이 필요합니다."],
  ["Handoff", "웨이퍼 전달", "Automation", "robot과 chamber/aligner/load lock 사이에서 wafer를 주고받는 순간입니다.", "가장 작은 위치 오차가 큰 사고로 이어질 수 있습니다."],
  ["Host", "공장 제어 시스템", "Controls", "장비와 생산 시스템을 연결해 lot, recipe, 상태 정보를 주고받는 상위 시스템입니다.", "장비는 좋아도 host communication이 안 되면 생산 투입이 막힙니다."],
  ["SECS/GEM", "장비 통신 표준", "Controls", "반도체 장비와 fab host가 통신하는 표준 방식입니다.", "remote command, alarm, event, recipe 관리와 연결됩니다."],
  ["FDC", "공정 데이터 감시", "Controls", "Fault Detection and Classification. sensor trace로 이상을 감지/분류하는 시스템입니다.", "시니어 CE는 FDC trend로 증상 전조를 읽습니다."],
  ["Recipe", "공정 조건 파일", "Controls", "온도, 시간, gas flow, pressure 같은 공정 조건 묶음입니다.", "잘못된 recipe 선택은 장비 문제가 아닌 process 사고가 됩니다."],
  ["Golden Trace", "정상 기준 파형", "Controls", "정상 장비의 sensor 변화 패턴을 기준으로 저장한 trace입니다.", "troubleshooting에서 현재 trace와 비교합니다."],
  ["Golden Tool", "기준 장비", "Controls", "같은 공정에서 가장 안정적 기준으로 삼는 장비입니다.", "chamber matching과 baseline 비교에 씁니다."],
  ["Event Log", "이벤트 기록", "Controls", "장비가 겪은 상태 변화와 명령 기록입니다.", "알람 직전의 작은 event가 원인 단서인 경우가 많습니다."],
  ["Alarm History", "알람 이력", "Controls", "과거 알람 발생 시간과 반복 패턴입니다.", "반복 알람은 부품보다 조건과 trend를 봐야 합니다."],
  ["Trace Data", "센서 추적 데이터", "Controls", "시간에 따른 pressure, flow, temperature, position 등 기록입니다.", "문제 재현이 어려울수록 trace가 강한 증거입니다."],
  ["Time Sync", "시간 동기화", "Controls", "장비, host, data system의 시간을 맞추는 것입니다.", "시간이 틀리면 log correlation이 무너집니다."],
  ["Anneal", "열처리", "RTP", "wafer를 가열해 dopant 활성화, 결함 회복, 막 특성 개선을 하는 공정입니다.", "temperature trace와 thermal budget이 핵심입니다."],
  ["Thermal Budget", "열 이력 총량", "RTP", "wafer가 받은 온도와 시간의 누적 영향입니다.", "너무 크면 diffusion과 device 성능 문제가 생길 수 있습니다."],
  ["Lamp Zone", "램프 제어 영역", "RTP", "RTP에서 여러 lamp를 구역별로 나눠 온도를 제어하는 영역입니다.", "zone balance가 wafer uniformity에 영향을 줍니다."],
  ["Pyrometer", "광학 온도계", "RTP", "wafer의 열복사 빛을 이용해 온도를 읽는 sensor입니다.", "window 오염과 emissivity가 측정 오차를 만듭니다."],
  ["Pattern Loading Effect", "패턴 의존 효과", "EPI", "wafer pattern 밀도나 노출 면적 차이가 성장 속도/품질에 영향을 주는 현상입니다.", "uniformity 문제를 장비만으로 단정하지 않게 해줍니다."],
  ["PLE", "패턴 의존 효과", "EPI", "Pattern Loading Effect의 약어입니다.", "EPI 결과 해석에서 layout과 exposed silicon area를 함께 봅니다."],
  ["SiGe", "실리콘저마늄", "EPI", "Silicon-Germanium. silicon과 germanium이 섞인 semiconductor material입니다.", "strain engineering과 source/drain EPI에서 자주 나옵니다."],
  ["Ge", "저마늄", "EPI", "Germanium. 반도체 재료 원소 중 하나입니다.", "SiGe 조성, carrier mobility, precursor 이해와 연결됩니다."],
  ["DCS", "디클로로실란", "Gas", "Dichlorosilane. silicon EPI/증착에서 언급되는 chlorosilane 계열 precursor입니다.", "구체 사용 여부와 조건은 장비/site 공식 문서로 확인합니다."],
  ["TCS", "트리클로로실란", "Gas", "Trichlorosilane. silicon source로 쓰일 수 있는 chlorosilane 계열 물질입니다.", "flammable/corrosive 가능성을 SDS로 확인해야 합니다."],
  ["HCl", "염화수소", "Gas", "Hydrogen Chloride. 부식성 gas로 surface cleaning/etch balance 문맥에서 나옵니다.", "leak, exhaust, scrubber, compatible material 확인이 중요합니다."],
  ["H2", "수소", "Gas", "Hydrogen. 환원 분위기나 carrier gas로 쓰일 수 있는 가연성 gas입니다.", "flammability와 purge/interlock 관리가 핵심입니다."],
  ["N2", "질소", "Gas", "Nitrogen. purge, vent, inerting에 널리 쓰는 불활성 gas입니다.", "독성은 낮아도 산소결핍 위험이 있습니다."],
  ["O2", "산소", "Gas", "Oxygen. 산화 공정이나 purge/clean 문맥에서 나옵니다.", "oxidizer라서 가연성 물질과 조합을 조심합니다."],
  ["NH3", "암모니아", "Gas", "Ammonia. 질화 또는 surface chemistry 문맥에서 나올 수 있는 gas입니다.", "toxic/corrosive 특성은 SDS와 site 기준으로 확인합니다."],
  ["PH3", "포스핀", "Gas", "Phosphine. n-type dopant source로 언급되는 독성/가연성 gas입니다.", "독성가스 관리, detector, purge, abatement 기준을 엄격히 봅니다."],
  ["AsH3", "아르신", "Gas", "Arsine. arsenic dopant source로 알려진 매우 유해한 gas입니다.", "취급 여부와 모든 조건은 공식 절차와 자격 범위 안에서만 다룹니다."],
  ["B2H6", "디보란", "Gas", "Diborane. boron dopant source로 언급되는 독성/가연성 gas입니다.", "line release와 first gas introduction 때 고위험 항목으로 봅니다."],
  ["Carrier Gas", "운반 가스", "Gas", "precursor나 반응 환경을 chamber까지 운반하는 gas입니다.", "flow stability와 purity가 process repeatability에 연결됩니다."],
  ["Dopant Gas", "도핑 가스", "Gas", "dopant 원소를 공급하기 위한 gas입니다.", "농도, safety class, MFC range, abatement 상태를 확인합니다."]
);

englishTermGuide.push(
  ["Susceptor", "웨이퍼 받침/가열체", "EPI/RTP", "공정 중 wafer를 받치고 열을 전달하는 부품입니다.", "오염, 위치, 열 균일도, particle source와 연결됩니다."],
  ["Native Oxide", "자연 산화막", "EPI", "공기 중에서 silicon 표면에 자연스럽게 생기는 얇은 산화막입니다.", "EPI 전 pre-clean으로 줄여야 interface defect를 줄일 수 있습니다."],
  ["Pre-clean", "공정 전 표면 세정", "EPI", "main growth 전에 표면 산화막과 오염을 줄이는 단계입니다.", "vacuum break, queue time, contamination 관리와 연결됩니다."],
  ["Byproduct", "부산물", "Process", "공정 반응 뒤 남거나 새로 생기는 gas/물질입니다.", "pump, exhaust, abatement, corrosion risk를 함께 봐야 합니다."],
  ["In-situ", "장비 안에서 연속 수행", "Process", "wafer를 꺼내지 않고 같은 vacuum/platform 안에서 이어서 처리하는 뜻입니다.", "오염과 queue time을 줄이는 장점이 있습니다."],
  ["Queue Time", "대기 시간", "Process", "한 공정 후 다음 공정까지 wafer가 기다리는 시간입니다.", "표면 재산화와 contamination risk에 영향을 줄 수 있습니다."],
  ["Trench", "패턴 홈", "Device", "wafer 구조 안에 파인 좁고 깊은 공간입니다.", "selective EPI에서는 trench 안을 균일하게 채우는 것이 중요합니다."],
  ["Void", "빈 공간 결함", "Quality", "막이 채워져야 할 곳에 남은 빈 공간입니다.", "deep trench fill에서 gas delivery와 growth balance가 나쁘면 생길 수 있습니다."],
  ["Interface", "계면", "Quality", "서로 다른 막이나 재료가 만나는 경계면입니다.", "EPI 품질은 epi-substrate interface 오염과 결함에 민감합니다."],
  ["Dopant Activation", "도펀트 활성화", "RTP", "넣어둔 dopant가 전기적으로 작동하도록 열처리하는 과정입니다.", "RTP temperature trace와 thermal budget이 핵심입니다."],
  ["Oxidation", "산화", "RTP", "산소 계열 분위기에서 silicon 또는 표면에 oxide를 만드는 과정입니다.", "oxidizer gas, ambient control, film thickness를 함께 봅니다."],
  ["Nitridation", "질화", "RTP", "질소 계열 chemistry로 표면이나 oxide/interface에 nitrogen 성분을 넣는 과정입니다.", "NH3/NO/N2O 같은 gas와 exhaust compatibility를 확인합니다."],
  ["RadOx", "라디컬 산화", "RTP", "radical oxygen chemistry를 이용하는 산화 공정 계열을 뜻합니다.", "low thermal budget과 interface engineering 문맥에서 봅니다."],
  ["Process Volume", "공정 공간 부피", "EPI", "chamber 안에서 gas가 반응하는 유효 공간 크기입니다.", "작을수록 gas 전환과 replenishment 제어가 유리할 수 있습니다."],
  ["Precursor Replenishment", "원료가스 보충", "EPI", "반응으로 소모된 precursor가 표면 근처에 다시 공급되는 과정입니다.", "deep trench나 selective growth uniformity와 연결됩니다."],
  ["Chamber Seasoning", "챔버 상태 길들이기", "EPI", "반복 공정으로 chamber wall/surface 상태가 안정화되는 현상 또는 준비 작업입니다.", "PM 후 첫 wafer 결과와 residual/memory effect를 볼 때 중요합니다."],
  ["Memory Effect", "잔류 영향", "Process", "이전 gas나 공정이 chamber/line에 남아 다음 결과에 영향을 주는 현상입니다.", "dopant gas나 Ge 계열 공정 후 trend를 볼 때 주의합니다."]
);

englishTermGuide.push(
  ["Seasoning", "챔버 길들이기", "EPI", "PM이나 chamber open 후 chamber 상태를 안정화하기 위해 dummy/test 공정을 반복하는 개념입니다.", "첫 product wafer 전 baseline 회복을 증명하는 evidence가 됩니다."],
  ["Dummy Wafer", "시험용 웨이퍼", "Quality", "제품 생산용이 아니라 장비 상태 확인이나 seasoning에 쓰는 wafer입니다.", "product risk를 줄이고 chamber response를 확인하는 데 씁니다."],
  ["Baseline Wafer", "기준 확인 웨이퍼", "Quality", "장비가 정상 기준에 돌아왔는지 확인하기 위해 쓰는 test wafer입니다.", "metrology 결과와 장비 trace를 한 묶음으로 저장해야 합니다."],
  ["Test Wafer", "시험 웨이퍼", "Quality", "공정 결과나 장비 상태를 확인하기 위해 사용하는 wafer입니다.", "제품 wafer 투입 전 안전한 검증 단계로 이해합니다."],
  ["Early-Life Monitoring", "초기 안정성 감시", "Install", "설치/PM/수리 후 초반 운전에서 drift와 반복 alarm을 집중 감시하는 것입니다.", "release 후 끝이 아니라 첫 lot과 초반 trend를 봐야 합니다."],
  ["First Lot", "첫 생산 묶음", "Quality", "장비 release 후 처음 투입되는 생산 lot입니다.", "장비 변경 후 첫 lot은 고객 영향이 커서 monitoring과 보고가 중요합니다."],
  ["Release", "생산 투입 승인", "Quality", "장비나 공정을 사용할 수 있다고 승인하는 상태입니다.", "pass evidence, open item, owner, rollback 조건과 함께 관리합니다."],
  ["Rs", "시트저항", "Quality", "박막이나 doped layer의 전기적 저항 특성을 보는 지표입니다.", "dopant activation, EPI doping, RTP 결과와 연결됩니다."],
  ["Slip", "결정 미끄럼 결함", "Quality", "열 stress 등으로 crystal lattice에 생기는 결함입니다.", "EPI/RTP 온도 조건과 wafer handling 안정성에 연결됩니다."]
);

englishTermGuide.push(
  ["Hold", "진행 보류", "Work", "안전, 품질, 고객 영향이 명확해질 때까지 다음 wafer나 다음 step으로 넘어가지 않는 판단입니다.", "좋은 CE는 멈출 조건을 미리 말할 수 있어야 합니다."],
  ["Stop Condition", "멈출 조건", "Safety", "작업을 계속하면 위험이나 품질 손상이 커질 수 있어 즉시 멈춰야 하는 기준입니다.", "toxic gas, exhaust, vacuum, live power, wafer break, 반복 particle burst는 항상 보수적으로 봅니다."],
  ["First Gas Introduction", "첫 공정가스 투입", "Gas", "install 또는 line work 후 처음으로 공정 gas를 tool 쪽에 넣는 고위험 확인 단계입니다.", "detector, exhaust, abatement, purge, permit, owner witness가 준비되지 않으면 진행하지 않습니다."],
  ["Ready Signal", "준비 완료 신호", "Controls", "facility나 subsystem이 동작 가능한 상태라고 tool에 알려주는 전기/통신 신호입니다.", "signal만 믿지 말고 실제 exhaust, abatement, coolant, pressure 상태와 대조해야 합니다."],
  ["Chamber-to-Chamber", "챔버 간 비교", "Quality", "같은 조건에서 여러 chamber의 결과와 trace를 비교해 matching 상태를 보는 방식입니다.", "metrology 조건과 wafer type을 고정하지 않으면 잘못된 결론을 낼 수 있습니다."],
  ["Path Split", "경로 분리 시험", "Troubleshooting", "wafer가 지나가는 chamber 조합을 나눠 어느 path에서 문제가 생기는지 좁히는 방법입니다.", "pre-clean only, EPI only, combined path처럼 분리하면 defect 원인 후보가 크게 줄어듭니다."],
  ["Trace Overlay", "트렌드 겹쳐보기", "Troubleshooting", "정상 run과 문제 run의 pressure, flow, temperature 같은 trace를 같은 시간축에 겹쳐 보는 방법입니다.", "wafer 결과와 tool 상태를 연결하는 가장 강한 evidence 중 하나입니다."],
  ["Customer Owner", "고객 담당 책임자", "Work", "site에서 facility, gas, process, safety 등 특정 영역을 승인하거나 판단하는 고객 측 책임자입니다.", "CE가 혼자 판단하면 안 되는 범위는 owner witness와 sign-off로 분리합니다."],
  ["Acceptance Limit", "인수 기준값", "Quality", "tool이 pass인지 판단하는 고객/OEM 기준입니다.", "공개 학습 웹에는 개념만 넣고 실제 수치와 조건은 현장 문서와 승인 절차로만 다룹니다."],
  ["Evidence Ladder", "증거 사다리", "Troubleshooting", "추정에서 출발해 log, trend, wafer map, metrology, witness record로 신뢰도를 높이는 사고 순서입니다.", "senior CE는 주장보다 evidence ladder로 고객을 설득합니다."]
);

englishTermGuide.push(
  ["Symptom", "관찰된 증상", "Troubleshooting", "root cause를 알기 전 현장에서 실제로 보인 alarm, trend, wafer 결과, 고객 관찰입니다.", "증상과 원인을 섞어 말하면 troubleshooting이 흔들립니다."],
  ["Suspected Cause", "의심 원인", "Troubleshooting", "아직 확정되지 않았지만 evidence로 확인해야 하는 원인 후보입니다.", "확정 전에는 hypothesis라고 말하고, 다음 evidence를 함께 제시합니다."],
  ["Action", "조치", "Work", "확인, 측정, 교체, 재시도, hold, escalation처럼 실제 수행한 일을 말합니다.", "누구 승인으로 무엇을 했는지 남겨야 handover가 가능합니다."],
  ["Result", "결과", "Work", "조치 후 alarm, trace, metrology, 재현 여부가 어떻게 바뀌었는지입니다.", "조치와 결과를 분리해야 효과가 있었는지 판단할 수 있습니다."],
  ["Prevention", "재발 방지", "Work", "같은 문제가 다시 생기지 않게 checklist, training, baseline, monitoring에 추가하는 항목입니다.", "시니어 CE 사고는 복구에서 끝나지 않고 재발 방지로 닫힙니다."],
  ["Customer Report", "고객 보고 문장", "Communication", "확인된 사실, 영향 범위, 진행 중인 확인, ETA, 필요한 owner를 고객이 이해할 수 있게 정리한 문장입니다.", "추정과 확정 사실을 분리하면 신뢰가 올라갑니다."],
  ["Summary Packet", "AI 요약 패킷", "Think Tank", "나중에 AI나 본인이 빠르게 읽을 수 있도록 symptom/evidence/action/result/prevention/report를 한 묶음으로 정리한 기록입니다.", "경험을 축적할수록 개인 지식 엔진의 검색성과 분석력이 좋아집니다."]
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
  return !!parent.closest("script, style, input, textarea, select, option, button, .no-term, .term-explain, .english-card, .glossary-grid, #source-list, .runbook-step, .runbook-detail-head, .flow-step-button, .cluster-board, .cluster-palette, .cluster-controls, .cluster-feedback, .process-rail, .process-timeline, .process-chamber, .process-state-grid, .wafer-layer-view, .process-source-strip, .process-stage-actions");
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
      span.dataset.tip = `${info.short} | ${info.plain} CE 관점: ${info.ce}`;
      span.title = `${info.term}: ${info.plain} CE 관점: ${info.ce}`;
      span.setAttribute("aria-label", `${info.term}: ${info.short}. ${info.plain} CE 관점: ${info.ce}`);
      span.textContent = match;
      fragment.append(span);
      lastIndex = index + match.length;
      return match;
    });
    fragment.append(document.createTextNode(text.slice(lastIndex)));
    node.parentNode.replaceChild(fragment, node);
  });
  const hitBatchLimit = nodes.length === 300;
  isEnhancingTerms = false;
  if (hitBatchLimit) scheduleTermEnhance();
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
