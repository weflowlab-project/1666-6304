"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU, SITE } from "@/lib/menu";

/**
 * 상단 헤더 (원본: top_menu_img.gif 1000x84 통이미지 + <map name="Map_menu"> 이미지맵)
 *
 * 원본 레이아웃 (1000px 고정폭, 좌우는 top_bg.gif 로 흰색 채움)
 *  ┌────────────────────────────────────────────────────────────────────────┐
 *  │ [로고 비트대부]   ┌──────────────── 파란 메뉴바 (#96d2fc) ────────────┐   고객센터안내 │
 *  │ 자동차 전문 대출 기업 │ 회사소개 자동차대출 부동산담보대출 빠른상담신청 고객센터 │   1666-6304   │
 *  │                  └──────────────────────────────────────────────────┘             │
 *  │           개인차 법인차 수입차 설정/할부/타사대납차 리스차    부동산담보대출 전월세 보증대출 │
 *  └────────────────────────────────────────────────────────────────────────┘
 *
 * 인터랙션
 *  - 로고 클릭 → 홈("/")  (원본 coords 3,10,219,64)
 *  - 1행 메뉴 클릭 → 각 섹션 첫 페이지
 *  - 2행 서브메뉴 클릭 → 해당 상세 페이지 (원본은 이미지라 hover 효과가 없었으나,
 *    style.css 의 A:hover 색(#0593B7)을 참고해 텍스트 hover 색상만 추가)
 *  - 현재 섹션/페이지는 굵게·색상 강조 (원본에는 없던 활성 표시, 사용성 보강)
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white">
      {/* 1000px 중앙 정렬 컨테이너 – 원본 <table width="1000"> */}
      <div className="mx-auto flex h-[84px] w-[1000px] items-start">
        {/* ── 로고 영역 (원본 이미지맵 coords 3,10,219,64) ── */}
        <Link
          href="/"
          className="mt-[10px] flex h-[54px] w-[216px] flex-col items-center justify-center no-underline hover:no-underline"
          title="홈으로"
        >
          {/* 로고 텍스트 – 원본은 남색 굵은 로고 타입 + 빨간 슬로건 */}
          <span className="text-[26px] font-extrabold leading-none tracking-tight text-[#1c3f7a]">
            {SITE.name}
          </span>
          <span className="mt-1 text-[12px] font-bold leading-none text-[#e0322e]">{SITE.slogan}</span>
        </Link>

        {/* ── 메뉴 영역 ── */}
        <nav className="ml-[8px] flex flex-col" aria-label="주 메뉴">
          {/* 1행: 파란 메뉴바 (원본 y=12~38 영역, 배경 #96d2fc, 흰 글씨 굵게) */}
          <ul className="mt-[12px] flex h-[27px] items-center rounded-[3px] bg-[#96d2fc] px-[16px]">
            {MENU.map((section) => {
              const active = pathname === section.href || pathname.startsWith(`/${section.id}`);
              return (
                <li key={section.id} className="px-[14px]">
                  <Link
                    href={section.href}
                    className={`whitespace-nowrap text-[13px] font-bold text-white no-underline hover:text-[#fff7c8] ${
                      active ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {section.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* 2행: 서브메뉴 텍스트 (원본 y=47~71 영역, 검정 작은 글씨) */}
          <ul className="mt-[9px] flex h-[22px] items-center pl-[2px]">
            {MENU.filter((s) => s.showChildrenInHeader).map((section, idx) => (
              <li key={section.id} className={`flex items-center ${idx > 0 ? "ml-[40px]" : ""}`}>
                {section.children.map((child) => {
                  const active = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`mr-[10px] whitespace-nowrap text-[12px] no-underline hover:text-[#0593B7] ${
                        active ? "font-bold text-[#0593B7]" : "text-black"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 우측 고객센터 안내 (원본 이미지 우측: "고객센터안내" 빨간 글씨 + 큰 번호) ── */}
        <div className="ml-auto mt-[12px] flex flex-col items-center pr-[10px]">
          <span className="text-[12px] font-bold text-[#e0322e]">고객센터안내</span>
          <a
            href={`tel:${SITE.phone}`}
            className="text-[24px] font-extrabold leading-tight tracking-tight text-[#1c3f7a] no-underline"
          >
            {SITE.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
