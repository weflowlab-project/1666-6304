import type { ReactNode } from "react";
import Placeholder from "@/components/Placeholder";
import Sidebar from "@/components/layout/Sidebar";
import TopBanners from "@/components/layout/TopBanners";
import { getSection, type MenuSection } from "@/lib/menu";

/**
 * 서브 페이지 공통 레이아웃 (홈 제외 모든 페이지)
 *
 * 원본 구조 (세로 순서, 1000px 고정폭, 좌우 여백은 배경 이미지로 채움)
 *   1. 헤더(84px)                       ← app/layout.tsx 의 <Header/>
 *   2. 서브 비주얼 sub_flash_01.jpg 1000x196  (원본: "빠르고 간편한 자동차 대출! / 즉시대출 신용조회 무!!")
 *   3. 49px 여백 스트립(bm_bg.gif)
 *   4. 본문 2컬럼
 *        좌: 221px 컬럼 안에 190px 사이드바(섹션 타이틀 + 좌측 메뉴 + 전화상담 박스)
 *        우: 779px 컬럼 – 상단 3단 배너 → 7px → 파란 테두리(2px #3281C3) 콘텐츠 박스(770px)
 *              박스 내부: [› 아이콘 26x15][페이지 제목(굵은 검정 16px)]
 *                          [center_copy.gif 293x15 – 원본 "차만 있으시면 무조건 대출이 가능합니다!"]
 *                          [730px 본문 = children]
 *   5. 푸터                            ← app/layout.tsx 의 <Footer/>
 *
 * ⚠️ 업종 전환 변경 (레이아웃은 원본 그대로, 내용만 교체)
 *    · 서브 비주얼 문구: 대출 → 렌터카
 *    · 사이드바 SMS 폼 → 전화 상담 박스
 *    · 우측 여백의 채팅상담 아이콘 제거 (상담 경로를 전화 하나로 통일)
 *    · 콘텐츠 박스 부제: "차만 있으시면 무조건 대출이…" → 렌터카 문구
 */
export default function SubPageLayout({
  sectionId,
  title,
  children,
}: {
  /** 사이드바에 표시할 섹션 */
  sectionId: MenuSection["id"];
  /** 콘텐츠 박스 제목 (예: "개인차", "회사소개", "공지사항") */
  title: string;
  children: ReactNode;
}) {
  const section = getSection(sectionId);

  return (
    <div className="relative mx-auto w-[1000px]">
      {/* 2. 서브 비주얼 배너 (1000x196) – 좌우 여백은 sub_flash_left/right_bg.gif(연회색 그라데이션) */}
      <Placeholder width={1000} height={196} note="sub_flash_01.jpg" tone="light" align="left">
        <div className="pl-[360px]">
          <div className="text-[24px] font-bold text-[#e0322e]">필요한 기간만큼, 합리적인 렌터카!</div>
          <div className="text-[22px] font-bold text-[#1c5aa8]">차종·기간 상담은 전화 한 통이면 끝!</div>
          <div className="mt-1 text-[11px] text-[#999]">(차량 이미지 배경 – TODO: 실제 사진으로 교체)</div>
        </div>
      </Placeholder>

      {/* 3. 49px 여백 스트립 */}
      <div className="h-[49px]" />


      {/* 4. 본문 2컬럼 */}
      <div className="flex items-start">
        <Sidebar section={section} />

        <div className="w-[779px]">
          <TopBanners />
          <div className="h-[7px]" />

          {/* 파란 테두리 콘텐츠 박스 (원본 table cellspacing=2 bgcolor=#3281C3 → 2px 파란 테두리) */}
          <section className="w-[770px] border-2 border-[#3281C3] bg-white">
            <div className="mx-auto w-[760px] pt-[7px]">
              {/* 제목 행: › 아이콘 + 굵은 제목 */}
              <div className="flex w-[575px] items-center">
                <Placeholder width={26} height={15} note="center_title_icon.gif" tone="blue">
                  <span className="text-[11px] font-bold leading-none text-[#1c5aa8]">›</span>
                </Placeholder>
                <h2 className="m-0 ml-0 text-[16px] font-bold text-black">{title}</h2>
              </div>
              {/* 공통 카피 이미지 center_copy.gif (293x15) */}
              <Placeholder width={293} height={15} note="center_copy.gif" tone="none" align="left">
                <span className="text-[11px] text-[#777]">차종과 이용 기간만 말씀해 주시면 바로 안내해 드립니다.</span>
              </Placeholder>
            </div>

            {/* 여백 행 */}
            <div className="h-[15px]" />

            {/* 730px 본문 */}
            <div className="mx-auto w-[730px] pb-[15px]">{children}</div>
          </section>
        </div>
      </div>

      {/* 하단 여백 (원본 &nbsp; 행) */}
      <div className="h-[18px]" />
    </div>
  );
}
