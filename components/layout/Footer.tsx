import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 하단 푸터 (원본: bm_copyright_img.gif 1000x441 통이미지 + 로고 부분 이미지맵 → 홈 링크)
 *
 * 원본 이미지의 텍스트를 그대로 옮겼다. 좌측 상단 로고(3,22,222,77)를 클릭하면 홈으로 이동.
 * 배경: 상단에 1px 회색 라인(#e1e1e1, bm_copy_bg.gif) 이후 흰색.
 * 마지막 문단(과도한 빚 경고문)은 원본에서 파란색(#2c63b8 계열)으로 강조.
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e1e1e1] bg-white">
      <div className="mx-auto w-[1000px] px-[30px] py-[24px] text-[12px] leading-[19px] text-[#555]">
        {/* 상단: 로고 + 회사 정보 */}
        <div className="flex items-start">
          {/* 로고 – 원본 이미지맵 영역(3,22,222,77) 클릭 시 홈 이동 */}
          <Link
            href="/"
            className="mr-[40px] mt-[4px] block w-[180px] shrink-0 text-[26px] font-extrabold leading-none tracking-tight text-[#1c3f7a] no-underline"
          >
            {SITE.name}
          </Link>
          <div className="text-[11px] leading-[17px] text-[#777]">
            본사주소 : 경기도 평택시 점촌로 23번길 24 102호 / 대부업 등록번호 : 2021 - 경기 평택 - 0010호
            <br />
            대표자 : 신경애 / 대표전화 : {SITE.phone} / 사업자번호 : 642-90-01634 / 회사명 : {SITE.name}
            <br />
            Copyright(c) 2011 {SITE.name} All rights reserved.
          </div>
        </div>

        {/* 대부업 필수 고지 문구 (원본 이미지 본문) */}
        <div className="mt-[22px] pl-[70px] text-[13px] leading-[21px] text-[#444]">
          <p>
            대표전화:{SITE.phone} 대출금리: 최저 월 0.6%~ 최대 1.6%이내(최대 연 20%이내, 신용도에 따라 차등적용)|
            연체금리:약정이자율+3%P이내, 연 20%이내. 채무의 조기상환 조건 및 부대비용 없음.단, 담보대출은 최대
            3%이내 중도상환수수료, 담보권설정비용 발생|부대비용:등록면허세, 지방교육세, 등기신청수수료,
            국민주택채권매입금액 및 근저당권해지비용|상환 기간:최단 12개월~최장 60개월 이하|중도상환:중도상환가능,
            중도상환 시 수수료 발생 할 수 있으며, 대출상품에 따라 달라질 수 있습니다. 이자 외 별도로 중개수수료를
            요구하거나 받는 것은 불법입니다.
          </p>
          <p className="mt-[18px]">
            총 대출 비용 예시:1000만원을 12개월 기간 동안 금리 연 20% 적용하여 원리금균등상환방법으로 이용하는 경우
            총 상환금액 11,116,141원 (개인 대출 상품 및 상환방법에 따라 달라질 수 있습니다.) 단, 연체대출금보유자,
            불건전대출이 있는 자 등은 대출취급이 제한. 일정기간 납부해야 할 원리금이 연체될 경우에 계약만료 기한이
            도래하기 전에 모든 원리금을 변제해야 할 의무가 발생할 수 있습니다. 일반금융소비자는 금융판매사업자로부터
            충분히 설명을 받을 권리가 있으며, 설명 내용을 이해하신 후 계약 및 금융상품체결 전에 금융상품설명서 및 약관을
            읽어 보시기 바랍니다.
          </p>
          {/* 경고 문구 – 원본에서 파란색 강조 */}
          <p className="mt-[18px] text-[#2c63b8]">
            과도한 빚은 당신에게 큰 불행을 안겨 줄 수 있고, 상환능력에 비해 대출금이 과도할 경우 귀하의 신용등급 또는
            개인신용평점이 하락할 수 있으며, 신용등급 또는 신용평점 하락으로 다른 금융거래가 제약 받을 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
