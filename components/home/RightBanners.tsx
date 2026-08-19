import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 롤링 배너 옆 안내 2종 (원본 310px 폭 배너 2장 자리)
 *
 * 원본
 *   1) 대출절차안내 – 인터넷신청 → 고객상담 → 대출심사 → 대출실행
 *   2) 자동차시세 3사 외부 링크 (SK엔카 / GS카넷 / 파인드올)
 *
 * 변경
 *   1) → 렌터카 이용 절차. 예약 폼이 없으므로 첫 단계가 "전화 문의"다.
 *   2) → 외부 중고차 시세 사이트는 렌터카와 무관해 제거하고 주요 페이지 바로가기로 교체
 *   · 폭 310px 고정 → 유동. 이미지 자리 표시 제거.
 *
 * 반응형: xl 미만에서는 롤링 배너 아래로 내려가 가로로 펼쳐진다.
 */
const STEPS = ["전화 문의", "차량·요금 안내", "계약", "차량 인수"];

const SHORTCUTS = [
  { label: "이용안내", desc: "자격·보험·서류", href: "/guide" },
  { label: "자주묻는질문", desc: "문의 전 확인", href: "/faq" },
  { label: "회사소개", desc: `${SITE.name} 안내`, href: "/company" },
];

export default function RightBanners() {
  return (
    <div className="w-full min-w-0 xl:w-[300px] xl:shrink-0">
      {/* 이용 절차 안내 */}
      <div className="rounded-[4px] border border-[#e5e5e5] bg-white px-4 py-4">
        <p className="text-[14px] font-bold">
          <span className="text-[#d61c1c]">이용절차</span>
          <span className="text-[#1c5aa8]">안내</span>
        </p>
        <ol className="mt-3 flex list-none flex-wrap items-center gap-x-1 gap-y-2 p-0 text-[12px] text-[#333]">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center">
              <span className="whitespace-nowrap rounded border border-[#dfe6ee] bg-[#f7f9fb] px-2.5 py-1.5">{s}</span>
              {i < STEPS.length - 1 && (
                <span className="mx-1 text-[#d61c1c]" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* 주요 페이지 바로가기 */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white px-2 py-3 text-center transition-colors hover:border-[#9ccbee]"
          >
            <span className="text-[13px] font-extrabold text-[#1c5aa8]">{item.label}</span>
            <span className="mt-1 text-[11px] text-[#777]">{item.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
