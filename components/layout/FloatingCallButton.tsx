"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SITE } from "@/lib/menu";

/**
 * 전화 연결 플로팅 버튼 (화면 우측 하단 고정)
 *
 * 생김새
 *   · 원형, 빨간 테두리, 내부는 흰색, 수화기 아이콘은 초록색으로 채움
 *
 * 동작
 *   · PC(lg 이상): 항상 보인다
 *   · 모바일: 스크롤하는 동안에만 보인다.
 *       스크롤이 멈추고 1.2초가 지나면 오른쪽으로 스르륵 빠져나가고,
 *       다시 스크롤하면 스르륵 들어온다. (transform + transition)
 *   · 눈에 띄도록 4초에 한 번씩 좌우로 흔들린다.
 *       화면 밖으로 빠져 있을 때는 흔들지 않는다.
 *
 * 구현 메모
 *   · 슬라이드(translateX)와 흔들림(rotate)이 둘 다 transform 이라 한 요소에 겹치면 서로 덮어쓴다.
 *     그래서 바깥 요소는 슬라이드만, 안쪽 요소는 흔들림만 담당하도록 두 겹으로 나눴다.
 *   · 동작 최소화를 선호하는 사용자(prefers-reduced-motion)에게는 흔들림을 적용하지 않는다.
 *     (globals.css 의 애니메이션 정의에서 처리)
 */

/** 화면이 lg(1024px) 이상인지 – matchMedia 를 구독한다 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia("(min-width: 1024px)");
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    // 서버 렌더링 시점의 기본값 (모바일 기준)
    () => false,
  );
}

/** 스크롤이 멈춘 뒤 버튼을 숨기기까지의 시간 */
const IDLE_MS = 1200;

export default function FloatingCallButton() {
  const isDesktop = useIsDesktop();
  const [scrolling, setScrolling] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolling(false), IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // PC 에서는 스크롤과 무관하게 항상 보인다
  const shown = isDesktop || scrolling;

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 transition-transform duration-500 ease-out lg:bottom-8 lg:right-8 ${
        shown ? "translate-x-0" : "translate-x-[calc(100%+1.5rem)]"
      }`}
    >
      {/* 안쪽 요소가 흔들림을 담당한다 (바깥은 슬라이드 담당) */}
      <a
        href={`tel:${SITE.phone.replace(/-/g, "")}`}
        aria-label={`전화 상담 ${SITE.phone}`}
        title={`전화 상담 ${SITE.phone}`}
        className={`flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-cta-500 bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] transition-colors hover:bg-cta-50 lg:h-[70px] lg:w-[70px] ${
          shown ? "call-wiggle" : ""
        }`}
      >
        {/* 수화기 아이콘 – 초록색으로 채움 */}
        <svg viewBox="0 0 24 24" fill="#16a34a" className="h-7 w-7 lg:h-8 lg:w-8" aria-hidden>
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
        </svg>
      </a>
    </div>
  );
}
