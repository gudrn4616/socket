# 웹 소켓 게임 만들기
### 내일배움캠프 6기

## 예시

이 프로젝트는 간단한 웹 소켓 게임을 만드는 예제입니다. 게임은 플레이어가 장애물을 피하고 아이템을 수집하는 방식으로 진행됩니다. 아래는 게임의 주요 기능과 코드 예시입니다.

### 주요 기능

1. **게임 시작 및 종료**: 게임은 특정 키를 눌러 시작하고, 플레이어가 장애물에 충돌하면 종료됩니다.
2. **스테이지 이동**: 플레이어가 일정 점수를 획득하면 다음 스테이지로 이동합니다.
3. **아이템 수집**: 플레이어는 게임 중에 나타나는 아이템을 수집하여 추가 점수를 얻을 수 있습니다.

## 프로젝트 구성

이 프로젝트는 다음과 같은 폴더와 파일로 구성되어 있습니다:

- `index.html`: 게임의 메인 HTML 파일입니다.
- `style.css`: 게임의 스타일을 정의하는 CSS 파일입니다.
- `app.js`: 게임의 주요 로직이 담긴 JavaScript 파일입니다.
- `assets/`: 게임에 사용되는 이미지, 소리 파일 등이 저장된 폴더입니다.

## 프로젝트 프로그램 설치방법

1. 이 저장소를 클론합니다:
   ```bash
   git clone https://github.com/username/websocket-game.git
   ```
2. 프로젝트 폴더로 이동합니다:
   ```bash
   cd websocket-game
   ```
3. 필요한 패키지를 설치합니다:
   ```bash
   npm install
   ```

## 프로젝트 프로그램 사용법

1. 로컬 서버를 시작합니다:
   ```bash
   npm start
   ```
2. 웹 브라우저를 열고 `http://localhost:3000`에 접속합니다.
3. 게임을 시작하려면 키보드의 특정 키(예: 스페이스바)를 누릅니다.
4. 게임을 플레이하면서 장애물을 피하고 아이템을 수집합니다.
5. 일정 점수를 획득하면 다음 스테이지로 이동합니다.
6. 장애물에 충돌하면 게임이 종료됩니다. 다시 시작하려면 페이지를 새로고침합니다.



