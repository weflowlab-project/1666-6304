import Link from "next/link";
import { MENU, SITE } from "@/lib/menu";

/**
 * 하단 푸터
 *
 * [1차] 원본: bm_copyright_img.gif 1000x441 통이미지. 내용의 대부분이 대부업 법정 고지였다.
 * [2차] 대부업 고지 제거 + 렌터카 사업자 정보로 교체
 * [3차] ← 지금. 화면 전체 폭을 쓰는 요즘 푸터 구조(3열: 상호·연락 / 메뉴 / 안내)로 재구성.
 *
 * ⚠️ 삭제한 대부업 문구 (되살리면 안 됨)
 *      대부업 등록번호 / 대출금리 · 연체금리 고지 / 총 대출비용 예시 /
 *      "과도한 빚은 당신에게 큰 불행을 안겨 줄 수 있고…" 경고문
 * ⚠️ 렌터카는 여객자동차 운수사업법상 "자동차대여사업 등록번호" 표기가 필요하다.
 *    SITE.business 값이 전부 자리표시이므로 실제 정보를 받아 채워야 한다.
 */
export default function Footer() {
  const b = SITE.business;
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <footer className="border-t border-navy-100 bg-navy-50/60">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
          {/* 상호 + 대표번호 */}
          <div>
            <Link href="/" className="text-[22px] font-black tracking-tight text-navy-800">
              {SITE.name}
            </Link>
            <p className="mt-2 text-[14px] text-ink-500">{SITE.slogan}</p>
            <a href={telHref} className="mt-6 block text-[30px] font-black leading-none tracking-tight text-navy-800">
              {SITE.phone}
            </a>
            <p className="mt-2.5 text-[13px] text-ink-500">{SITE.hours}</p>
          </div>

          {/* 메뉴 */}
          <nav aria-label="푸터 메뉴">
            <p className="text-[13px] font-bold text-navy-900">바로가기</p>
            <ul className="mt-4 space-y-2.5">
              {MENU.map((m) => (
                <li key={m.id}>
                  <Link href={m.href} className="text-[15px] text-ink-500 transition-colors hover:text-navy-700">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 안내 문구 – 요금 비공개 정책 설명 */}
          <div>
            <p className="text-[13px] font-bold text-navy-900">이용 안내</p>
            {/* 지정된 위치에서 줄바꿈 */}
            <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
              대여 요금은 차종과 이용 기간, 보험 조건에 따라 달라집니다.
              <br />
              전화 주시면 조건에 맞는 차량과 요금을 바로 안내해 드립니다.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-500">
              보유 차량은 수시로 변동되며, 홈페이지에 표시된 차량이
              <br />
              대여 중일 수 있습니다.
            </p>
          </div>
        </div>

        {/* 사업자 정보 – ⚠️ TODO: 실제 정보로 교체 */}
        <div className="mt-12 border-t border-navy-100 pt-7 text-[13px] leading-relaxed text-ink-500">
          <p>
            상호 : {SITE.name} · 대표자 : {b.ceo} · 사업자등록번호 : {b.regNo}
          </p>
          <p>
            주소 : {b.address} · 자동차대여사업 등록번호 : {b.rentalLicense}
          </p>
          <p className="mt-4 text-ink-500/70">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
