# SECTIONS.md

# SECTIONS: 페이지 구조 및 씬 명세

## 1. 문서 목적

이 문서는 페이지의 전체 섹션 구조와 각 섹션 내부의 씬 구조를 정의한다.
AI는 이 문서를 기준으로 HTML 구조를 작성한다.

본 프로젝트는 하나의 원페이지 랜딩페이지이며, 각 섹션은 여러 개의 Scene을 포함할 수 있다.
Scene 1개는 기본적으로 화면 1장, 즉 `100vh`를 차지한다.

---

## 2. 전체 섹션 순서

페이지는 아래 순서로 구성한다.

```text
Section 01. Hero
Section 02. Intro
Section 03. Day 1
Section 04. Day 2
Section 05. Day 3
Section 06. Day 4
Section 07. Day 5
```

---

## 3. 공통 Scene 규칙

각 Section은 여러 개의 Scene을 가질 수 있다.
Scene 1개는 화면 한 장을 차지한다.

각 Scene은 아래 항목을 기준으로 작성한다. 항목이 필요 없을 경우 생략.

```md
### Section [번호]. [씬 이름]

#### Purpose
이 씬의 목적을 작성한다.

#### Layout
- width:
- height:
- background:
- text position:
- image position:
- video position:
- object arrangement:

#### Text
- Caption:
- Title:
- Body:
- Button:

#### Text Style
- Caption font-size:
- Caption color:
- Title font-size:
- Title color:
- Body font-size:
- Body color:
- Text align:

#### Assets
##### Images
| 역할 | 파일명 | 경로 | 위치 | 크기 | 설명 |
|---|---|---|---|---|---|

##### Videos
| 역할 | 파일명 | 경로 | 위치 | 크기 | 재생 방식 |
|---|---|---|---|---|---|

#### Motion
##### Text Motion
- Caption:
- Title:
- Body:
- Button:

##### Image Motion
- Main image:
- Sub image:
- Background image:

##### Scroll Motion
- 스크롤 진입 시:
- 스크롤 진행 중:
- 스크롤 이탈 시:

#### Drag and Drop
- 사용 여부:
- 드래그 대상:
- 드롭 영역:
- 성공 시 동작:
- 실패 시 동작:

---
### Section [01]-1

#### Purpose
첫 화면에서 프로젝트의 핵심 분위기와 메시지를 강하게 전달한다.

#### Layout
- width:100vw
- height:100vh
- background:#FFFCF0 
- text position: 중앙 상단


#### Text
- Title: 바이브코딩


#### Text Style
- Title font-size: 120pt
- Title color: 검정

#### Assets
##### Images
| 역할 | 파일명 | 경로 | 위치 | 크기 | 설명 |
|---|---|---|---|---|---|

| Main image | hero_island.webp | assets/images/hero_island.webp | 중앙하단 | 메인섬 |
| Sub image | hero_building.webp | assets/images/hero_building.webp | 메인 이미지 위인데 조금 겹치도록 | section 02로 가는 트리거 |

#### Motion
##### Text Motion
- Title:
페이지 진입 시 Title 등장 후  Motion-V / Motion Plus의 splitText를 사용해서 .wavy 클래스가 붙은 텍스트만 글자 단위로 쪼개고, 각 글자가 위아래로 움직이는 wave 애니메이션을 넣어줘.

적용 문구는:
바이브코딩

요구사항:
글자별 y축 이동: [-20, 20]
무한 반복
mirror 반복
easeInOut
duration 2초
stagger로 글자마다 딜레이 적용
폰트 로딩 완료 후 실행
기존 레이아웃과 디자인은 유지


##### Image Motion
- Main image: title 나온 후 아래에서 0.4초 뒤 fade-up 된다.
- Sub image: main 이미지 나온 후 그자리에서 0.4초 뒤 fade-in 된다.


##### Scroll Motion
- 스크롤 진입 시: 이미지 전체 확대 (동일 비율로 같이)
- 스크롤 진행 중: 계속 확대
- 스크롤 이탈 시: 멈춤
* 스크롤시 메인 이미지와 인터렉션 이미지가 커지면서 타이틀이 안보여지고 메인 이미지가 전체 화면을 다 덮으면 section 02-1로 이동 




---

### Section [02]-1

#### Purpose
커리큘럼 설명

#### Layout
- width:100vw
- height:100vh
- background:1C6658
- text position: 화면 좌측 이미지보다는 위에 (이미지랑 겹치도록)
- image position: 화면 중앙


#### Text
- Body: vibe <br /> coding <br /> curriculum
좌측 정렬


#### Text Style

- Body font-size:120pt
- Body color:검정
- Text align: 좌측 정렬

#### Assets
##### Images
생성해서 넣어줘
분리된 카드 5개, 세로가 더 긴형태, 글래스모피즘 스타일로 뒤가 비치는 형태
첫번째카드 텍스트: Day1 <br /> 준비 
두번째카드 텍스트: Day2 <br /> 디자인
세번째카드 텍스트: Day3 <br /> 프론트엔드
네번째카드 텍스트: Day4 <br /> 백엔드
5번째카드 텍스트: Day5 <br /> 발표
Dayn 보다 뒤에 오는 텍스트들이 더 크도록, 텍스트가 카드 밖으로 삐져나오지 않도록 
텍스트들은 모두 중앙 정렬 
카드들은 일렬로 차근차근 하나씩 보이도록


##### Image Motion
스크롤 하면 파도처럼 화면 밖에서 왼쪽으로 등장
스크롤 멈추면 제자리에서 floating 하기
카드가 화면내에 다보이면 끝

##### Scroll Motion
이미지 모션이 끝나고 스크롤하면 Section 03-1으로 이동

### ### Section [03]-1

#### Purpose
바이브코딩 셋팅 소개 

#### Layout
- background:#FFFCF0
- 좌측 중앙에 드래그요소 이미지들  우측 중앙에 드랍영역 이미지들

#### Text
- Caption: Day1


#### Text Style
- Caption font-size: 40pt
- Caption color: 검정


#### Assets
##### Images
하단 설명에 따라 생성해줘
좌측에 아이콘 이미지 세개가 있음 
1. 클로드 이미지 (클로드 로봇 아이콘 사용)
2. node.js 이미지
3. 깃헙 이미지 

우측에 좌측 아이콘 이미지들이 다 들어갈 만한 택배박스가 열어져 있음 

좌측 우측 사이엔 드랍하라는 알럿 화살표 이미지가 있음 

그리고 드래그앤 드랍 완료했을때 택배상자가 완전 포장된 이미지가 필요


##### Image Motion
좌우 이미지 사이 화살표 드래그앤 드랍하라고 우측으로 이동 다시 제자리로 오는 모션 반복 
사용자가 드래그 시작할때는 멈춤 

##### Scroll Motion
드래그앤 드랍 완료 후 스크롤내리면 Section [03]-2로 넘어감

#### Drag and Drop
- 사용 여부: 네
- 드래그 대상:좌측 아이콘 이미지 3개
- 드롭 영역: 우측 상자
- 성공 시 동작:상자에 들어감
- 실패 시 동작:다시 원래 있던 자리로 들어감
- 3개다 드랍완료시 택배가 포장되고 그 위에 컨페티 모션 2회 반복

### Section [03]-2

#### Purpose
깃헙에 홈페이지를 배포 하는 방법 

#### Layout
- background:#FFFCF0
- 이미지는 화면 중앙에 배치

#### Text
- Caption:Day1

#### Text Style
- Caption font-size:40pt


#### Assets
##### Images
이미지 생성해줘
이미지는 깃허브 배포 사이트에서 셋팅페이지
1.이미지내 우상단 버튼: settings
2.이미지내 좌하단 버튼: pages
3.이미지내 중앙 하단 버튼: main
4.이미지내 중앙 상단 버튼: save
버튼 디자인은 쭈굴쭈굴 한 라인으로 대충 네모로 만들어줘


#### Motion


##### Image Motion
스크롤을 내릴때마다 이미지내 버튼들이 1번-4번 순서대로 토글 이미지로 변경됨 

##### Scroll Motion
이미지 모션 스크롤 완료시 Section [04]-1로 넘어감 

### Section [04]-1

#### Purpose
ai 디자인 사이트 소개 

#### Layout
- background:#FFFCF0
- text position:비디오 위 좌측라인에 맞춰서 
- video position:화면 왼쪽 중앙


#### Text
- Caption:Day2
- Title: Google Stitch
비디오 우측에 텍스트 추가 /무료니까 잘리기전에/


#### Text Style
- Caption font-size:40pt
- Caption color:검정
- Title font-size:100pt
- Title color: 검정


#### Assets


##### Videos
title 아래 적당히 넣고 스크롤 시작시 재생되도록 


##### Scroll Motion
영상 재생 완료 후 스크롤 하면 Section [04]-2로 넘어감



### Section [04]-2

#### Purpose
디자인 잘하는 방법 설명

#### Layout
- background:#FFFCF0
- text position: 화면 정중앙


#### Text
- Caption: Day2

- Body: 디자인 잘하는 방법
- 그리고 텍스트 하단에 알럿 텍스트로 작게 *아무데나 우클릭* 이라고 적어줘


#### Text Style

- Body font-size:120pt
- Body color:검정

사용자가 우클릭하면 dark glassmorphism 스타일의 floating menu UI가 나오도록 구현해줘. 
## 목표
- 좌측에는 메인 메뉴
- 특정 메뉴에 hover 또는 click하면 우측에 서브메뉴가 펼쳐짐
- 텍스트,서브메뉴 항목은 내가 쉽게 수정할 수 있게 데이터 배열로 분리
- 전체 디자인은 macOS context menu / command menu 느낌

## 디자인 스타일
- 배경: 어두운 블랙/그레이 그라데이션
- 메뉴 박스: 반투명 다크 배경
- backdrop-filter blur 적용
- border: 얇은 회색 라인
- border-radius: 10~14px
- box-shadow: 은은하게
- 텍스트: 흰색/연회색
- hover 또는 active 상태는 파란색 하이라이트
- 서브메뉴가 있는 항목은 오른쪽 화살표 표시

## 인터랙션
- 메인 메뉴 항목에 hover하면 active 처리
- 서브메뉴가 있는 항목이면 오른쪽에 submenu 표시
- submenu는 메인 메뉴 오른쪽에 붙어서 나타남
- submenu 안에도 항목 리스트 표시
- 애니메이션은 opacity + translateX로 부드럽게 등장

## 텍스트
첫번째 메인 메뉴: 0원 서브메뉴: 레퍼런스 5000개 보기
두번째 메인 메뉴: 5000만원/once 서브메뉴:디자인과 졸업하기 
세번째 메인 메뉴: 5000먼원/annual 서브메뉴: 디자이너 고용하기 
네번째 메인 메뉴: 아 모르겠다 서브메뉴: 컬러1개, 프리텐다드, 이것 하지마

##### Scroll Motion
스크롤 하면 Section [05]-1로 넘어감

### Section [05]-1

#### Purpose
클로드 명령어 소개 

## Section Title
Claude Cheat Keys

## Concept
처음 Claude Code를 쓰는 사람이 헷갈리는 명령어와 입력 팁을 
게임 튜토리얼처럼 하나씩 해금하는 섹션

## Layout
- height: 100vh
- background: #0B0F14
- center: 터미널 카드
- right: 현재 명령어 설명 카드
- bottom: 진행 인디케이터 01 / 09

## Visual Style
- 터미널 UI
- 픽셀/도트 아이콘
- 네온 그린 포인트
- danger 명령어만 레드 계열
- 커서 깜빡임

### 01. /compact
Title: 맥락은 살리고, 무게만 줄이기
Desc: 대화가 누적됐지만 초기화하긴 싫을 때 사용

Motion:
- command: typewriter
- card: fade-up
- cursor: blink

### 02. /clear
Title: 완전 새 판 깔기
Desc: 지금까지의 대화를 완전히 초기화할 때 사용

Motion:
- 기존 카드들이 glitch-out
- 새 빈 터미널 화면 등장

### 03. /init
Title: 프로젝트 세팅 저장
Desc: 프로젝트 골격이 어느 정도 잡혔을 때 반드시 실행

Motion:
- folder icon 생성
- config file이 착착 쌓이는 느낌

### 04. /rewind
Title: 아차 싶을 때 되감기
Desc: 이전 상태로 복구하면서 토큰 소모를 최적화

Motion:
- timeline bar가 뒤로 감김
- 카드가 reverse slide

### 05. @파일이름
Title: 파일 소환
Desc: 특정 파일을 Claude에게 첨부하거나 참조시킬 때 사용

Motion:
- 파일 아이콘이 터미널 안으로 drag-in

### 06. Shift + Enter
Title: 줄바꿈
Desc: 메시지를 보내지 않고 다음 줄로 이동

Motion:
- 키보드 Shift와 Enter 키가 동시에 반짝임

### 07. 백틱 3개
Title: 코드 블록 열기
Desc: 코드를 깔끔하게 구분해서 입력

Motion:
- 텍스트 박스가 코드 에디터 형태로 변환

### 08. ESC 두 번
Title: 입력 초기화
Desc: 작성 중인 입력을 빠르게 비울 때 사용

Motion:
- 입력창 텍스트가 파사삭 사라짐

### 09. Danger Mode
Title: 댄저러스 모드
Desc: 권한 확인 없이 빠르게 진행할 때 사용. 진짜 조심.

Command:
claude --dangerously-skip-permissions
claude --continue --dangerously-skip-permissions

Motion:
- 화면이 살짝 red flash
- warning badge 등장
- terminal border가 빨간색으로 변경

Claude Code 명령어 치트키를 보여주는 인터랙티브 섹션을 만들어줘.

컨셉은 "Vibe Coding Survival Kit"이고, 게임 튜토리얼에서 단축키가 하나씩 해금되는 느낌이야.

구현 조건:
- 전체 섹션 height는 100vh
- 배경은 어두운 터미널 느낌
- 중앙에는 터미널 카드
- 명령어는 typewriter 효과로 하나씩 등장
- 설명 카드는 fade-up 또는 slide-in으로 등장
- 이전 명령어는 opacity를 낮추고, 현재 명령어만 강조
- `/clear`는 기존 내용이 glitch-out 되면서 초기화되는 느낌
- `/rewind`는 타임라인이 뒤로 감기는 느낌
- `@파일이름`은 파일 아이콘이 터미널로 들어가는 느낌
- `Shift + Enter`, `ESC 두 번`은 키보드 키가 반짝이는 UI로 표현
- `claude --dangerously-skip-permissions`는 Danger Zone으로 분리해서 빨간 경고 스타일로 보여줘
- three.js, 사운드, 복잡한 3D는 쓰지 말고 HTML/CSS/JS 모션 위주로 구현해줘
- 반응형은 우선 고려하지 말고 데스크탑 기준으로 만들어줘


##### Scroll Motion
스크롤 하면 Section [05]-2로 넘어감

##### Text
좌상단 Day4 캡션 이전 섹션이랑 동일하게 넣어줘 

### Section [05]-2

#### Purpose
페이지 수에 따른 md 나누기 

##### Text
좌상단 Day4 캡션 이전 섹션이랑 동일하게 넣어줘 

좌측에 페이지 적이라고 적힌 버튼과 페이지 많 이라고 적힌 버튼이 세로로 나열되어 있고 우측에는 네모 블럭이 세개 있는데 하나는 html 적혔고 하나는 자바 하나는 css가 적혀 있음 

##### motion

디폴트 상태는 페이지 적 버튼에 hover on 되어 있고 블록들이 일렬로 세워져서 한줄로 보임
스크롤 내리면 페이지 많 버튼에 hover on 되면서 우측 블록들이 세개로 각각 가로 정렬로 사이 간격 있도록 띄어져 있음 

##### Scroll Motion
스크롤 하면 Section [06]-1로 넘어감

### Section [06]-1

#### Purpose
백엔드 배웠으나 너무 어렵다

여기 섹션만 배경 색 Section #160081 텍스트 색깔 #fff    로 지정

좌상단에 다른 섹션들 처럼 캡션 day5로 해주고 

그 옛날 컴퓨터 에러 창 처럼 내가 하단에 쓴 텍스트를 스크롤이 내려감에 따라 타이핑 되는 모션 나오게 해줘 한글자 한글자마다 그리고 넘치는 텍스트는 안해줘도 됩니다

텍스트: 가벼운 기획엔 백엔드 필요가 없고 이미되어있는 기능 연결이 좋음 회원수 100명 이상부터 랏스고 개발언어 파이썬 장고 Ai 개발은 솔직히 언어 상관 없다 백엔드 언어 개많음 
프론트엔드는 html css javascript 장고 (풀셋트) / FastAPI Url db 아키텍쳐 설계는 직접하는것 보다 보면서 빠진 페이지 설계 해달라고 하는게 쉬운데 개발베이스는 해라 디비는 진짜 ,,, 설계  잘해야댐 잘못설계하면 다 날려야댐..
디비 설계 논리는 한달 정도 공부,,, 하는것이 좋음 ..............

이 텍스트가 화면에 꽉차면 화면 정중앙에 작게 Error! 알럿창이(빨간색 네모) 뜨고 알럿창 아래 작게 흰색 텍스트로: 너무 어려움 이라고 써주고 

전체 페이드 천천히 사라지면서 다시 원래 배경색으로 텍스트 검정으로 나오고 
스크롤 할때마다 1줄씩 나오게 해줘 

"높은 모델 쓰는 사람이 경쟁력을 갖는다"
"서버는 돈주고 사자"
"오늘 할일을 미루면 시간이 단축되는 시대"

텍스트 다 나오면 우하단에 완료 버튼이 나옴 (청록색네모에 텍스트는 흰색 )

완료 버튼 누르면 Section [7]-1으로 이동

### Section [07]-1

좌측캡션에 이전 섹션들 처럼 5일차 해주고 

화면 중간 좌측에 발표 우측에 결석 텍스트가 크게 있고 
발표를 마우스 오버하면 하단에 서울로 가는 비행기 티켓 이미지가 나오고 
결석을 마우스 오버하면 하단에 바이브코딩 10기 신청하는 티켓이 나옴 
