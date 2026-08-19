"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CallBox from "@/components/layout/CallBox";
import type { MenuSection } from "@/lib/menu";

/**
 * 서브 페이지 좌측 사이드바
 *
 * 원본은 190px 컬럼에 [섹션 타이틀 이미지] + [메뉴 이미지들] + [SMS 상담폼] 이 세로로 놓였다.
 *
 * 변경
 *   · 타이틀·메뉴 이미지 자리 표시 제거 → 실제 텍스트
 *   · SMS 폼 → 전화 상담 박스
 *   · 190px 고정 → 반응형
 *
 * 반응형 처리
 *   · lg 이상: 원본처럼 세로 사이드바
 *   · lg 미만: 섹션 타이틀 + 하위 메뉴를 가로 칩 목록으로 보여준다.
 *     좁은 화면에서 세로 메뉴를 본문 위에 두면 본문이 한참 아래로 밀리기 때문이다.
 *     전화 상담 박스는 본문 아래(SubPageLayout)에서 따로 보여준다.
 */
export default function Sidebar({ section }: { section: MenuSection }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-full lg:w-[190px] lg:shrink-0">
      {/* 섹션 타이틀 – 원본 title_0X.gif 자리 */}
      <p className="rounded-t-[4px] border border-[#d6d6d6] bg-[#f7f9fb] py-3 text-center text-[16px] font-bold tracking-wider text-[#1c5aa8] lg:py-4 lg:text-[17px]">
        {section.sidebarTitle}
      </p>

      {/* 하위 메뉴 – lg 이상 세로 목록 */}
      <nav
        className="hidden rounded-b-[4px] border-x border-b border-[#d6d6d6] bg-white lg:block"
        aria-label={`${section.label} 하위 메뉴`}
      >
        <ul className="m-0 list-none p-0">
          {section.children.map((child) => (
            <li key={child.href} className="border-b border-dotted border-[#cfcfcf] last:border-b-0">
              <Link
                href={child.href}
                className={`flex items-center px-3 py-2 text-[13px] hover:text-[#0593B7] ${
                  isActive(child.href) ? "font-bold text-[#0593B7]" : "text-[#333]"
                }`}
              >
                <span className="mr-1.5 text-[#1c5aa8]" aria-hidden>
                  ›
                </span>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하위 메뉴 – lg 미만 가로 칩 (하위가 2개 이상일 때만 의미가 있다) */}
      {section.children.length > 1 && (
        <nav
          className="flex flex-wrap gap-2 rounded-b-[4px] border-x border-b border-[#d6d6d6] bg-white p-3 lg:hidden"
          aria-label={`${section.label} 하위 메뉴`}
        >
          {section.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`inline-block rounded-full border px-3 py-1 text-[13px] ${
                isActive(child.href)
                  ? "border-[#0593B7] bg-[#eaf4fd] font-bold text-[#0593B7]"
                  : "border-[#ddd] text-[#666]"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </nav>
      )}

      {/* 전화 상담 박스 – lg 이상에서만 사이드에 붙는다 */}
      <div className="mt-3 hidden lg:block">
        <CallBox />
      </div>
    </aside>
  );
}
