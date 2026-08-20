"use client";

import { useEffect } from "react";

/**
 * "#content" 로 들어왔을 때 맨 위에서 본문까지 부드럽게 스크롤해 주는 컴포넌트
 *
 * 왜 필요한가
 *   <Link href="/guide#content"> 만 쓰면 브라우저·Next 가 이동 직후 곧바로 본문 위치로
 *   "점프"해 버려서, 사용자는 상단(비주얼·배너)을 보지 못한 채 갑자기 중간에 떨어진다.
 *   그래서 링크에는 scroll={false} 를 줘 자동 스크롤을 막고,
 *   여기서 [맨 위로 이동 → 잠시 후 부드럽게 본문으로] 순서로 직접 처리한다.
 *
 * 대상은 "#content" 하나로 한정한다.
 * 이용안내 페이지 안의 목차(#qualification 등)는 같은 페이지 내 이동이라
 * CSS scroll-behavior 로 이미 부드럽게 동작하므로 건드리지 않는다.
 */
const TARGET_HASH = "#content";

export default function SmoothScrollToContent() {
  useEffect(() => {
    const run = () => {
      if (window.location.hash !== TARGET_HASH) return;
      const el = document.querySelector(TARGET_HASH);
      if (!el) return;

      // 링크에 scroll={false} 를 줬기 때문에 이전 페이지의 스크롤 위치가 남아 있을 수 있다.
      // 먼저 즉시 맨 위로 올린 뒤, 한 프레임 쉬고 본문까지 부드럽게 내려간다.
      window.scrollTo({ top: 0, behavior: "instant" });

      const timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
      return timer;
    };

    let timer = run();

    // 이미 같은 페이지에 있을 때 다시 눌린 경우(해시만 바뀜)도 처리한다
    const onHashChange = () => {
      if (timer) clearTimeout(timer);
      timer = run();
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
