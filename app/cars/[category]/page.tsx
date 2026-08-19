import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageLayout from "@/components/layout/SubPageLayout";
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
 * 원본 구조(사이드바 + 파란 테두리 콘텐츠 박스 + 2열 표 + 하단 CTA 버튼)를 유지하고,
 * 표에 담기는 항목만 대출 조건 → 차량 정보로 교체했다.
 *
 * 변경 이력
 *   · 차량 사진 자리표시(180x120 점선 박스)를 제거했다. 오류 화면처럼 보인다는 지적이 있었고,
 *     대체 박스나 "사진 없음" 문구도 넣지 않는다. 실제 사진이 준비되면 그때 이미지를 추가한다.
 *   · 본문 고정폭 730px → w-full. 모바일에서 축소된 PC 화면이 보이던 문제를 없앴다.
 *     차량 한 대 = 폭 전체를 쓰는 카드 한 장이고, 표 내부 2열은 InfoTable 이 640px 미만에서 알아서 쌓는다.
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
      <div className="w-full">
        {/* 차급 설명 */}
        <p className="mb-[14px] text-[13px] leading-[1.7] text-[#666]">{data.description}</p>

        {/* 차량 목록 – 차량 1대당 카드 한 장(제목 + 정보표). 폭은 부모에 맞춰 늘어난다 */}
        {data.cars.map((car) => (
          <article key={car.name} className="mb-[20px] w-full">
            {/* 차종명 – 원본 서브 페이지의 "- 소제목" 스타일. 모바일에서 한 단계 작게 */}
            <h3 className="m-0 mb-[5px] text-[13px] font-bold text-black sm:text-[14px]">- {car.name}</h3>
            <InfoTable
              rows={[
                { label: "승차 인원", value: [`${car.seats}인승`] },
                { label: "연료 / 변속", value: [`${car.fuel} / ${car.transmission}`] },
                { label: "주요 옵션", value: [car.options.join(", ") || "-"] },
                // 요금 비공개 – 금액 대신 전화 안내
                { label: "대여 요금", value: ["이용 기간과 보험 조건에 따라 달라집니다. 전화로 안내해 드립니다."] },
              ]}
            />
          </article>
        ))}

        {/* 안내 문구 – 보유 현황이 수시로 바뀌므로 확정 재고처럼 보이지 않게 완충 */}
        <div className="mb-[20px] w-full rounded-[4px] border border-[#e5e5e5] bg-[#fafafa] px-[12px] py-[10px] text-[12px] leading-[20px] text-[#666]">
          보유 차량은 수시로 변동되며, 표시된 차량이 대여 중일 수 있습니다. 이용 예정일과 희망 차종을 말씀해 주시면
          가능한 차량을 확인해 드립니다.
        </div>

        {/* 하단 CTA – 원본 "대출신청하기" 버튼 자리 (버튼 자체가 max-w-full max-w-[280px] 로 폭을 제한한다) */}
        <div className="flex justify-center">
          <CallCtaButton />
        </div>
      </div>
    </SubPageLayout>
  );
}
