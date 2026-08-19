"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MENU, SITE } from "@/lib/menu";

/**
 * 상단 헤더
 *
 * [1차] 원본: top_menu_img.gif 1000x84 통이미지 + <map> 이미지맵.
 *       텍스트가 이미지에 박혀 수정 불가, 검색 노출 0, 모바일에서 확대 없이는 못 읽음.
 * [3차] ← 지금. 화면 전체 폭을 쓰는 sticky 헤더로 전환.
 *
 * 요즘 헤더로서 갖춘 것
 *   · 화면 폭 전체 사용 + 내부 컨테이너 max 1280px
 *   · 스크롤을 내리면 그림자와 배경 불투명도가 붙어 본문과 분리됨
 *   · 보유차량에 hover/포커스 드롭다운 (차급 4개를 서브페이지로 노출)
 *     - 마우스뿐 아니라 키보드 Tab 으로도 열리도록 focus-within 사용
 *   · 모바일 햄버거 → 전체 화면 메뉴, 하위 메뉴는 아코디언으로 펼침
 *   · 우측에 전화 CTA 버튼 (이 사이트의 유일한 전환 지점)
 *   · 현재 위치 메뉴에 밑줄 표시
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

  // 스크롤 위치에 따라 헤더 그림자/배경 전환
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 페이지 이동 시 모바일 메뉴 자동 닫기
  // effect 가 아니라 렌더 중 비교로 처리한다 (React 권장 "props 변화에 따른 state 조정" 패턴).
  // effect 로 하면 메뉴가 열린 화면이 한 번 그려진 뒤 닫혀 깜빡임이 생긴다.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setMobileSubOpen(null);
  }

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-navy-100 bg-white/95 shadow-sm backdrop-blur" : "border-b border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center gap-8 px-5 lg:h-[76px] lg:px-8">
        {/* ── 로고 ── */}
        <Link href="/" className="flex shrink-0 flex-col leading-none lg:w-[190px]" title="홈으로">
          <span className="text-[22px] font-black tracking-tight text-navy-800 lg:text-[25px]">{SITE.name}</span>
          <span className="mt-[4px] text-[11px] font-medium tracking-tight text-navy-400">{SITE.slogan}</span>
        </Link>

        {/* ── PC 내비게이션 ── */}
        <nav className="hidden h-full flex-1 items-stretch justify-center lg:flex" aria-label="주 메뉴">
          {MENU.map((section) => {
            const hasChildren = section.children.length > 1;
            return (
              <div key={section.id} className="group relative flex items-stretch focus-within:z-10">
                <Link
                  href={section.href}
                  className={`relative flex items-center whitespace-nowrap px-6 text-[17px] font-medium transition-colors ${
                    isActive(section.href) ? "text-navy-800" : "text-ink-700 hover:text-navy-600"
                  }`}
                >
                  {section.label}
                  {/* 하위 메뉴가 있다는 표시 – 마우스를 올리면 뒤집힌다 */}
                  {hasChildren && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      className="ml-1.5 h-[14px] w-[14px] transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                  {/* 활성 표시 밑줄 */}
                  <span
                    className={`absolute inset-x-5 bottom-0 h-[3px] rounded-t-full bg-navy-700 transition-transform duration-300 ${
                      isActive(section.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                {/* 드롭다운 서브페이지 (보유차량 차급) – hover 와 키보드 포커스 모두에서 열린다 */}
                {hasChildren && (
                  <div
                    className="invisible absolute left-1/2 top-full w-[220px] -translate-x-1/2 translate-y-1 rounded-2xl border border-navy-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    {section.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                          pathname === child.href
                            ? "bg-navy-50 font-bold text-navy-700"
                            : "text-ink-700 hover:bg-navy-50 hover:text-navy-700"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── PC 전화 CTA ──
            로고와 같은 폭(190px)을 주어 가운데 메뉴가 화면 정중앙에 오도록 맞춘다 */}
        <a
          href={telHref}
          className="hidden shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cta-500 px-5 py-3 text-[20px] font-black leading-none tracking-tight text-white transition-colors hover:bg-cta-600 lg:flex lg:w-[190px]"
        >
          <PhoneIcon className="h-[19px] w-[19px]" />
          {SITE.phone}
        </a>

        {/* ── 모바일 햄버거 ── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />}
          </svg>
        </button>
      </div>

      {/* ── 모바일 전체 메뉴 ── */}
      {mobileOpen && (
        <nav
          className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto border-t border-navy-100 bg-white lg:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="px-5 py-2">
            {MENU.map((section) => {
              const hasChildren = section.children.length > 1;
              const open = mobileSubOpen === section.id;
              return (
                <li key={section.id} className="border-b border-navy-50">
                  <div className="flex items-center">
                    <Link
                      href={section.href}
                      className={`flex-1 py-4 text-[18px] ${
                        isActive(section.href) ? "font-bold text-navy-800" : "font-medium text-ink-700"
                      }`}
                    >
                      {section.label}
                    </Link>
                    {/* 하위 메뉴 펼침 버튼 – 상위 메뉴 링크와 별개로 동작 */}
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setMobileSubOpen(open ? null : section.id)}
                        aria-label={`${section.label} 하위 메뉴 ${open ? "접기" : "펼치기"}`}
                        aria-expanded={open}
                        className="flex h-11 w-11 items-center justify-center text-navy-400"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasChildren && open && (
                    <ul className="pb-3 pl-3">
                      {section.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block py-2.5 text-[16px] ${
                              pathname === child.href ? "font-bold text-navy-700" : "text-ink-500"
                            }`}
                          >
                            · {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* 모바일 메뉴 하단 전화 안내 */}
          <div className="px-5 py-6">
            <a
              href={telHref}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-cta-500 text-[18px] font-bold text-white"
            >
              <PhoneIcon className="h-5 w-5" />
              전화 상담 {SITE.phone}
            </a>
            <p className="mt-3 text-center text-[13px] text-ink-500">{SITE.hours}</p>
          </div>
        </nav>
      )}
    </header>
  );
}

/** 수화기 아이콘 – 외부 아이콘 라이브러리 없이 인라인 SVG 로 처리 */
export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
    </svg>
  );
}
