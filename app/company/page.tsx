import type { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import Placeholder from "@/components/Placeholder";
import { CallCtaButton } from "@/components/table/InfoTable";
import { SITE } from "@/lib/menu";

/**
 * 회사소개 페이지 (원본 /default/sub_01/sub_01_01.php)
 *
 * 원본은 인사말이 통째로 박힌 이미지 한 장(infor_img.jpg 730x399)이 전부였다.
 * 이미지 안의 텍스트라 수정할 수 없고 검색에도 잡히지 않아, 실제 텍스트로 옮겼다.
 * 레이아웃(사이드바 + 파란 테두리 박스 + 730px 본문)은 원본 틀 그대로다.
 *
 * ⚠️ 인사말은 원본 구조(파란 제목 + 본문 + 우측 하단 서명)를 유지하되
 *    내용을 대부업 → 렌터카로 새로 썼다. 고객사 확정 문구를 받으면 교체해야 한다.
 * ⚠️ 상호 미정이라 SITE.name("ㅇㅇ렌트카")을 참조한다.
 */
export const metadata: Metadata = { title: `회사소개 - ${SITE.name}` };

export default function CompanyPage() {
  return (
    <SubPageLayout sectionId="company" title="회사소개">
      {/* 원본 infor_img.jpg(730x399) 자리 – 이미지 안 텍스트를 실제 텍스트로 재현 */}
      <Placeholder width={730} height={399} note="infor_img.jpg" tone="none" align="left">
        <div className="w-full pl-[20px] pr-[20px] text-[13px] leading-[30px] text-[#535353]">
          <h3 className="mb-[6px] text-[22px] font-bold leading-[36px] text-[#2674BE]">
            “안녕하세요 {SITE.name} 입니다”
          </h3>
          <div className="pl-[30px]">
            <p>{SITE.name} 홈페이지를 방문해 주신 고객 여러분께 감사드립니다.</p>
            <p>저희 회사는 오랜 기간 자동차 업계에서 쌓은 경험을 바탕으로 운영되고 있습니다.</p>
            <p>
              짧게는 며칠, 길게는 수년까지 필요하신 기간과 용도는 모두 다릅니다.
              <br />
              정해진 상품을 권하기보다 고객님의 상황을 먼저 듣고 알맞은 차량을 찾아드립니다.
            </p>
            <p>
              또한 저희 <strong className="text-[16px] font-bold text-[#D00000]">“{SITE.name}”</strong> 는 차량 상태
              관리와 신속한 응대를 약속드립니다.
            </p>
            <p>궁금한 점이 있으시면 언제든 편하게 전화 주십시오. 감사합니다.</p>
          </div>
          <p className="pr-[40px] text-right">- {SITE.name} 임직원 일동 -</p>
        </div>
      </Placeholder>

      {/* 영업 지역 – 원본 "영업망 안내" 배너 내용을 페이지 안으로 */}
      <div className="mt-[20px] w-[730px] border border-[#e5e5e5] bg-[#fafafa] px-[12px] py-[10px] text-[12px] leading-[20px] text-[#666]">
        <b className="text-[#1c5aa8]">영업 지역</b>
        <br />
        경기권(성남/분당/수원/안양/안산/의정부/일산/평택/오산/화성/천안 등), 서울 전지역
        <br />
        지역에 따라 차량 인수 방법이 다를 수 있습니다. 자세한 사항은 전화로 확인해 주세요.
      </div>

      <div className="mt-[20px] flex w-[730px] justify-center">
        <CallCtaButton />
      </div>
    </SubPageLayout>
  );
}
