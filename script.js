'use strict';
gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   HEADER – active link on scroll
═══════════════════════════════════════ */
function initHeader() {
  const links = document.querySelectorAll('.nav-link');
  const ids = ['hero','intro','day-1','day-2','day-2-design','day-4','day-4-md','day-5','day-5-final'];

  function updateActive() {
    let current = '';
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 80) current = el.dataset?.section || id;
    });
    links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════
   01  HERO
═══════════════════════════════════════ */
function initHero() {
  const titleSpan = document.querySelector('.hero-title .wavy');
  if (!titleSpan) return;

  // Split text into spans
  const text = titleSpan.textContent;
  titleSpan.innerHTML = '';
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? ' ' : ch;
    titleSpan.appendChild(s);
  });
  const chars = document.querySelectorAll('.hero-title .char');

  document.fonts.ready.then(() => {
    // Fade-in appear
    gsap.fromTo(chars,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .7, stagger: .06, ease: 'power2.out' }
    );
    // Wave loop
    gsap.to(chars, {
      y: -20, duration: 2, ease: 'sine.inOut',
      yoyo: true, repeat: -1,
      stagger: { each: .14, from: 'start', repeat: -1 },
      delay: 1
    });
  });

  // Images: island then building
  const island   = document.querySelector('.hero-island');
  const building = document.querySelector('.hero-building');
  if (island) gsap.fromTo(island,   { opacity:0, y:60 }, { opacity:1, y:0, duration:.9, delay:.5 });
  if (building) gsap.fromTo(building, { opacity:0 },     { opacity:1, duration:.9, delay:1 });

  // Scroll: zoom images together, fade title
  const heroImages = document.getElementById('hero-images');
  if (!heroImages) return;

  gsap.to(heroImages, {
    scale: 2.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true
    }
  });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
      gsap.set('.hero-title', { opacity: Math.max(0, 1 - self.progress * 4) });
    }
  });
}

/* ═══════════════════════════════════════
   02  INTRO CARDS
═══════════════════════════════════════ */
function initIntro() {
  const cards = document.querySelectorAll('.c-card');
  // Start completely off-screen to the right
  gsap.set(cards, { x: '300vw', opacity: 0, scale: 0.8 });

  ScrollTrigger.create({
    trigger: '#intro',
    start: 'top 60%',
    onEnter: () => {
      // Wave in: elastic overshoot staggered left-to-right creates big wave feel
      gsap.to(cards, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: { each: 0.13, from: 'start' },
        ease: 'elastic.out(1, 0.42)',
        onComplete: () => {
          // Float each card with different phase after landing
          cards.forEach((card, i) => {
            gsap.to(card, {
              y: -16, duration: 1.7 + i * 0.2,
              yoyo: true, repeat: -1,
              ease: 'sine.inOut', delay: i * 0.24
            });
          });
        }
      });
    },
    onLeaveBack: () => {
      gsap.killTweensOf(cards);
      gsap.to(cards, {
        x: '300vw', opacity: 0, scale: 0.8,
        duration: 0.5, stagger: { each: 0.07, from: 'end' }
      });
    }
  });
}

/* ═══════════════════════════════════════
   03-1  DRAG & DROP
═══════════════════════════════════════ */
function initDragDrop() {
  const items    = document.querySelectorAll('.dnd-item');
  const dropBox  = document.getElementById('dnd-box');
  const boxOpen  = document.getElementById('box-open');
  const boxSeal  = document.getElementById('box-sealed');
  const arrow    = document.getElementById('dnd-arrow');
  const arrowWrap= document.getElementById('dnd-arrow-wrap');

  let dropped = new Set();

  // Arrow oscillate
  const arrowTween = gsap.to(arrowWrap, { x: 18, duration: .75, yoyo: true, repeat: -1, ease: 'sine.inOut' });

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.id);
      item.classList.add('dragging');
      arrowTween.pause();
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      if (dropped.size < 3) arrowTween.resume();
    });
  });

  dropBox.addEventListener('dragover', e => { e.preventDefault(); dropBox.classList.add('over'); });
  dropBox.addEventListener('dragleave', ()=> dropBox.classList.remove('over'));

  dropBox.addEventListener('drop', e => {
    e.preventDefault();
    dropBox.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    if (dropped.has(id)) return;
    dropped.add(id);

    const el = document.querySelector(`.dnd-item[data-id="${id}"]`);
    if (el) gsap.to(el, { opacity: 0, scale: .4, duration: .3, onComplete: () => { el.classList.add('dropped'); el.style.opacity = ''; } });

    if (dropped.size >= 3) {
      arrowTween.kill();
      gsap.to(arrowWrap, { opacity: 0, duration: .3 });
      if (boxOpen) boxOpen.style.display = 'none';
      if (boxSeal) { boxSeal.style.display = 'block'; gsap.fromTo(boxSeal, { scale: .8, opacity: 0 }, { scale: 1, opacity: 1, duration: .4 }); }
      dropBox.style.border = 'none';
      launchConfetti(2);
    }
  });
}

function launchConfetti(rounds) {
  const root   = document.getElementById('confetti-root');
  const colors = ['#ff0080','#00ff80','#0080ff','#ff8000','#8000ff','#ffff00','#ff4444'];
  let count = 0;

  function round() {
    if (count >= rounds) return;
    count++;
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      p.className = 'cf-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.width  = (7 + Math.random() * 8) + 'px';
      p.style.height = (7 + Math.random() * 8) + 'px';
      const dur = (1.2 + Math.random() * 1.4).toFixed(2) + 's';
      p.style.animationDuration = dur;
      p.style.animationDelay   = (Math.random() * .4).toFixed(2) + 's';
      root.appendChild(p);
      setTimeout(() => p.remove(), 3500);
    }
    if (count < rounds) setTimeout(round, 2200);
  }
  round();
}

/* ═══════════════════════════════════════
   03-2  GITHUB DEPLOY SCROLL STEPS
═══════════════════════════════════════ */
function initDeploy() {
  const btns = [
    document.getElementById('gh-s1'),
    document.getElementById('gh-s2'),
    document.getElementById('gh-s3'),
    document.getElementById('gh-s4'),
  ];
  const success = document.getElementById('gh-success');
  let cur = -1;

  function activate(n) {
    if (n === cur) return;
    cur = n;
    btns.forEach((b, i) => {
      if (!b) return;
      b.classList.toggle('lit', i <= n);
    });
    if (success) success.textContent = n >= 3 ? '✓ Your site is published at username.github.io/repo' : '';
  }

  ScrollTrigger.create({
    trigger: '#day-1-deploy',
    start: 'top top',
    end: '+=500',
    pin: true,
    scrub: 1,
    onUpdate: self => activate(Math.min(Math.floor(self.progress * 4), 3))
  });
}

/* ═══════════════════════════════════════
   04-1  VIDEO
═══════════════════════════════════════ */
function initVideo() {
  const vid = document.getElementById('main-video');
  const ph  = document.getElementById('video-ph');
  if (!vid) return;

  vid.addEventListener('canplay', () => { if (ph) ph.style.display = 'none'; });
  vid.addEventListener('error',   () => { if (ph) ph.style.display = 'flex'; });

  ScrollTrigger.create({
    trigger: '#day-2',
    start: 'top 60%',
    onEnter:     () => vid.play().catch(() => {}),
    onLeave:     () => vid.pause(),
    onEnterBack: () => vid.play().catch(() => {}),
    onLeaveBack: () => vid.pause()
  });
}

/* ═══════════════════════════════════════
   04-2  CONTEXT MENU
═══════════════════════════════════════ */
const CTX_DATA = [
  { label: '0원',            sub: ['레퍼런스 5000개 보기'] },
  { label: '5000만원/once',  sub: ['디자인과 졸업하기'] },
  { label: '5000만원/annual',sub: ['디자이너 고용하기'] },
  { label: '아 모르겠다',    sub: ['컬러1개', '프리텐다드', '이것 하지마'] },
];

function initContextMenu() {
  const wrap   = document.getElementById('ctx-wrap');
  const sub    = document.getElementById('ctx-sub');
  const items  = document.querySelectorAll('.ctx-item');
  const section= document.getElementById('day-2-design');
  if (!wrap || !section) return;

  section.addEventListener('contextmenu', e => {
    e.preventDefault();
    let x = e.clientX, y = e.clientY;
    wrap.style.left = x + 'px';
    wrap.style.top  = y + 'px';
    wrap.style.display = 'flex';
    sub.style.display = 'none';
    items.forEach(i => i.classList.remove('on'));

    // keep inside viewport
    requestAnimationFrame(() => {
      const r = wrap.getBoundingClientRect();
      if (r.right  > window.innerWidth)  wrap.style.left = (x - r.width)  + 'px';
      if (r.bottom > window.innerHeight) wrap.style.top  = (y - r.height) + 'px';
    });
  });

  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => {
      items.forEach(it => it.classList.remove('on'));
      item.classList.add('on');
      sub.style.display = 'none';
      if (CTX_DATA[i] && CTX_DATA[i].sub.length) {
        sub.innerHTML = CTX_DATA[i].sub.map(s => `<div class="ctx-sub-item">${s}</div>`).join('');
        sub.style.display = 'block';
      }
    });
  });

  document.addEventListener('click',       () => { wrap.style.display='none'; });
  document.addEventListener('contextmenu', e => { if (!section.contains(e.target)) wrap.style.display='none'; });
}

/* ═══════════════════════════════════════
   05-1  TERMINAL CHEAT KEYS
═══════════════════════════════════════ */
const CMDS = [
  { cmd:'/compact',        title:'맥락은 살리고, 무게만 줄이기',   desc:'대화가 누적됐지만 초기화하긴 싫을 때 사용',       danger:false },
  { cmd:'/clear',          title:'완전 새 판 깔기',               desc:'지금까지의 대화를 완전히 초기화할 때 사용',       danger:false },
  { cmd:'/init',           title:'프로젝트 세팅 저장',             desc:'프로젝트 골격이 잡혔을 때 반드시 실행',           danger:false },
  { cmd:'/rewind',         title:'아차 싶을 때 되감기',            desc:'이전 상태로 복구하면서 토큰 소모를 최적화',       danger:false },
  { cmd:'@파일이름',        title:'파일 소환',                     desc:'특정 파일을 Claude에게 첨부하거나 참조시킬 때',   danger:false },
  { cmd:'Shift + Enter',   title:'줄바꿈',                        desc:'메시지를 보내지 않고 다음 줄로 이동',             danger:false },
  { cmd:'```',             title:'코드 블록 열기',                 desc:'코드를 깔끔하게 구분해서 입력',                   danger:false },
  { cmd:'ESC × 2',         title:'입력 초기화',                    desc:'작성 중인 입력을 빠르게 비울 때 사용',            danger:false },
  { cmd:'claude --dangerously-skip-permissions', title:'댄저러스 모드', desc:'권한 확인 없이 빠르게 진행. 진짜 조심.', danger:true },
];

let tCur = 0, tTyping = false;

function initTerminal() {
  showCmd(0);

  document.getElementById('t-next-btn')?.addEventListener('click', () => {
    if (tTyping) return;
    tCur = (tCur + 1) % CMDS.length;
    showCmd(tCur);
  });
  document.getElementById('t-prev-btn')?.addEventListener('click', () => {
    if (tTyping) return;
    tCur = (tCur - 1 + CMDS.length) % CMDS.length;
    showCmd(tCur);
  });
}

function showCmd(idx) {
  const c     = CMDS[idx];
  const card  = document.getElementById('t-card');
  const info  = document.getElementById('t-info');
  const cmdEl = document.getElementById('t-cmd');
  const prev  = document.getElementById('t-prev-lines');
  const badge = document.getElementById('t-badge');
  const title = document.getElementById('t-ititle');
  const desc  = document.getElementById('t-idesc');

  tTyping = true;
  if (info) { info.classList.remove('show', 'danger'); }
  if (card) { card.classList.remove('glow','danger-glow','danger-flash'); }

  // Prev lines (up to 2 recent)
  if (prev) {
    const recent = CMDS.slice(Math.max(0, idx - 2), idx);
    prev.textContent = recent.map(x => `$ ${x.cmd}`).join('\n');
  }

  // Typewriter
  if (!cmdEl) { tTyping = false; return; }
  cmdEl.textContent = '';
  let ci = 0;
  const iv = setInterval(() => {
    if (ci < c.cmd.length) {
      cmdEl.textContent += c.cmd[ci++];
    } else {
      clearInterval(iv);
      tTyping = false;
      // Show info card
      if (badge) badge.textContent = `${String(idx+1).padStart(2,'0')} / 09`;
      if (title) title.textContent = c.title;
      if (desc)  desc.textContent  = c.desc;
      if (info)  { info.classList.add('show'); if (c.danger) info.classList.add('danger'); }
      if (card)  {
        card.classList.add(c.danger ? 'danger-glow' : 'glow');
        if (c.danger) {
          card.classList.add('danger-flash');
          setTimeout(() => card.classList.remove('danger-flash'), 700);
        }
      }
    }
  }, c.cmd.length > 30 ? 40 : 70);
}

/* ═══════════════════════════════════════
   05-2  MD SPLIT
═══════════════════════════════════════ */
function initMdSplit() {
  const btnFew  = document.getElementById('md-few');
  const btnMany = document.getElementById('md-many');
  const blocks  = document.getElementById('md-blocks');
  if (!blocks) return;

  function set(mode) {
    blocks.classList.toggle('row', mode === 'many');
    btnFew?.classList.toggle('active',  mode === 'few');
    btnMany?.classList.toggle('active', mode === 'many');
  }

  btnFew?.addEventListener('click',  () => set('few'));
  btnMany?.addEventListener('click', () => set('many'));

  ScrollTrigger.create({
    trigger: '#day-4-md',
    start: 'top 35%',
    onEnter:     () => set('many'),
    onLeaveBack: () => set('few')
  });
}

/* ═══════════════════════════════════════
   06-1  BACKEND TYPEWRITER
═══════════════════════════════════════ */
const BE_TEXT = `가벼운 기획엔 백엔드 필요가 없고 이미되어있는 기능 연결이 좋음 회원수 100명 이상부터 랏스고 개발언어 파이썬 장고 Ai 개발은 솔직히 언어 상관 없다 백엔드 언어 개많음 프론트엔드는 html css javascript 장고 (풀셋트) / FastAPI Url db 아키텍쳐 설계는 직접하는것 보다 보면서 빠진 페이지 설계 해달라고 하는게 쉬운데 개발베이스는 해라 디비는 진짜 ,,, 설계  잘해야댐 잘못설계하면 다 날려야댐.. 디비 설계 논리는 한달 정도 공부,,, 하는것이 좋음 ..............`;

function initBackend() {
  const typing = document.getElementById('be-typing');
  const errEl  = document.getElementById('be-error');
  if (!typing) return;

  let typingDone = false;

  // Scroll drives typewriter – section pinned for the duration
  ScrollTrigger.create({
    trigger: '#day-5',
    start: 'top top',
    end:   `+=${BE_TEXT.length * 26}`,
    pin:   true,
    scrub: 1,
    onUpdate: self => {
      if (typingDone) return;
      const n = Math.floor(self.progress * BE_TEXT.length);
      typing.textContent = BE_TEXT.slice(0, n);

      if (n >= BE_TEXT.length) {
        typingDone = true;
        if (errEl) errEl.style.display = 'block';
      }
    }
  });
}

function initInsights() {
  const lines   = document.querySelectorAll('#day-5-insights .be-line');
  const doneBtn = document.getElementById('be-done');
  let fired = false;

  ScrollTrigger.create({
    trigger: '#day-5-insights',
    start: 'top 60%',
    onEnter: () => {
      if (fired) return;
      fired = true;
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.classList.add('show');
          if (i === lines.length - 1) {
            setTimeout(() => {
              if (doneBtn) { doneBtn.style.display = 'block'; setTimeout(() => doneBtn.classList.add('show'), 60); }
            }, 500);
          }
        }, i * 700);
      });
    }
  });

  doneBtn?.addEventListener('click', () => {
    document.getElementById('day-5-final')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════
   07-1  FINAL HOVER TICKETS
═══════════════════════════════════════ */
function initFinal() {
  const present = document.getElementById('fw-present');
  const absent  = document.getElementById('fw-absent');
  const show    = document.getElementById('ticket-show');
  const img     = document.getElementById('ticket-img');
  if (!present || !absent || !show) return;

  function showTicket(src) {
    if (img) img.src = src;
    show.classList.add('show');
  }
  function hideTicket() {
    show.classList.remove('show');
  }

  present.addEventListener('mouseenter', () => showTicket('assets/images/image8.svg'));
  present.addEventListener('mouseleave', hideTicket);
  absent.addEventListener('mouseenter',  () => showTicket('assets/images/image9.svg'));
  absent.addEventListener('mouseleave',  hideTicket);
}

/* ═══════════════════════════════════════
   CAPTION FADE-IN ON SCROLL
═══════════════════════════════════════ */
function initCaptions() {
  document.querySelectorAll('.caption').forEach(cap => {
    ScrollTrigger.create({
      trigger: cap.closest('.scene') || cap,
      start: 'top 70%',
      onEnter:     () => gsap.to(cap, { opacity:1, y:0,  duration:.6, ease:'power2.out' }),
      onLeaveBack: () => gsap.to(cap, { opacity:0, y:20, duration:.3 })
    });
  });
}

/* ═══════════════════════════════════════
   BOOT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHero();
  initIntro();
  initDragDrop();
  initDeploy();
  initVideo();
  initContextMenu();
  initTerminal();
  initMdSplit();
  initBackend();
  initInsights();
  initFinal();
  initCaptions();

  // Refresh ScrollTrigger after fonts load
  document.fonts.ready.then(() => ScrollTrigger.refresh());
});
