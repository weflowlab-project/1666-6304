"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Placeholder from "@/components/Placeholder";
import CallBox from "@/components/layout/CallBox";
import type { MenuSection } from "@/lib/menu";

/**
 * 서브 페이지 좌측 사이드바 (원본: width 190px 컬럼) – 원본 틀 유지
 *
 * 원본 구조
 *   [title_0X.gif 190x58]  ← 섹션명 이미지 ("자/동/차/대/출" 처럼 슬래시 구분, 파란 글씨, 회색 테두리 박스)
 *   [left_menu_bg.gif 배경]
 *     [0X_left_menu_01.gif 190x23] ← "› 개인차" 같은 메뉴 이미지, 각각 <a> 링크
 *   [left_menu_down.gif 190x8]     ← 박스 하단 마감 이미지
 *   (7px 여백)
 *   [SMS 빠른상담신청 폼 190x256]
 *
 * ⚠️ 변경: 맨 아래 SMS 상담 폼을 제거하고 전화 안내 박스로 교체했다.
 *    요금 비공개 · 예약폼 없음 정책이라 전화가 유일한 상담 경로이기 때문이다.
 *    (원본은 SMS폼 · 상단 빠른신청 배너 · 채팅 아이콘 · 대출신청 버튼까지
 *     상담 진입점이 4개로 흩어져 있어 어디를 눌러야 할지 알기 어려웠다)
 */
export default function Sidebar({ section }: { section: MenuSection }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-[221px] shrink-0 flex-col items-center pt-[0px]">
      {/* 섹션 타이틀 이미지 title_0X.gif (190x58) */}
      <Placeholder width={190} height={58} note={`title_${section.id}.gif`} tone="light">
        <span className="text-[17px] font-bold tracking-wider text-[#1c5aa8]">{section.sidebarTitle}</span>
      </Placeholder>

      {/* 좌측 메뉴 목록 – 원본 0X_left_menu_NN.gif (190x23 each) + left_menu_down.gif */}
      <nav className="w-[190px] border-x border-[#d6d6d6] bg-white" aria-label={`${section.label} 하위 메뉴`}>
        <ul className="m-0 list-none p-0">
          {section.children.map((child) => {
            const active = pathname === child.href || pathname.startsWith(child.href + "/");
            return (
              <li key={child.href} className="border-b border-dotted border-[#cfcfcf] last:border-b-0">
                <Link
                  href={child.href}
                  className={`flex h-[23px] items-center pl-[14px] text-[12px] no-underline hover:text-[#0593B7] ${
                    active ? "font-bold text-[#0593B7]" : "text-[#333]"
                  }`}
                >
                  {/* 원본 이미지의 "›" 불릿 */}
                  <span className="mr-[6px] text-[#1c5aa8]">›</span>
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* left_menu_down.gif (190x8) – 박스 하단 마감 */}
      <div className="h-[8px] w-[190px] rounded-b-[4px] border-x border-b border-[#d6d6d6] bg-white" />

      {/* 7px 여백 후 전화 상담 박스 (원본 SMS 폼 자리) */}
      <div className="h-[7px]" />
      <CallBox />
    </aside>
  );
}
