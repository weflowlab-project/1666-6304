"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TARGET_HASH, scrollToContent, stopScroll } from "@/components/layout/scrollToContent";

/**
 * 다른 페이지에서 "#content" 로 들어왔을 때, 맨 위에서 본문까지 부드럽게 내려가게 한다.
 *
 * 링크에 scroll={false} 를 줘 Next 의 자동 점프를 막아 두었기 때문에,
 * 실제 이동은 여기서 처리한다. (이동 시간·가감속은 scrollToContent 에 정의)
 *
 * 순서: 맨 위로 즉시 이동 → 한 프레임 그려진 뒤 → 본문까지 부드럽게.
 * "기다렸다가 툭 튄 다음 움직이는" 느낌이 나지 않도록 대기 시간을 두지 않는다.
 *
 * 서브 페이지끼리 이동할 때는 이 컴포넌트가 다시 마운트되지 않으므로
 * 경로가 바뀔 때마다 다시 실행되도록 pathname 을 의존성으로 둔다.
 *
 * ※ 이미 같은 페이지에 있을 때 배너를 누른 경우는 TopBanners 가 직접 처리한다.
 */
export default function SmoothScrollToContent() {
  const pathname = usePathname();

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;

    const run = () => {
      if (window.location.hash !== TARGET_HASH) return;

      // ① 맨 위로는 "즉시" 올린다.
      //    예전에는 180ms 기다린 뒤 올렸는데, 그 사이 이전 페이지의 스크롤 위치가
      //    잠깐 보였다가 툭 튀는 탓에 멈칫하는 것처럼 느껴졌다.
      window.scrollTo(0, 0);

      // ② 화면이 실제로 한 번 그려진 뒤 애니메이션을 시작한다.
      //    고정 시간(setTimeout)이 아니라 프레임 기준이라 기기 성능에 맞춰 자연스럽게 이어진다.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => scrollToContent());
      });
    };

    run();

    // 같은 페이지에서 해시만 바뀌는 경우
    window.addEventListener("hashchange", run);
    // 사용자가 직접 조작하면 애니메이션을 즉시 멈춘다 (조작이 항상 우선)
    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchstart", stopScroll, { passive: true });
    window.addEventListener("keydown", stopScroll);

    return () => {
      stopScroll();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("hashchange", run);
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchstart", stopScroll);
      window.removeEventListener("keydown", stopScroll);
    };
  }, [pathname]);

  return null;
}
