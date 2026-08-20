import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 이용 절차 안내 + 주요 페이지 바로가기
 *
 * 원본
 *   1) 대출절차안내 – 인터넷신청 → 고객상담 → 대출심사 → 대출실행
 *   2) 자동차시세 3사 외부 링크 (SK엔카 / GS카넷 / 파인드올)
 *
 * 변경
 *   1) → 렌터카 이용 절차. 예약 폼이 없으므로 첫 단계가 "전화 문의"다.
 *   2) → 외부 중고차 시세 사이트는 렌터카와 무관해 제거하고 주요 페이지 바로가기로 교체
 *   · 폭 310px 고정 → 위쪽 배너와 같은 2열 그리드의 한 칸
 *   · 제목을 박스 밖으로 빼고 파란 밑줄을 둬 "보유 차량 안내"와 같은 형태로 맞췄다
 */
const STEPS = ["전화 문의", "차량·요금 안내", "계약", "차량 인수"];

// 상단 메뉴와 같은 순서(회사소개 → 이용안내 → 자주묻는질문)로 둔다
const SHORTCUTS = [
  { label: "회사소개", desc: `${SITE.name} 안내`, href: "/company" },
  { label: "이용안내", desc: "자격·보험·서류", href: "/guide" },
  { label: "자주묻는질문", desc: "문의 전 확인", href: "/faq" },
];

export default function RightBanners() {
  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* 제목 – 보유 차량 안내와 동일한 형태(파란 밑줄, 박스 밖) */}
      <div className="flex h-[46px] items-center border-b-2 border-[#62abe9] px-2">
        <span className="text-[16px] font-bold text-[#1c5aa8] md:text-[17px]">이용 절차 안내</span>
      </div>

      {/* 순서도
          · md 이상: 네 단계를 한 줄로. 각 칸은 글자 길이만큼만 차지한다
            (칸을 균등 분할하는 grid 대신 flex + flex-none). 화살표에는 좌우 여백을 준다.
          · md 미만: 칸이 좁아 한 줄이 안 되므로 2개씩 두 줄 (위2 / 아래2)
          혹시 글꼴 폭이 예상보다 넓어도 레이아웃이 깨지지 않도록 overflow-x-auto 를 걸어 둔다. */}
      {/* justify-center: 회색 영역이 옆 "보유 차량 안내" 높이에 맞춰 늘어나므로,
          남는 세로 공간의 가운데에 순서도를 놓는다 */}
      <div className="flex flex-1 flex-col justify-center bg-[#f7f9fb] px-4 py-4">
        <ol className="grid list-none grid-cols-2 gap-y-3 p-0 text-[14px] text-[#333] md:flex md:flex-nowrap md:items-center md:justify-center md:overflow-x-auto md:text-[12px]">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center">
              <span className="flex-1 whitespace-nowrap rounded border border-[#dfe6ee] bg-white px-3 py-2.5 text-center md:flex-none md:px-3 md:py-2">
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  // 2열(모바일) 배치에서 두 번째 칸 뒤 화살표는 줄 끝이라 가린다
                  className={`mx-2.5 shrink-0 text-[#d61c1c] md:mx-1.5 ${i === 1 ? "hidden md:inline" : ""}`}
                  aria-hidden
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* 주요 페이지 바로가기 – PC·모바일 모두 노출 */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center rounded-[4px] border border-[#e5e5e5] bg-white px-2 py-3 text-center transition-colors hover:border-[#9ccbee]"
          >
            <span className="text-[13px] font-extrabold text-[#1c5aa8]">{item.label}</span>
            <span className="mt-1 text-[11px] text-[#777] max-md:text-[12px]">{item.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
