"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneIcon } from "@/components/layout/Header";
import { SITE } from "@/lib/menu";

/**
 * 메인 히어로 캐러셀
 *
 * [1차] 원본: main_visual_wepix.jpg 1000x298 정지 이미지 한 장
 *       ("빠르고 간편한 자동차대출 / 즉시대출! 신용조회 무!")
 * [3차] ← 지금. 화면 폭 전체를 쓰는 캐러셀로 교체.
 *
 * 동작
 *   · 6초 간격 자동 전환, 좌우 화살표 · 하단 인디케이터로 수동 전환
 *   · 마우스가 올라가 있거나 포커스가 안에 있으면 자동 전환 일시정지
 *     (읽는 중에 슬라이드가 넘어가 버리는 문제를 막기 위함)
 *   · 브라우저 탭이 비활성이면 타이머 정지
 *   · 좌/우 방향키로 이동 가능
 *   · 동작 최소화 설정(prefers-reduced-motion)인 사용자에게는 자동 전환을 하지 않는다
 *
 * ⚠️ 배경 이미지는 자리표시다. 실제 차량 사진을 받으면 Placeholder 를 <Image> 로 바꾸면 된다.
 *    슬라이드 문구도 고객사 확정 문구로 교체 대상이다.
 */
type Slide = {
  /** 작은 라벨 */
  eyebrow: string;
  /** 큰 제목 (줄바꿈 배열) */
  title: string[];
  /** 보조 설명 */
  desc: string;
  /** 보조 버튼 */
  link: { label: string; href: string };
  /** 배경 색조 – 실제 사진이 들어가기 전까지 슬라이드를 구분하기 위한 임시 배경 */
  tone: string;
  /** 자리표시 메모 */
  note: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "경기 · 서울 전 지역",
    title: ["필요한 기간만큼,", "합리적인 렌터카"],
    desc: "하루부터 장기까지. 차종과 이용 기간만 말씀해 주시면 가능한 차량과 요금을 바로 안내해 드립니다.",
    link: { label: "보유차량 보기", href: "/cars/compact" },
    tone: "from-navy-900 via-navy-800 to-navy-600",
    note: "hero_01.jpg – 대표 차량 주행 사진 권장",
  },
  {
    eyebrow: "차급별 다양한 선택",
    title: ["경차부터 승합차까지", "목적에 맞는 차량"],
    desc: "출퇴근용 경차, 장거리 세단, 단체 이동을 위한 9인승 이상 승합차까지 보유하고 있습니다.",
    link: { label: "차급 살펴보기", href: "/cars/suv" },
    tone: "from-navy-800 via-navy-700 to-sky-brand",
    note: "hero_02.jpg – 여러 차종이 나열된 사진 권장",
  },
  {
    eyebrow: "복잡한 절차 없이",
    title: ["가입도, 예약 폼도", "필요 없습니다"],
    desc: "전화 한 통이면 상담부터 계약까지 진행됩니다. 필요한 서류와 보험 조건도 함께 안내해 드립니다.",
    link: { label: "이용안내 보기", href: "/guide" },
    tone: "from-navy-900 via-navy-700 to-navy-500",
    note: "hero_03.jpg – 상담 장면 또는 매장 사진 권장",
  },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // 자동 전환 – 일시정지 상태이거나 동작 최소화 설정이면 돌지 않는다
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  // 탭이 백그라운드로 가면 정지
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-900"
      aria-roledescription="carousel"
      aria-label="주요 안내"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* 슬라이드 – 전부 겹쳐두고 투명도로 전환한다 (높이 흔들림 없음) */}
      <div className="relative h-[520px] w-full sm:h-[580px] lg:h-[660px]">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.eyebrow}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${SLIDES.length}`}
            >
              {/* 배경 – ⚠️ 실제 사진으로 교체할 자리 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.tone}`}>
                {/* 사진이 들어오면 그 위에 얹을 어둡게 처리 레이어 (텍스트 가독성 확보) */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_20%,transparent,rgba(0,0,0,0.45))]" />
                {/* 이미지 자리 안내 – 문구가 본문과 겹치지 않도록 오른쪽 절반 가운데에 둔다.
                    실제 사진을 넣을 때는 이 <span> 을 지우고 배경에 <Image> 를 깔면 된다. */}
                <span
                  className="absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center text-[17px] font-medium text-white/45 lg:flex"
                  title={slide.note}
                >
                  이미지 삽입 예정
                </span>
              </div>

              {/* 문구 */}
              <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-center px-5 lg:px-8">
                <div
                  className={`max-w-xl transition-all duration-700 lg:max-w-none ${
                    active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="text-[14px] font-bold tracking-wide text-navy-200 sm:text-[15px]">{slide.eyebrow}</p>
                  <h2 className="mt-4 text-[38px] font-black leading-[1.18] tracking-tight text-white sm:text-[48px] lg:text-[58px]">
                    {slide.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                  {/* PC 에서는 한 줄로 보이게 한다 (lg:whitespace-nowrap) */}
                  <p className="mt-6 text-[16px] leading-relaxed text-white/80 sm:text-[17px] lg:whitespace-nowrap">
                    {slide.desc}
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* 주 CTA – 전화 */}
                    <a
                      href={telHref}
                      className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-cta-500 px-8 text-[17px] font-bold text-white transition-colors hover:bg-cta-600"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      전화 상담 {SITE.phone}
                    </a>
                    {/* 보조 CTA */}
                    <Link
                      href={slide.link.href}
                      className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 px-8 text-[17px] font-bold text-white transition-colors hover:bg-white/10"
                    >
                      {slide.link.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 좌우 화살표 */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="이전 슬라이드"
        className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:bg-white/15 hover:text-white lg:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="다음 슬라이드"
        className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:bg-white/15 hover:text-white lg:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 하단 인디케이터 – 현재 슬라이드는 길쭉한 막대로 표시 */}
      {/* 인디케이터
          모바일: 카드가 히어로를 겹치지 않으므로 맨 아래
          PC(lg): 카드가 -mt-16 으로 겹쳐 올라오므로 그보다 위쪽에 둔다 */}
      <div className="absolute inset-x-0 bottom-7 flex justify-center gap-2 lg:bottom-28">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.eyebrow}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1}번 슬라이드 보기`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-9 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
