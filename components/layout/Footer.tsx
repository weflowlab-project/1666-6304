import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 하단 푸터 (원본: bm_copyright_img.gif 1000x441 통이미지 + 로고 부분 이미지맵 → 홈 링크)
 *
 * 레이아웃(1000px, 좌측 로고 + 우측 회사정보, 상단 1px 회색 라인)은 원본 틀 그대로다.
 *
 * ⚠️ 업종 전환으로 삭제한 내용
 *    원본 푸터의 대부분은 대부업자에게만 요구되는 법정 고지였다. 전부 제거했다.
 *      · 대부업 등록번호 (2021 - 경기 평택 - 0010호)
 *      · 대출금리 / 연체금리 / 중도상환수수료 / 부대비용 고지
 *      · 총 대출 비용 예시 (1000만원 12개월 → 총 상환금액 11,116,141원)
 *      · "과도한 빚은 당신에게 큰 불행을 안겨 줄 수 있고…" 경고문
 *    렌터카 업체가 이 문구를 달고 있으면 잘못된 정보이므로 남겨두면 안 된다.
 *
 * ⚠️ 대신 필요한 것
 *    렌터카(자동차대여사업)는 여객자동차 운수사업법에 따라 등록번호를 표기해야 한다.
 *    lib/menu.ts 의 SITE.business 값들을 실제 정보로 확인받아 채워야 한다. (현재 자리표시)
 */
export default function Footer() {
  const b = SITE.business;

  return (
    <footer className="w-full border-t border-[#e1e1e1] bg-white">
      <div className="mx-auto w-full max-w-[1000px] px-4 py-8 text-[13px] leading-[1.7] text-[#555] md:px-6">
        {/* 상단: 로고 + 회사 정보 (원본 이미지맵 영역 3,22,222,77 → 홈 이동) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <Link
            href="/"
            className="block shrink-0 text-[22px] font-extrabold leading-none tracking-tight text-[#1c3f7a] md:mr-[40px] md:mt-[4px] md:w-[180px] md:text-[26px]"
          >
            {SITE.name}
          </Link>
          <div className="text-[12px] leading-[1.8] text-[#777]">
            상호 : {SITE.name} / 대표자 : {b.ceo} / 사업자등록번호 : {b.regNo}
            <br />
            주소 : {b.address} / 자동차대여사업 등록번호 : {b.rentalLicense}
            <br />
            대표전화 : {SITE.phone} / 상담시간 : {SITE.hours}
            <br />
            Copyright(c) {new Date().getFullYear()} {SITE.name} All rights reserved.
          </div>
        </div>

        {/* 안내 문구 – 요금 비공개 정책이라 "전화 문의" 안내로 대체 */}
        <div className="mt-6 border-t border-[#eee] pt-4 text-[12px] leading-[1.8] text-[#666] md:pl-[220px]">
          <p>
            대여 요금은 차종과 이용 기간, 보험 조건에 따라 달라집니다. 전화 주시면 조건에 맞는 차량과 요금을 바로
            안내해 드립니다.
          </p>
          <p className="mt-[10px]">
            차량 보유 현황은 수시로 변동되며, 홈페이지에 표시된 차량이 대여 중일 수 있습니다. 이용 예정일과 차종을
            말씀해 주시면 가능 여부를 확인해 드립니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
