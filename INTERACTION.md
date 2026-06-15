
# INTERACTION.md

# 인터랙션 및 모션 명세

## 1. 문서 목적

이 문서는 페이지 전체의 모션, 스크롤 인터랙션, 드래그앤드랍, 비디오 동작을 정의한다.

본 프로젝트에서는 아래 기능을 사용하지 않는다.

- Three.js 사용 안 함
- 사운드 사용 안 함
- 반응형 구현 안 함

---

## 2. 사용 기술

- HTML5
- CSS3
- JavaScript
- GSAP
- GSAP ScrollTrigger

---

## 3. 전체 스크롤 규칙

- 기본 스크롤 방향: 세로
- 각 Scene은 기본적으로 `100vh` 높이를 가진다.
- 각 Scene은 화면 한 장처럼 보이도록 구성한다.
- 섹션별 세부 스크롤 모션은 `SECTIONS.md`의 `Scroll Motion` 항목을 따른다.
- 가로 스크롤이 필요한 경우 해당 Scene에 명시한다.

---

## 4. 기본 텍스트 모션 규칙

섹션별로 별도 지정이 없을 경우 아래 기본 모션을 사용한다.

### Caption
- opacity: 0 → 1
- y: 20px → 0
- duration: 0.6s

### Title
- opacity: 0 → 1
- y: 48px → 0
- duration: 0.9s

### Body
- opacity: 0 → 1
- y: 32px → 0
- duration: 0.8s
- delay: 0.2s

### Button
- opacity: 0 → 1
- y: 24px → 0
- duration: 0.6s
- delay: 0.35s

---

## 5. 기본 이미지 모션 규칙

섹션별로 별도 지정이 없을 경우 아래 기본 모션을 사용한다.

### Background Image
- scale: 1.08 → 1
- opacity: 0 → 1
- duration: 1.2s

### Main Image
- opacity: 0 → 1
- y: 40px → 0
- scale: 0.96 → 1
- duration: 0.9s

### Sub Images
- opacity: 0 → 1
- y: 24px → 0
- stagger: 0.15s
- duration: 0.6s

---

## 6. ScrollTrigger 규칙

GSAP ScrollTrigger를 사용해 스크롤 위치에 따라 모션을 실행한다.

### 기본 진입 조건
- trigger: 해당 Scene
- start: "top 75%"
- end: "bottom 25%"
- toggleActions: "play none none reverse"

### Pin 사용
Pin 효과는 섹션별로 명시된 경우에만 사용한다.

```md
Scroll Motion:
- pin: 사용
- pin duration: 200%