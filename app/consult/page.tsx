import type { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import ConsultForm from "@/components/forms/ConsultForm";
import { SITE } from "@/lib/menu";

/**
 * 빠른상담신청 페이지 (원본 /default/sub_04/sub_04_01.php)
 *
 * 콘텐츠 = 카페24 formmail #4 (신청인 / 연락처 / 차량명 / 차량연식 / 필요금액 / 기타(궁금사항) + 확인·취소 버튼)
 * 홈·서브 상단 "초간편 빠른신청" 배너와 대출 상품 페이지의 "대출신청하기" 버튼이 모두 이 페이지로 연결된다.
 * (원본의 사이드바는 실수로 자동차대출 첫 메뉴만 있는 title_02 사이드바를 보여줬으나 여기서는 정정)
 */
export const metadata: Metadata = { title: `빠른상담신청 - ${SITE.name}` };

export default function ConsultPage() {
  return (
    <SubPageLayout sectionId="consult" title="빠른상담신청">
      <ConsultForm />
    </SubPageLayout>
  );
}
