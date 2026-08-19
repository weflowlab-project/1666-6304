import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageLayout from "@/components/layout/SubPageLayout";
import LoanConditions from "@/components/loan/LoanConditions";
import { LOAN_PAGES } from "@/lib/loans";
import { SITE } from "@/lib/menu";

/**
 * 자동차대출 상품 페이지 (동적 라우트)
 *
 *   /car-loan/personal     ← 원본 /default/sub_02/sub_02_01.php  개인차
 *   /car-loan/corporate    ← 원본 /default/sub_02/sub_02_02.php  법인차
 *   /car-loan/imported     ← 원본 /default/sub_02/sub_02_03.php  수입차
 *   /car-loan/installment  ← 원본 /default/sub_02/sub_02_04.php  설정/할부/타사대납차
 *   /car-loan/lease        ← 원본 /default/sub_02/sub_02_05.php  리스차
 *
 * 5개 페이지가 완전히 같은 템플릿(제목 → 조건표 → 대출신청하기 버튼)이라 데이터(lib/loans.ts)만 바꿔 렌더링한다.
 */
const CAR_PRODUCTS = ["personal", "corporate", "imported", "installment", "lease"] as const;

export function generateStaticParams() {
  return CAR_PRODUCTS.map((product) => ({ product }));
}

export async function generateMetadata({ params }: PageProps<"/car-loan/[product]">): Promise<Metadata> {
  const { product } = await params;
  const page = LOAN_PAGES[product];
  return { title: page ? `${page.title} | 자동차대출 - ${SITE.name}` : SITE.title };
}

export default async function CarLoanPage({ params }: PageProps<"/car-loan/[product]">) {
  const { product } = await params;
  if (!(CAR_PRODUCTS as readonly string[]).includes(product)) notFound();
  const page = LOAN_PAGES[product];

  return (
    <SubPageLayout sectionId="car-loan" title={page.title}>
      <LoanConditions page={page} />
    </SubPageLayout>
  );
}
