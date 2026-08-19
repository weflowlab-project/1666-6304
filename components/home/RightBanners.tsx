import Placeholder from "@/components/Placeholder";

/**
 * 메인 우측 배너 2종 (롤링 배너 오른쪽, 각 310px 폭)
 *
 * 1) 대출절차안내 (center_right_banner_01.gif 310x119) – 정적 이미지, 링크 없음
 *      인터넷신청 → 고객상담 → 대출심사 → 대출실행 (아이콘 4개, 빨간 화살표)
 * 2) 자동차시세 사이트 링크 (center_right_banner_02.gif 310x91 + 이미지맵, 모두 새 창)
 *      [SK엔카 자동차시세]  → http://www.encar.com        (coords 3,5,91,87)
 *      [GS카넷 자동차시세]  → http://www.gscarnet.com     (coords 107,7,209,84)
 *      [파인드올 자동차시세]→ http://paper.findall.co.kr/car/ (coords 213,5,310,84)
 */
const STEPS = ["인터넷신청", "고객상담", "대출심사", "대출실행"];

const PRICE_SITES = [
  { name: "SK엔카", label: "SK엔카 자동차시세", href: "http://www.encar.com", w: 91 },
  { name: "GS카넷", label: "GS 카넷 자동차시세", href: "http://www.gscarnet.com", w: 105 },
  { name: "FindAll", label: "파인드올 자동차시세", href: "http://paper.findall.co.kr/car/", w: 100 },
];

export default function RightBanners() {
  return (
    <div className="flex w-[310px] flex-col items-end">
      {/* 대출절차안내 */}
      <Placeholder width={310} height={119} note="center_right_banner_01.gif" tone="light" align="left">
        <div className="pl-2">
          <div className="text-[14px] font-bold">
            <span className="text-[#d61c1c]">대출절차</span>
            <span className="text-[#1c5aa8]">안내</span>
          </div>
          <ol className="mt-2 flex list-none items-center gap-1 p-0 text-[11px] text-[#333]">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center">
                <span className="flex flex-col items-center">
                  <span className="mb-1 flex h-[34px] w-[40px] items-center justify-center rounded border border-[#bbb] bg-white text-[9px] text-[#999]">
                    icon
                  </span>
                  {s}
                </span>
                {i < STEPS.length - 1 && <span className="mx-1 text-[#d61c1c]">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </Placeholder>

      {/* 자동차시세 3개 사이트 – 각각 새 창으로 열림 */}
      <div className="flex w-[310px]" role="group" aria-label="자동차시세 조회 사이트">
        {PRICE_SITES.map((site) => (
          <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className="block no-underline">
            <Placeholder width={site.w} height={91} note="center_right_banner_02.gif" tone="light">
              <span className="text-[14px] font-extrabold text-[#e0322e]">{site.name}</span>
              <span className="mt-1 text-[10px] text-[#444]">{site.label}</span>
            </Placeholder>
          </a>
        ))}
      </div>
    </div>
  );
}
