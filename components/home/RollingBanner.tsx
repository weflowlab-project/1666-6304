"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Placeholder from "@/components/Placeholder";

/**
 * 메인 중앙 롤링 배너 (원본: 467px 폭, 상단바 center_banner_top.gif 467x43 + 이미지 467x167)
 *
 * 원본 자바스크립트(dnimages/urls/buttons 배열 + blurs()/chki()) 동작 재현
 *   - 4장의 배너 이미지(center_banner_img_01~04.jpg)를 4.5초(interval=4500) 간격으로 순환
 *   - 전환 시 IE 전용 blendTrans(duration=1) 필터로 1초 페이드 → CSS opacity 트랜지션으로 대체
 *   - 상단바 우측의 번호 버튼(bt_01~04.gif 18x17, 활성 시 bt_0X_ov.gif 파란색)을 클릭하면
 *     해당 배너로 즉시 전환(chki)하고, 이후 자동 순환은 그 위치부터 이어짐
 *   - 배너 이미지 클릭 → 해당 대출 상품 페이지로 이동 (RollUrl href 갱신)
 *   - 원본은 시작 인덱스가 Math.round(Math.random()*7) 로 랜덤(버그성)이었으나 여기서는 0부터 시작
 */
const BANNERS = [
  {
    title: "개인 자동차 담보대출",
    desc: ["개인명의 자동차를 소유한 누구나 가능", "(설정 및 할부차량 가능, 타사대납 및 연체자 가능)"],
    href: "/car-loan/personal",
    note: "center_banner_img_01.jpg (흰색 세단)",
  },
  {
    title: "법인 자동차 담보대출",
    desc: ["법인명의 자동차를 소유한 누구나 가능", "(설정 및 할부차량 가능, 타사대납 및 연체자 가능)"],
    href: "/car-loan/corporate",
    note: "center_banner_img_02.jpg (노란 오픈카)",
  },
  {
    title: "수입 자동차 담보대출",
    desc: ["개인 or 법인명의 수입차를 소유한 누구나 가능", "(설정 및 할부차량 가능, 타사대납 및 연체자 가능)"],
    href: "/car-loan/imported",
    note: "center_banner_img_03.jpg (초록 스포츠카)",
  },
  {
    title: "리스 자동차 담보대출",
    desc: ["리스로 자동차를 구입한 누구나 가능", "(설정 및 할부차량 가능, 타사대납 및 연체자 가능)"],
    href: "/car-loan/lease",
    note: "center_banner_img_04.jpg (검정 세단)",
  },
];

const INTERVAL = 4500; // 원본 interval 변수
const FADE_MS = 1000; // 원본 blendTrans(duration=1)

export default function RollingBanner() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 원본 setimgurl()/chki(): 페이드 후 인덱스 교체 */
  const goTo = (next: number) => {
    if (next === index) return;
    setFading(true);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, FADE_MS / 2);
  };

  /** 원본 blurs(): n 증가 → 이미지/링크 교체 → 다음 타이머 예약 (index 가 바뀔 때마다 재예약) */
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
    <div className="w-[467px]">
      {/* 상단바 (center_banner_top.gif 467x43, 파란 라인 + 우측 번호 버튼들) */}
      <div className="flex h-[43px] items-center justify-end border-b-2 border-[#62abe9] pr-[15px]">
        <div className="flex gap-[3px]">
          {BANNERS.map((b, i) => (
            <button
              key={b.href}
              type="button"
              name={`num_img${i}`}
              onClick={() => goTo(i)} // 원본 chki(this, i)
              aria-label={`${i + 1}번 배너 보기`}
              aria-pressed={i === index}
              className={`flex h-[17px] w-[18px] cursor-pointer items-center justify-center border text-[10px] font-bold leading-none ${
                i === index
                  ? "border-[#4d9be0] bg-[#69afea] text-white" /* bt_0X_ov.gif */
                  : "border-[#8d8d8d] bg-white text-[#666]" /* bt_0X.gif */
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 배너 이미지 (center_banner_bg.jpg 배경 위 RollImg 467x167) – 클릭 시 상품 페이지로 */}
      <Link href={banner.href} className="block no-underline" aria-label={banner.title}>
        <div
          className="transition-opacity"
          style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS / 2}ms` }}
        >
          <Placeholder width={467} height={167} note={banner.note} tone="light" align="left">
            <div className="pl-3 text-[12px] leading-[17px] text-[#444]">
              <div className="mb-1 text-[16px] font-bold text-[#1c5aa8]">{banner.title}</div>
              {banner.desc.map((d) => (
                <div key={d}>{d}</div>
              ))}
              <div className="mt-2 text-[#d61c1c]">
                <b>대출한도</b> : 중고차 시세 90% ~ 120%
              </div>
              <div className="text-[#d61c1c]">
                <b>대출금리</b> : 월 1% ~ 1.6%
              </div>
            </div>
          </Placeholder>
        </div>
      </Link>
    </div>
  );
}
