/**
 * 본문("#content")까지 부드럽게 스크롤하는 공통 동작
 *
 * 브라우저 기본 기능(scrollIntoView({behavior:"smooth"}))을 쓰지 않는 이유
 *   이동 시간과 가감속을 브라우저가 정하는데 표준값이 없어 엔진마다 다르다.
 *     · iOS(WebKit)   : 짧고 빠르게 끝난다 → "너무 빨리 내려간다"
 *     · 안드로이드(Blink): 거리에 비례해 길어지고, 메인 스레드가 바쁘면 끊겨 보인다
 *   그래서 기기와 무관하게 같은 느낌이 되도록 시간과 가감속을 직접 정한다.
 *
 * 두 곳에서 함께 쓴다.
 *   · SmoothScrollToContent – 다른 페이지에서 "#content" 로 들어왔을 때
 *   · TopBanners           – 이미 그 페이지에 있을 때 "이용안내 보기" 를 누른 경우
 *   한 번에 하나의 애니메이션만 돌면 되므로 상태를 모듈 수준에 둔다.
 */
export const TARGET_HASH = "#content";

/** 이동에 걸리는 시간(ms) – 기기와 무관하게 동일하다 */
const DURATION = 620;
/** 본문 위에 남길 여백(px) */
const OFFSET = 16;

let raf = 0;
let animating = false;

/** 처음엔 천천히, 중간에 빠르게, 끝에 다시 천천히 (easeInOutCubic) */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** 진행 중인 스크롤을 멈춘다 (사용자가 직접 조작하면 즉시 중단) */
export function stopScroll() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  animating = false;
}

/** 현재 위치에서 목표 위치까지 정해진 시간 동안 이동 */
function animateTo(targetY: number) {
  stopScroll();
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  animating = true;
  const startedAt = performance.now();

  const step = (now: number) => {
    if (!animating) return;
    const progress = Math.min(1, (now - startedAt) / DURATION);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) raf = requestAnimationFrame(step);
    else stopScroll();
  };
  raf = requestAnimationFrame(step);
}

/**
 * 본문까지 스크롤한다.
 * @param fromTop true 면 먼저 맨 위로 올린 뒤 내려간다.
 *   다른 페이지에서 막 들어온 경우에 쓴다(이전 페이지의 스크롤 위치가 남아 있을 수 있어서).
 *   이미 같은 페이지를 보고 있을 때는 false 로 두어, 지금 보고 있는 위치에서 자연스럽게 이어간다.
 */
export function scrollToContent({ fromTop = false }: { fromTop?: boolean } = {}) {
  const el = document.querySelector(TARGET_HASH);
  if (!el) return;

  if (fromTop) window.scrollTo(0, 0);

  const targetY = () => el.getBoundingClientRect().top + window.scrollY - OFFSET;

  // 동작 최소화를 선호하는 사용자에게는 애니메이션 없이 바로 이동
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY());
    return;
  }

  animateTo(targetY());
}
