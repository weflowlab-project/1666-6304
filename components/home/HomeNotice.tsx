import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 홈 하단 안내 블록 (원본 게시판 최신글 위젯 2개 자리)
 *
 * 원본은 공지사항 · 대출진행현황 최신글을 380px 폭으로 나란히 보여줬다.
 * 관리자 페이지를 만들지 않아 게시판을 운영할 수 없으므로
 * (갱신되지 않는 공지는 오히려 영업하지 않는 곳처럼 보인다)
 * 같은 자리를 이용 안내와 전화 안내로 대체했다.
 *
 * 변경: 380px 고정 → 유동. 이미지 제목(news_title.gif 등) 자리 표시 제거.
 * 반응형: 모바일 1열 → md 이상 2열
 */
const GUIDE_LINKS = [
  { text: "대여 자격과 필요 서류 안내", href: "/guide#qualification" },
  { text: "보험 범위와 자차 가입 안내", href: "/guide#insurance" },
  { text: "차량 인수 · 반납 방법", href: "/guide#handover" },
  { text: "사고 · 고장 시 조치 방법", href: "/guide#accident" },
];

export default function HomeNotice() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      {/* 이용 안내 */}
      <div>
        <Link href="/guide" className="block border-l-[3px] border-[#1c5aa8] pl-2 text-[14px] font-bold text-[#222]">
          이용 안내
        </Link>
        <ul className="mt-2 list-none p-0 text-[13px] leading-[1.9]">
          {GUIDE_LINKS.map((item) => (
            <li key={item.text} className="flex items-start">
              <span className="mr-1.5 mt-[2px] text-[#1c5aa8]" aria-hidden>
                ▪
              </span>
              <Link href={item.href} className="text-[#333] hover:text-[#0593B7]">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 전화 안내 */}
      <div>
        <Link href="/faq" className="block border-l-[3px] border-[#1c5aa8] pl-2 text-[14px] font-bold text-[#222]">
          자주 묻는 질문
        </Link>
        <div className="mt-2 rounded-[4px] border border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
          <p className="text-[13px] leading-[1.7] text-[#555]">
            대여 요금은 차종 · 이용 기간 · 보험 조건에 따라 달라집니다.
            <br />
            전화 주시면 조건에 맞는 차량과 요금을 바로 안내해 드립니다.
          </p>
          <a
            href={`tel:${SITE.phone.replace(/-/g, "")}`}
            className="mt-2 block text-[24px] font-extrabold leading-tight tracking-tight text-[#d61c1c]"
          >
            {SITE.phone}
          </a>
          <p className="text-[12px] text-[#999]">{SITE.hours}</p>
        </div>
      </div>
    </div>
  );
}
