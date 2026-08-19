import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageLayout from "@/components/layout/SubPageLayout";
import Placeholder from "@/components/Placeholder";
import { InfoTable, CallCtaButton } from "@/components/table/InfoTable";
import { CAR_CATEGORIES, CAR_CATEGORY_IDS, isCarCategory } from "@/lib/cars";
import { SITE } from "@/lib/menu";

/**
 * 보유차량 – 차급별 페이지 (원본 자동차대출 상품 페이지의 틀을 그대로 사용)
 *
 *   /cars/compact   경차·소형    ← 원본 /default/sub_02/sub_02_01.php (개인차)
 *   /cars/sedan     중형·대형    ← 원본 sub_02_02.php (법인차)
 *   /cars/suv       SUV·승합     ← 원본 sub_02_03.php (수입차)
 *   /cars/imported  수입차       ← 원본 sub_02_05.php (리스차)
 *
 * 원본 구조(사이드바 + 파란 테두리 콘텐츠 박스 + 730px 2열 표 + 하단 CTA 버튼)를 유지하고,
 * 표에 담기는 항목만 대출 조건 → 차량 정보로 교체했다.
 *
 * ⚠️ 차량 목록은 전부 자리표시 데이터다 (lib/cars.ts).
 * ⚠️ 요금은 표에 넣지 않는다. 고객사 요청으로 요금 비공개 · 전화 문의 정책이다.
 */
export function generateStaticParams() {
  return CAR_CATEGORY_IDS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCarCategory(category)) return { title: SITE.title };
  return { title: `${CAR_CATEGORIES[category].title} | 보유차량 - ${SITE.name}` };
}

export default async function CarCategoryPage({ params }: PageProps<"/cars/[category]">) {
  const { category } = await params;
  if (!isCarCategory(category)) notFound();
  const data = CAR_CATEGORIES[category];

  return (
    <SubPageLayout sectionId="cars" title={data.title}>
      <div className="w-[730px]">
        {/* 차급 설명 */}
        <p className="mb-[14px] text-[12px] leading-[20px] text-[#666]">{data.description}</p>

        {/* 차량 목록 – 원본 조건표와 같은 격자 스타일로, 차량 1대당 사진 + 정보표 한 세트 */}
        {data.cars.map((car) => (
          <div key={car.name} className="mb-[20px]">
            <div className="mb-[3px] text-[13px] font-bold text-black">- {car.name}</div>
            <div className="flex items-start gap-[10px]">
              {/* 차량 사진 자리 – TODO: 실제 사진으로 교체 */}
              <div className="shrink-0">
                <Placeholder width={180} height={120} note={`${car.name} 사진`} tone="light">
                  <span className="text-[11px] text-[#888]">차량 사진</span>
                </Placeholder>
              </div>
              <div className="min-w-0 flex-1">
                <InfoTable
                  rows={[
                    { label: "승차 인원", value: [`${car.seats}인승`] },
                    { label: "연료 / 변속", value: [`${car.fuel} / ${car.transmission}`] },
                    { label: "주요 옵션", value: [car.options.join(", ") || "-"] },
                    // 요금 비공개 – 금액 대신 전화 안내
                    { label: "대여 요금", value: ["이용 기간과 보험 조건에 따라 달라집니다. 전화로 안내해 드립니다."] },
                  ]}
                />
              </div>
            </div>
          </div>
        ))}

        {/* 안내 문구 – 보유 현황이 수시로 바뀌므로 확정 재고처럼 보이지 않게 완충 */}
        <div className="mb-[20px] border border-[#e5e5e5] bg-[#fafafa] px-[12px] py-[10px] text-[12px] leading-[20px] text-[#666]">
          보유 차량은 수시로 변동되며, 표시된 차량이 대여 중일 수 있습니다. 이용 예정일과 희망 차종을 말씀해 주시면
          가능한 차량을 확인해 드립니다.
        </div>

        {/* 하단 CTA – 원본 "대출신청하기" 버튼 자리 */}
        <div className="flex justify-center">
          <CallCtaButton />
        </div>
      </div>
    </SubPageLayout>
  );
}
