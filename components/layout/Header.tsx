"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MENU, SITE } from "@/lib/menu";

/**
 * 상단 헤더
 *
 * 원본(대부업 사이트)은 top_menu_img.gif 1000x84 통이미지 + 이미지맵이었다.
 * 남색 메뉴바 · 남색 로고 · 빨간 전화번호.
 * 메뉴바는 원본의 하늘색(#96d2fc)에서 로고와 같은 네이비(#1c3f7a)로 바꿨다.
 * 구조만 정리했다.
 *
 * 변경
 *   · 폭: 1000px 고정 → 반응형
 *   · 원본 2행 구조(파란 바 + 항상 펼쳐진 서브메뉴)에서 2행을 없앴다.
 *     하위 메뉴가 늘 펼쳐져 있으면 메뉴가 산만해 보이기 때문에,
 *     하위가 있는 "보유차량"에만 아래 화살표를 달아 드롭다운으로 보여준다.
 *   · 파란 메뉴바는 로고와 전화번호 사이 공간을 채우도록 늘렸다.
 *
 * 반응형
 *   · md 이상: 로고 / 파란 메뉴바 / 전화번호
 *   · md 미만: 로고 + 전화 버튼 + 햄버거, 메뉴는 펼침 목록
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 경로가 바뀌면 모바일 메뉴를 닫는다 (렌더 중 비교 – effect 로 하면 한 번 깜빡인다)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <header className="w-full border-b border-[#e8e8e8] bg-white">
      <div className="mx-auto flex w-full max-w-[1000px] items-center gap-4 px-4 py-3 md:gap-6 md:py-4">
        {/* ── 로고 ── */}
        <Link href="/" className="flex shrink-0 flex-col justify-center" title="홈으로">
          <span className="text-[21px] font-extrabold leading-none tracking-tight text-[#1c3f7a] md:text-[25px]">
            {SITE.name}
          </span>
          <span className="mt-1 text-[11px] font-bold leading-none text-[#e0322e] md:text-[12px]">
            {SITE.slogan}
          </span>
        </Link>

        {/* ── PC 메뉴바 – 남는 공간을 채우도록 늘린다 ── */}
        <nav className="hidden min-w-0 flex-1 md:block" aria-label="주 메뉴">
          <ul className="flex h-[34px] items-stretch justify-around rounded-[4px] bg-[#1c3f7a] px-2">
            {MENU.map((section) => {
              const hasChildren = section.children.length > 1;
              return (
                <li key={section.id} className="group relative flex items-stretch">
                  <Link
                    href={section.href}
                    className={`flex items-center gap-1 whitespace-nowrap px-3 text-[14px] font-bold text-white hover:text-[#fff7c8] lg:px-4 ${
                      isActive(section.href) ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {section.label}
                    {/* 하위 메뉴가 있다는 표시 – 보유차량에만 붙는다 */}
                    {hasChildren && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        className="h-[13px] w-[13px] transition-transform duration-200 group-hover:rotate-180"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </Link>

                  {/* 드롭다운 – 마우스 hover 와 키보드 포커스 모두에서 열린다 */}
                  {hasChildren && (
                    <div className="invisible absolute left-1/2 top-full z-30 w-[170px] -translate-x-1/2 translate-y-1 rounded-[4px] border border-[#cfe3f5] bg-white py-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {section.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-[13px] hover:bg-[#f2f8fd] hover:text-[#0593B7] ${
                            pathname === child.href ? "font-bold text-[#0593B7]" : "text-[#444]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── PC 전화 안내 ── */}
        <div className="hidden shrink-0 flex-col items-center md:flex">
          <span className="text-[11px] font-bold text-[#e0322e]">전화 상담 안내</span>
          <a href={telHref} className="text-[21px] font-extrabold leading-tight tracking-tight text-[#1c3f7a]">
            {SITE.phone}
          </a>
        </div>

        {/* ── 모바일: 전화 버튼 + 햄버거 ── */}
        <a
          href={telHref}
          className="ml-auto flex h-10 items-center gap-1.5 rounded-full bg-[#e0322e] px-4 text-white md:hidden"
          aria-label={`전화 상담 ${SITE.phone}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
          </svg>
          <span className="text-[15px] font-bold">{SITE.phone}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#1c3f7a] hover:bg-[#f2f6fb] md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* ── 모바일 메뉴 ── */}
      {open && (
        <nav className="border-t border-[#e8e8e8] bg-white md:hidden" aria-label="모바일 메뉴">
          <ul className="mx-auto w-full max-w-[1000px] px-4 py-1">
            {MENU.map((section) => (
              <li key={section.id} className="border-b border-[#f0f0f0] last:border-b-0">
                <Link
                  href={section.href}
                  className={`block py-3.5 text-[16px] ${
                    isActive(section.href) ? "font-bold text-[#0593B7]" : "font-medium text-[#333]"
                  }`}
                >
                  {section.label}
                </Link>
                {/* 하위 메뉴 (보유차량 차급) – 좁은 화면에서는 칩으로 나열 */}
                {section.children.length > 1 && (
                  <ul className="-mt-1 flex flex-wrap gap-2 pb-3">
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`inline-block rounded-full border px-3 py-1 text-[13px] ${
                            pathname === child.href
                              ? "border-[#0593B7] bg-[#eaf4fd] font-bold text-[#0593B7]"
                              : "border-[#ddd] text-[#666]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
