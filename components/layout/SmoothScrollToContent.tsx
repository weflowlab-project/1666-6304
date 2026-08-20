"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { TARGET_HASH, jumpToTop, scrollToContent } from "@/components/layout/scrollToContent";

/**
 * 다른 페이지에서 "#content" 로 들어왔을 때, 맨 위에서 본문까지 부드럽게 내려가게 한다.
 *
 * 링크에 scroll={false} 를 줘 Next 의 자동 점프를 막아 두었기 때문에 실제 이동은 여기서 처리한다.
 *
 * 순서
 *   ① 즉시 맨 위로 (이전 페이지의 스크롤 위치가 남아 있을 수 있다)
 *   ② 화면이 한 번 그려진 뒤 본문까지 부드럽게
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

      jumpToTop();

      // 맨 위로 옮긴 결과가 화면에 반영된 뒤 시작해야 두 스크롤이 겹치지 않는다
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => scrollToContent());
      });
    };

    run();

    // 같은 페이지에서 해시만 바뀌는 경우
    window.addEventListener("hashchange", run);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("hashchange", run);
    };
  }, [pathname]);

  return null;
}
