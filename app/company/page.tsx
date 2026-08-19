import type { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { CallCtaButton } from "@/components/table/InfoTable";
import { SITE } from "@/lib/menu";

/**
 * 회사소개 페이지
 *
 * 원본은 인사말이 통째로 박힌 이미지 한 장(infor_img.jpg 730x399)이 전부였다.
 * 이미지 안의 텍스트라 수정할 수 없고 검색에도 잡히지 않아 실제 텍스트로 옮겼다.
 *
 * 변경
 *   · 이미지 자리 표시 제거 – 인사말은 그냥 본문 텍스트로 둔다
 *   · 730px 고정 → 유동 (모바일 대응)
 *
 * ⚠️ 인사말은 렌터카용으로 새로 쓴 자리표시 문구다. 고객사 확정 문구를 받으면 교체해야 한다.
 * 상호는 SITE.name 을 참조한다 (lib/menu.ts 한 곳만 고치면 사이트 전체에 반영).
 */
export const metadata: Metadata = { title: `회사소개 - ${SITE.name}` };

export default function CompanyPage() {
  return (
    <SubPageLayout sectionId="company" title="회사소개">
      <div className="w-full">
        {/* 인사말 */}
        <h2 className="text-[19px] font-bold leading-[1.5] text-[#2674BE] sm:text-[22px]">
          “안녕하세요 {SITE.name} 입니다”
        </h2>

        <div className="mt-4 space-y-3 text-[14px] leading-[1.9] text-[#535353] sm:text-[15px]">
          <p>{SITE.name} 홈페이지를 방문해 주신 고객 여러분께 감사드립니다.</p>
          <p>저희 회사는 오랜 기간 자동차 업계에서 쌓은 경험을 바탕으로 운영되고 있습니다.</p>
          <p>
            짧게는 며칠, 길게는 수년까지 필요하신 기간과 용도는 모두 다릅니다. 정해진 상품을 권하기보다 고객님의
            상황을 먼저 듣고 알맞은 차량을 찾아드립니다.
          </p>
          <p>
            또한 저희 <strong className="font-bold text-[#D00000]">“{SITE.name}”</strong> 는 차량 상태 관리와 신속한
            응대를 약속드립니다.
          </p>
          <p>궁금한 점이 있으시면 언제든 편하게 전화 주십시오. 감사합니다.</p>
        </div>

        <p className="mt-6 text-right text-[14px] text-[#535353]">- {SITE.name} 임직원 일동 -</p>

        {/* 영업 지역 – 원본 "영업망 안내" 배너 내용을 페이지 안으로 */}
        <div className="mt-8 rounded-[4px] border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[13px] leading-[1.7] text-[#666]">
          <b className="text-[#1c5aa8]">영업 지역</b>
          <br />
          경기권(성남/분당/수원/안양/안산/의정부/일산/평택/오산/화성/천안 등), 서울 전지역
          <br />
          지역에 따라 차량 인수 방법이 다를 수 있습니다. 자세한 사항은 전화로 확인해 주세요.
        </div>

        <div className="mt-6 flex justify-center">
          <CallCtaButton />
        </div>
      </div>
    </SubPageLayout>
  );
}
