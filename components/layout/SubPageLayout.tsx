import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import CallBox from "@/components/layout/CallBox";
import TopBanners from "@/components/layout/TopBanners";
import SmoothScrollToContent from "@/components/layout/SmoothScrollToContent";
import { getSection, type MenuSection } from "@/lib/menu";

/**
 * 서브 페이지 공통 레이아웃 (홈 제외 모든 페이지)
 *
 * 원본 구조 (1000px 고정폭)
 *   1. 서브 비주얼 1000x196
 *   2. 본문 2컬럼 – 좌 190px 사이드바 / 우 779px (상단 안내 배너 + 파란 테두리 콘텐츠 박스)
 *
 * 변경
 *   · 이미지 자리 표시 제거 (서브 비주얼은 배경에 안내 문구만 크게)
 *   · 1000px 고정 → 반응형
 *
 * 반응형 처리
 *   · lg 이상: 원본과 같은 좌 사이드바 + 우 본문 2컬럼
 *   · lg 미만: 사이드바(타이틀 + 가로 칩 메뉴)가 위로, 본문이 아래로 쌓이고
 *     전화 상담 박스는 본문 맨 아래에 한 번만 보여준다.
 */
export default function SubPageLayout({
  sectionId,
  title,
  children,
}: {
  sectionId: MenuSection["id"];
  /** 콘텐츠 박스 제목 */
  title: string;
  children: ReactNode;
}) {
  const section = getSection(sectionId);

  return (
    <div className="w-full">
      {/* "#content" 로 들어오면 맨 위에서 본문까지 부드럽게 내려간다 */}
      <SmoothScrollToContent />

      {/* ── 서브 비주얼 (원본 sub_flash_01.jpg 1000x196 자리) ── */}
      <section className="relative isolate flex min-h-[140px] w-full items-center justify-center overflow-hidden bg-[#eef3f8] px-4 py-10 text-center sm:min-h-[170px]">
        {/* 배경 – 이미지가 들어갈 자리 안내 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-[34px] font-black tracking-tight text-[#1c3f7a]/[0.08] sm:text-[52px] md:text-[72px]"
        >
          이미지 삽입 예정
        </span>
        <div className="relative">
          <p className="text-[19px] font-bold leading-[1.4] text-[#e0322e] sm:text-[23px]">
            필요한 기간만큼, 합리적인 렌터카!
          </p>
          <p className="mt-1 text-[16px] font-bold text-[#1c5aa8] sm:text-[20px]">
            차종·기간 상담은 전화 한 통이면 끝!
          </p>
        </div>
      </section>

      {/* ── 본문 ── */}
      <div className="mx-auto w-full max-w-[1000px] px-4 py-6 md:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <Sidebar section={section} />

          <div className="min-w-0 flex-1">
            <TopBanners />

            {/* 파란 테두리 콘텐츠 박스 – 원본의 2px #3281C3 테두리 유지 */}
            {/* id="content": 다른 페이지에서 "…#content" 로 들어오면
                상단 비주얼·배너를 건너뛰고 본문부터 보이도록 하는 앵커.
                scroll-mt 로 위쪽에 약간의 여백을 남긴다. */}
            <section
              id="content"
              className="mt-4 w-full scroll-mt-4 rounded-[4px] border-2 border-[#3281C3] bg-white px-4 py-4 md:px-5 md:py-5"
            >
              {/* 제목 + 부제 */}
              <div className="border-b border-[#eee] pb-3">
                <h1 className="flex items-center gap-1.5 text-[18px] font-bold text-black md:text-[20px]">
                  <span className="text-[#1c5aa8]" aria-hidden>
                    ›
                  </span>
                  {title}
                </h1>
                <p className="mt-1 text-[12px] text-[#777]">
                  차종과 이용 기간만 말씀해 주시면 바로 안내해 드립니다.
                </p>
              </div>

              {/* 본문 */}
              <div className="pt-4">{children}</div>
            </section>

            {/* 전화 상담 박스 – lg 미만에서는 본문 아래에 한 번만 */}
            <div className="mt-5 flex justify-center lg:hidden">
              <CallBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
