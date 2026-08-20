"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * 메인 롤링 배너 (원본 center_banner 467x167 자리)
 *
 * 원본 자바스크립트(dnimages/urls/buttons + blurs()/chki()) 동작을 그대로 옮겼다.
 *   · 4.5초 간격 자동 순환
 *   · IE 전용 blendTrans 페이드 → CSS opacity 트랜지션으로 대체
 *   · 상단 번호 버튼을 누르면 즉시 전환
 *   · 배너 클릭 → 해당 차급 페이지
 *
 * 변경
 *   · 내용: 대출상품 4종 → 보유 차급 4종
 *   · 폭: 467px 고정 → 위쪽 배너와 같은 2열 그리드의 한 칸
 *   · 이미지 자리 표시 제거 (실제 사진을 받으면 배경에 <Image> 를 깔면 된다)
 */
const BANNERS = [
  {
    title: "경차 · 소형",
    desc: ["유지비 부담이 가장 적은 차급", "출퇴근 · 근거리 이동에 적합합니다"],
    href: "/cars/compact",
  },
  {
    title: "중형 · 대형 세단",
    desc: ["장거리 주행과 비즈니스 미팅에", "승차감과 정숙성을 중시하신다면"],
    href: "/cars/sedan",
  },
  {
    title: "SUV · 승합차",
    desc: ["가족 여행 · 단체 이동 · 짐이 많을 때", "9인승 이상도 상담 가능합니다"],
    href: "/cars/suv",
  },
  {
    title: "수입차",
    desc: ["상견례 · 결혼식 등 특별한 일정에", "보유 현황은 전화로 확인해 주세요"],
    href: "/cars/imported",
  },
];

const INTERVAL = 4500; // 원본 interval 값
const FADE_MS = 1000; // 원본 blendTrans(duration=1)

export default function RollingBanner() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 원본 chki(): 번호 버튼 클릭 시 즉시 전환 */
  const goTo = (next: number) => {
    if (next === index) return;
    setFading(true);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, FADE_MS / 2);
  };

  /** 원본 blurs(): 자동 순환 */
  useEffect(() => {
    timer.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % BANNERS.length);
        setFading(false);
      }, FADE_MS / 2);
    }, INTERVAL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index]);

  const banner = BANNERS[index];

  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* 상단바 – 원본 center_banner_top.gif 자리 */}
      <div className="flex h-[46px] items-center justify-between border-b-2 border-[#62abe9] px-2">
        <span className="text-[16px] font-bold text-[#1c5aa8] md:text-[17px]">보유 차량 안내</span>
        <div className="flex gap-[3px]">
          {BANNERS.map((b, i) => (
            <button
              key={b.href}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}번 배너 보기`}
              aria-pressed={i === index}
              className={`flex h-[18px] w-[18px] cursor-pointer items-center justify-center border text-[10px] font-bold leading-none ${
                i === index
                  ? "border-[#4d9be0] bg-[#69afea] text-white"
                  : "border-[#8d8d8d] bg-white text-[#666]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 배너 본문 – 클릭 시 차급 페이지로 */}
      <Link href={banner.href} className="flex flex-1 flex-col" aria-label={banner.title}>
        <div
          className="flex min-h-[150px] flex-1 flex-col bg-[#f7f9fb] px-4 py-4 transition-opacity"
          style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS / 2}ms` }}
        >
          <p className="text-[17px] font-bold text-[#1c5aa8]">{banner.title}</p>
          <div className="mt-1 text-[13px] leading-[1.7] text-[#555]">
            {banner.desc.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
          {/* 배너 전체가 차급 페이지로 가는 링크라, 눌러 볼 수 있다는 것을 알려 준다 */}
          <p className="mt-auto inline-flex items-center gap-1 pt-3 text-[14px] font-bold text-[#d61c1c]">
            차량 · 이용 조건 자세히 보기
            <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
