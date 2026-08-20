/**
 * 본문("#content")까지 부드럽게 스크롤하는 공통 동작
 *
 * ⚠️ 여기서 겪은 문제 두 가지 (다시 건드릴 때 주의)
 *
 *  1) requestAnimationFrame 으로 직접 애니메이션을 그리면 모바일에서 뚝뚝 끊긴다.
 *     매 프레임 window.scrollTo 를 부르는 일은 메인 스레드에서 돌기 때문에,
 *     하이드레이션처럼 메인 스레드가 바쁜 순간과 겹치면 프레임이 밀린다.
 *     반면 브라우저 기본 스크롤(behavior:"smooth")은 컴포지터에서 처리돼 훨씬 매끄럽다.
 *     → 기기별 속도가 조금 달라지더라도 기본 기능을 쓰는 편이 낫다.
 *
 *  2) globals.css 에 html { scroll-behavior: smooth } 가 걸려 있어서,
 *     맨 위로 올리려고 window.scrollTo(0, 0) 을 부르면 그것마저 "애니메이션"으로 실행된다.
 *     그 상태에서 곧바로 본문으로 또 스크롤하면 두 동작이 겹쳐 끊기는 것처럼 보인다.
 *     → 맨 위로 올릴 때는 behavior:"instant" 로 CSS 설정을 눌러 준다.
 */
export const TARGET_HASH = "#content";

/** 본문 위에 남길 여백(px) */
const OFFSET = 16;

/** 목표 위치 계산 */
function targetTop(el: Element) {
  return el.getBoundingClientRect().top + window.scrollY - OFFSET;
}

/** 애니메이션 없이 즉시 맨 위로 (CSS 의 scroll-behavior:smooth 를 무시한다) */
export function jumpToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * 본문까지 부드럽게 스크롤한다.
 * 동작 최소화를 선호하는 사용자에게는 애니메이션 없이 바로 이동한다.
 */
export function scrollToContent() {
  const el = document.querySelector(TARGET_HASH);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: targetTop(el), behavior: reduced ? "instant" : "smooth" });
}
