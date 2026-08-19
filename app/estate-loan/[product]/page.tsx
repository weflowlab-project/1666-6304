import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageLayout from "@/components/layout/SubPageLayout";
import LoanConditions from "@/components/loan/LoanConditions";
import { LOAN_PAGES } from "@/lib/loans";
import { SITE } from "@/lib/menu";

/**
 * 부동산담보대출 상품 페이지 (동적 라우트)
 *
 *   /estate-loan/mortgage  ← 원본 /default/sub_03/sub_03_01.php  부동산담보대출
 *   /estate-loan/deposit   ← 원본 /default/sub_03/sub_03_02.php  전월세보증대출
 *
 * 자동차대출과 동일한 템플릿(제목 → 조건표 → 대출신청하기 버튼). 원본에서 두 페이지의 조건표는
 * 완전히 같은 내용(복사본)이었고, 부제 카피도 자동차용("차만 있으시면…")을 그대로 쓰고 있었다.
 */
const ESTATE_PRODUCTS = ["mortgage", "deposit"] as const;

export function generateStaticParams() {
  return ESTATE_PRODUCTS.map((product) => ({ product }));
}

export async function generateMetadata({ params }: PageProps<"/estate-loan/[product]">): Promise<Metadata> {
  const { product } = await params;
  const page = LOAN_PAGES[product];
  return { title: page ? `${page.title} | 부동산담보대출 - ${SITE.name}` : SITE.title };
}

export default async function EstateLoanPage({ params }: PageProps<"/estate-loan/[product]">) {
  const { product } = await params;
  if (!(ESTATE_PRODUCTS as readonly string[]).includes(product)) notFound();
  const page = LOAN_PAGES[product];

  return (
    <SubPageLayout sectionId="estate-loan" title={page.title}>
      <LoanConditions page={page} />
    </SubPageLayout>
  );
}
