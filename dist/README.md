# FEP/EPI Customer Engineer Trainer

Applied Materials FEP/EPI, RTP, Epitaxy Customer Engineer 학습용 개인 웹앱입니다.

## 지금 쓰는 개인서버 모드

이 폴더는 이 PC를 개인 서버처럼 쓰도록 구성되어 있습니다.

```bat
run-personal-server.cmd
```

접속 주소:

```text
로컬: http://127.0.0.1:4180/
외부 고정 안내 페이지: https://dkwiskk28281.github.io/project_universe/amat-fep-epi-trainer/current-vault-url.html
현재 tunnel 후보: https://fep-epi-vault-9175.loca.lt
비밀번호: 9175
```

동작 방식:

- `vault-server.js`가 이 PC에서 비밀번호 보호 서버를 엽니다.
- `server-supervisor.js`가 vault 서버와 public tunnel을 함께 감시하고, 죽으면 다시 시작합니다.
- 외부 접속은 localtunnel을 통해 `https://fep-epi-vault-9175.loca.lt`로 연결됩니다.
- localtunnel이 다른 임시 URL을 반환하면 `current-vault-url.html` 안내 페이지가 자동 갱신됩니다.
- HTML, JS, CSS, API 모두 서버 측 로그인 뒤에 숨겨집니다.
- 싱크탱크 기록과 학습 상태는 계속 `D:\FEP_EPI_ThinkTank_Vault`에 저장됩니다.

상태 확인:

```bat
personal-server-status.cmd
```

중지:

```bat
stop-personal-server.cmd
```

브라우저 열기:

```bat
open-personal-server.cmd
```

## Windows 로그온 자동 시작

PC를 켤 때 자동으로 개인서버가 켜지게 하려면 아래 파일을 한 번 실행합니다.

```bat
install-personal-server-startup.cmd
```

자동 시작을 해제하려면 아래 파일을 실행합니다.

```bat
uninstall-personal-server-startup.cmd
```

주의:

- 외부 URL은 이 PC가 켜져 있고 인터넷에 연결되어 있을 때만 살아 있습니다.
- 무료 tunnel 주소는 서비스 상태에 따라 일시적으로 접속이 불안정할 수 있습니다.
- 회사, 고객사, 장비 매뉴얼, 라인 보안 정책에 해당하는 비공개 정보는 이 저장소나 외부 URL에 입력하지 마세요.

## D 드라이브 저장 구조

개인서버가 켜져 있으면 모든 기록이 아래 구조로 누적됩니다.

```text
D:\FEP_EPI_ThinkTank_Vault\index.json
D:\FEP_EPI_ThinkTank_Vault\latest-state.json
D:\FEP_EPI_ThinkTank_Vault\server-status.json
D:\FEP_EPI_ThinkTank_Vault\public-url.txt
D:\FEP_EPI_ThinkTank_Vault\entries\YYYY\MM\entry-id.json
D:\FEP_EPI_ThinkTank_Vault\snapshots\state-YYYYMMDD-HHMMSS.json
D:\FEP_EPI_ThinkTank_Vault\backups\entry-id-timestamp.json
D:\FEP_EPI_ThinkTank_Vault\exports\thinktank-export.json
D:\FEP_EPI_ThinkTank_Vault\server-logs\
```

브라우저 보안 정책 때문에 원격 웹이 사용자 PC의 `D:\` 드라이브에 직접 저장할 수는 없습니다. D 드라이브 자동 저장은 이 PC에서 `vault-server.js`가 실행 중일 때 동작합니다.

## VPS 또는 진짜 24/7 서버 배포

PC를 꺼도 계속 접속되는 진짜 24/7 개인서버가 필요하면 VPS에 올립니다. 이 폴더에는 그때 쓸 파일도 포함되어 있습니다.

```text
Dockerfile
docker-compose.yml
fep-epi-vault.service
Caddyfile.example
```

Docker 방식:

```bash
docker compose up -d --build
```

systemd 방식:

```bash
sudo mkdir -p /opt/fep-epi-vault /var/lib/fep-epi-vault
sudo cp -r . /opt/fep-epi-vault
sudo cp fep-epi-vault.service /etc/systemd/system/fep-epi-vault.service
sudo systemctl daemon-reload
sudo systemctl enable --now fep-epi-vault
```

VPS에서 쓸 때는 반드시 환경 변수의 `EPI_VAULT_SESSION_SECRET`을 긴 랜덤 문자열로 바꾸고, 가능하면 Caddy나 Nginx로 HTTPS를 붙이세요.

## Cloudflare 원격 배포 옵션

GitHub Pages는 정적 호스팅이라 서버 측 비밀번호 보호와 원격 DB 저장을 직접 제공하지 않습니다. Cloudflare Pages + Pages `_worker.js` + D1 DB를 쓰면 외부 서버리스 방식으로도 배포할 수 있습니다.

Cloudflare Pages 빌드 설정:

```text
Build command: npm run build
Build output directory: dist
Root directory: 비워둠
```

포함된 파일:

```text
_worker.js
cloudflare-d1-schema.sql
```

Cloudflare Pages에서 이 폴더를 프로젝트로 배포하고, D1 database를 만든 뒤 binding 이름을 `DB`로 연결합니다.

환경 변수:

```text
EPI_PASSWORD=9175
SESSION_SECRET=긴_랜덤_문자열
```

## 학습 기능

- FEP/EPI/RTP 장비군 학습
- Centura/Vantage 구조와 wafer path 시뮬레이션
- install, facility hook-up, gas safety, line compliance 학습
- 전기 기초, DVM, relay, interlock, troubleshooting 학습
- 초보자용 영어 용어 설명과 현장 용어집
- 논문/공개자료 기반 학습 인덱스
- 싱크탱크형 경험 기록 저장소

## 안전 기준

이 웹앱은 공개 자료 기반 학습 도구입니다. 실제 장비 조작, 전기 작업, toxic gas 작업, interlock, LOTO, 고객사 라인 규칙은 반드시 Applied Materials 공식 교육, 고객사 site rule, 장비별 공식 매뉴얼, 현장 책임자 지시에 따라 수행해야 합니다.
