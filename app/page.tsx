import Link from "next/link";
import HeroCarousel from "@/components/home/HeroCarousel";
import Placeholder from "@/components/Placeholder";
import { PhoneIcon } from "@/components/layout/Header";
import { CAR_CATEGORIES, CAR_CATEGORY_IDS } from "@/lib/cars";
import { SITE } from "@/lib/menu";

/**
 * 홈(메인) 페이지
 *
 * [1차] 원본 /default/index.php 이식 – 1000px 고정폭, 한 화면에 배너 6개 + 상담 진입점 4개
 * [2차] 렌터카로 내용 교체
 * [3차] ← 지금. 화면 전체 폭을 쓰는 요즘 홈페이지 구조로 재구성.
 *
 * 섹션 순서 (위에서 아래로 하나의 흐름이 되도록 배치)
 *   1. 히어로 캐러셀        – 무엇을 하는 곳인지 + 전화 CTA
 *   2. 빠른 안내 3종        – 히어로 위로 겹쳐 올라오는 카드 (영업지역/상담시간/절차)
 *   3. 보유차량 차급 4종    – 카드 그리드
 *   4. 이용 절차 4단계      – 전화 한 통이면 된다는 것을 시각적으로
 *   5. 이용안내 · FAQ 유도  – 요금을 공개하지 않는 대신 궁금증을 푸는 경로
 *   6. 마무리 전화 CTA      – 전체 폭 배너
 *
 * 원본의 "정신없음"을 만든 요소들은 정리했다.
 *   · 상담 진입점 4개(SMS폼/빠른신청배너/채팅아이콘/신청버튼) → 전화 하나로 통일
 *   · 원색 남발 → 남색 기반 + 강조 빨강은 전화 CTA 에만
 *   · 외부 사이트 링크(자동차시세 3사) → 제거
 */
export default function Home() {
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <>
      {/* 1. 히어로 캐러셀 */}
      <HeroCarousel />

      {/* 2. 빠른 안내 3종
          PC 에서는 히어로를 살짝 겹쳐 올라오게 해 시선을 아래로 유도한다.
          모바일에서는 겹치면 히어로의 버튼·인디케이터와 충돌하므로 겹치지 않게 둔다. */}
      <section className="relative z-10 mx-auto mt-6 w-full max-w-[1280px] px-5 lg:-mt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "영업 지역",
              desc: "경기 · 서울 전 지역",
              sub: "성남/분당/수원/안양/안산/의정부/일산/평택/오산/화성 등",
            },
            { title: "상담 시간", desc: SITE.hours.split("/")[0].trim(), sub: "주말 · 공휴일도 상담 가능합니다" },
            { title: "이용 절차", desc: "전화 한 통이면 완료", sub: "회원가입 · 예약 폼 없이 바로 상담" },
          ].map((item) => (
            <div
              key={item.title}
              className="rise rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(18,41,77,0.25)]"
            >
              <p className="text-[13px] font-bold text-sky-brand">{item.title}</p>
              <p className="mt-2 text-[19px] font-bold text-navy-900">{item.desc}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 보유차량 차급 */}
      <section className="mx-auto w-full max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="rise">
            <p className="text-[14px] font-bold tracking-wide text-sky-brand">OUR CARS</p>
            <h2 className="mt-3 text-[30px] sm:text-[38px]">보유차량</h2>
            {/* 지정된 위치에서 줄바꿈 (문장 단위로 끊어 읽히게) */}
            <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
              이용 목적에 맞는 차급을 선택해 보세요.
              <br />
              보유 현황은 수시로 변동되므로 정확한 차량은 전화로 확인해 드립니다.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAR_CATEGORY_IDS.map((id) => {
            const cat = CAR_CATEGORIES[id];
            return (
              <Link
                key={id}
                href={`/cars/${id}`}
                className="rise group overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(18,41,77,0.4)]"
              >
                {/* ⚠️ 차급 대표 사진 자리 – 실제 사진으로 교체 */}
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <Placeholder width="100%" height="100%" note={`${cat.label} 대표 사진`} tone="light">
                    <span className="text-[13px] text-ink-500">{cat.label}</span>
                  </Placeholder>
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between text-[20px]">
                    {cat.label}
                    <span className="text-navy-300 transition-transform group-hover:translate-x-1">→</span>
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-ink-500">{cat.description}</p>
                  <p className="mt-4 text-[13px] font-bold text-sky-brand">차량 {cat.cars.length}종</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 전체 보기 – 카드 아래 버튼으로 배치 */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/cars/compact"
            className="rise group inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-2 border-navy-200 px-9 text-[17px] font-bold text-navy-700 transition-colors hover:border-navy-600 hover:bg-navy-50"
          >
            보유 차량 전체 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* 4. 이용 절차 – 어두운 배경으로 화면 전체를 채워 리듬을 준다 */}
      <section className="bg-navy-900">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="rise text-center">
            <p className="text-[14px] font-bold tracking-wide text-navy-300">HOW IT WORKS</p>
            <h2 className="mt-3 text-[30px] text-white sm:text-[38px]">전화 한 통이면 됩니다</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-navy-200">
              회원가입이나 온라인 예약 절차가 없습니다. 필요한 차와 기간만 말씀해 주세요.
            </p>
          </div>

          <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              // desc 는 지정된 위치에서 줄바꿈되도록 두 줄로 나눠 둔다
              { step: "01", title: "전화 문의", desc: ["원하시는 차종과 이용 기간을", "말씀해 주세요."] },
              { step: "02", title: "차량 · 요금 안내", desc: ["가능한 차량과 요금을", "바로 확인해 드립니다."] },
              { step: "03", title: "계약", desc: ["필요 서류를 확인하고", "계약을 진행합니다."] },
              { step: "04", title: "차량 인수", desc: ["방문 수령 또는 배차로", "차량을 전달해 드립니다."] },
            ].map((item) => (
              <li key={item.step} className="rise relative rounded-2xl border border-white/10 bg-white/[0.06] p-7">
                <span className="text-[13px] font-black tracking-widest text-sky-brand">{item.step}</span>
                <h3 className="mt-3 text-[20px] text-white">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-navy-200">
                  {item.desc.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. 이용안내 · FAQ 유도 – 요금을 공개하지 않으므로 여기서 궁금증을 풀어준다 */}
      <section className="mx-auto w-full max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            {
              href: "/guide",
              label: "GUIDE",
              title: "이용안내",
              desc: "대여 자격과 필요 서류, 보험 범위, 차량 인수 · 반납 방법을 정리했습니다.",
              items: ["대여 자격 · 필요 서류", "보험 범위와 자차 가입", "차량 인수 · 반납", "사고 · 고장 시 조치"],
            },
            {
              href: "/faq",
              label: "FAQ",
              title: "자주묻는질문",
              desc: "전화 주시기 전에 자주 문의하시는 내용을 미리 확인하실 수 있습니다.",
              items: ["면허 취득 1년 미만도 가능한가요?", "요금은 얼마인가요?", "자차보험은 꼭 들어야 하나요?", "반납이 늦어지면 어떻게 되나요?"],
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rise group rounded-3xl border border-navy-100 bg-navy-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-50 hover:shadow-[0_20px_40px_-24px_rgba(18,41,77,0.4)] lg:p-10"
            >
              <p className="text-[13px] font-bold tracking-widest text-sky-brand">{card.label}</p>
              <h3 className="mt-3 flex items-center gap-3 text-[26px]">
                {card.title}
                <span className="text-navy-300 transition-transform group-hover:translate-x-1">→</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{card.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-navy-100 pt-6">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] text-ink-700">
                    <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-sky-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. 마무리 전화 CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-600">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-20 text-center lg:px-8 lg:py-24">
          <h2 className="rise text-[30px] text-white sm:text-[38px]">지금 바로 상담하세요</h2>
          <p className="rise mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-navy-100">
            차종과 이용 기간만 알려주시면 가능한 차량과 요금을 바로 안내해 드립니다.
          </p>
          <div className="rise mt-9 flex justify-center">
            {/* leading-none 을 주어 아이콘과 숫자의 세로 중심을 맞춘다
                (본문 line-height 1.7 이 그대로 적용되면 글자가 아래로 처져 보인다) */}
            <a
              href={telHref}
              className="inline-flex h-16 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-white px-10 text-[24px] font-black leading-none tracking-tight text-cta-500 transition-transform hover:scale-[1.03]"
            >
              <PhoneIcon className="h-6 w-6" />
              {SITE.phone}
            </a>
          </div>
          <p className="mt-5 text-[14px] text-navy-200">{SITE.hours}</p>
        </div>
      </section>
    </>
  );
}
