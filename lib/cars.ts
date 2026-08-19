/**
 * 보유차량 데이터 (차급별)
 *
 * ⚠️ 전부 자리표시 데이터입니다.
 *    고객사에서 실제 보유 차량 목록(차종 · 연식 · 사진)을 받으면 이 파일만 교체하면 됩니다.
 *
 * ⚠️ 요금 비공개 정책
 *    고객사 요청으로 요금은 사이트에 노출하지 않고 전화 문의로만 안내합니다.
 *    그래서 차량 카드에는 금액 필드가 없고, 대신 "전화로 견적 문의" 버튼이 들어갑니다.
 *    나중에 요금을 공개하기로 바뀌면 Car 타입에 price 필드를 추가하면 됩니다.
 */

export type CarCategoryId = "compact" | "sedan" | "suv" | "imported";

export type Car = {
  /** 차종명 – TODO: 실제 보유 차량으로 교체 */
  name: string;
  /** 승차 인원 */
  seats: number;
  /** 연료 */
  fuel: "가솔린" | "디젤" | "LPG" | "하이브리드" | "전기";
  /** 변속기 */
  transmission: "자동" | "수동";
  /** 주요 옵션 (카드에 태그로 표시) */
  options: string[];
};

export type CarCategory = {
  id: CarCategoryId;
  /** 메뉴/탭에 쓰는 짧은 이름 */
  label: string;
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 – 어떤 고객에게 맞는 차급인지 */
  description: string;
  cars: Car[];
};

export const CAR_CATEGORIES: Record<CarCategoryId, CarCategory> = {
  compact: {
    id: "compact",
    label: "경차 · 소형",
    title: "경차 · 소형",
    description:
      "유지비 부담이 가장 적은 차급입니다. 출퇴근이나 근거리 이동, 초보 운전자분께 적합합니다.",
    cars: [
      { name: "경차 A", seats: 4, fuel: "가솔린", transmission: "자동", options: ["후방카메라", "블루투스"] },
      { name: "경차 B", seats: 4, fuel: "가솔린", transmission: "자동", options: ["후방카메라", "열선시트"] },
      { name: "소형 세단 A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["내비게이션", "후방카메라"] },
      { name: "소형 SUV A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["내비게이션", "크루즈컨트롤"] },
    ],
  },
  sedan: {
    id: "sedan",
    label: "중형 · 대형",
    title: "중형 · 대형 세단",
    description: "장거리 주행과 비즈니스 미팅에 적합한 차급입니다. 승차감과 정숙성을 중시하는 분께 권해드립니다.",
    cars: [
      { name: "중형 세단 A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["내비게이션", "통풍시트"] },
      { name: "중형 세단 B", seats: 5, fuel: "하이브리드", transmission: "자동", options: ["내비게이션", "통풍시트", "썬루프"] },
      { name: "대형 세단 A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["통풍시트", "전동시트", "썬루프"] },
    ],
  },
  suv: {
    id: "suv",
    label: "SUV · 승합",
    title: "SUV · 승합차",
    description: "가족 여행, 단체 이동, 짐이 많은 일정에 적합합니다. 9인승 이상은 별도 문의 주시면 안내해 드립니다.",
    cars: [
      { name: "중형 SUV A", seats: 5, fuel: "디젤", transmission: "자동", options: ["4WD", "내비게이션"] },
      { name: "대형 SUV A", seats: 7, fuel: "디젤", transmission: "자동", options: ["4WD", "전동시트", "썬루프"] },
      { name: "승합차 A", seats: 9, fuel: "디젤", transmission: "자동", options: ["후방카메라", "듀얼에어컨"] },
      { name: "승합차 B", seats: 11, fuel: "디젤", transmission: "자동", options: ["후방카메라", "듀얼에어컨"] },
    ],
  },
  imported: {
    id: "imported",
    label: "수입차",
    title: "수입차",
    description: "상견례, 결혼식, 중요한 미팅 등 특별한 일정에 이용하시는 분이 많습니다. 보유 현황이 자주 바뀌니 전화로 확인해 주세요.",
    cars: [
      { name: "수입 세단 A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["통풍시트", "썬루프"] },
      { name: "수입 세단 B", seats: 5, fuel: "디젤", transmission: "자동", options: ["통풍시트", "전동시트"] },
      { name: "수입 SUV A", seats: 5, fuel: "가솔린", transmission: "자동", options: ["4WD", "파노라마루프"] },
    ],
  },
};

export const CAR_CATEGORY_IDS = Object.keys(CAR_CATEGORIES) as CarCategoryId[];

export function isCarCategory(id: string): id is CarCategoryId {
  return id in CAR_CATEGORIES;
}
