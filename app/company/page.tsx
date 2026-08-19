import type { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/menu";

/**
 * 회사소개 페이지 (원본 /default/sub_01/sub_01_01.php)
 *
 * 원본 콘텐츠는 인사말이 통째로 들어간 이미지 한 장(infor_img.jpg 730x399)뿐이다.
 * 이미지 안의 텍스트를 그대로 옮겨 플레이스홀더 안에 실제 텍스트로 렌더링한다.
 *  - 제목: 파란색(#2674BE) 22px 굵게 「"안녕하세요 비트대부 입니다"」
 *  - 본문: 진회색(#535353) 13px, 문장마다 줄바꿈, 약 45px 들여쓰기
 *  - "비트대부" 는 빨간색(#D00000) 굵게 강조
 *  - 우측 하단 서명 「- 비트대부 임직원 일동 -」
 * 인터랙션: 없음
 *
 * (원본의 사이드바는 실수로 "빠른상담신청" 사이드바(title_04.gif)를 보여주고 있었으나,
 *  여기서는 회사소개 섹션 사이드바로 정정했다.)
 */
export const metadata: Metadata = { title: `회사소개 - ${SITE.name}` };

export default function CompanyPage() {
  return (
    <SubPageLayout sectionId="company" title="회사소개">
      <Placeholder width={730} height={399} note="infor_img.jpg" tone="none" align="left">
        <div className="w-full pl-[20px] pr-[20px] text-[13px] leading-[35px] text-[#535353]">
          <h3 className="mb-[6px] text-[22px] font-bold leading-[40px] text-[#2674BE]">“안녕하세요 {SITE.name} 입니다”</h3>
          <div className="pl-[45px]">
            <p>{SITE.name} 홈페이지를 방문해주신 고객 여러분께 감사드립니다.</p>
            <p>저희 회사는 오랜기간 경험을 바탕으로 구성된 대출 전문가들로 구성되어 있습니다.</p>
            <p>
              신속하고 정확한 서비스로 고객님들의 고충을 최대한 맞춰드리기 위해 노력하고 있으며, 안심하고
              <br />
              대출서비스를 받으실 수 있게 설립된 회사입니다
            </p>
            <p>
              또한 저희 <strong className="text-[16px] font-bold text-[#D00000]">“{SITE.name}”</strong> 는 타업체와 다른
              서비스를 약속드리며, 고객님의 대출에 대한 고민을
              <br />
              해결 해 나갈수 있도록 도와드리겠습니다.
            </p>
            <p>감사합니다.</p>
          </div>
          <p className="pr-[40px] text-right">- {SITE.name} 임직원 일동 -</p>
        </div>
      </Placeholder>
    </SubPageLayout>
  );
}
