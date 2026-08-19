/**
 * 대출 상품 페이지 콘텐츠 데이터 (자동차대출 5종 + 부동산담보대출 2종)
 *
 * 원본 페이지(sub_02_01~05, sub_03_01~02)의 조건표를 그대로 옮긴 것.
 * 모든 페이지가 같은 템플릿(제목 → 조건표 → "대출신청하기" 버튼)이므로 데이터만 분리했다.
 * 원문 오타("중도상환수수로", "당일지금")는 원본 그대로 유지했다 — 필요 시 수정.
 */

export type ConditionRow = {
  /** 좌측 항목명 (180px, 가운데 정렬, 굵게) */
  label: string;
  /** 우측 내용 – 배열 요소마다 줄바꿈(<br>) */
  value: string[];
};

export type ConditionSection = {
  /** 표 위 소제목 (예: "- 설정/할부차"). 없으면 생략 */
  subheading?: string;
  rows: ConditionRow[];
};

export type LoanPage = {
  /** 콘텐츠 박스 제목 */
  title: string;
  /** 원본 경로 */
  original: string;
  sections: ConditionSection[];
};

/** 자동차대출 공통 행 (개인차 기준) */
const CAR_COMMON = {
  target: { label: "대상", value: ["만 20세 ~"] },
  regionA: { label: "지역", value: ["서울, 경기, 인천, 수원 - 출장가능"] },
  regionB: { label: "지역", value: ["서울, 경기, 인천, 수원 - 출장가능(출장비無)"] },
  qualification: {
    label: "신청자격",
    value: ["개인명의 자동차를 소유한 누구나 가능(설정 및 할부차량 가능, 타사대납 및 연체차 가능)"],
  },
  limit: { label: "대출한도", value: ["중고차 시세 90% ~ 120%"] },
  rate: { label: "대출금리", value: ["월 1% ~ 1.6%"] },
  fee: { label: "수수료", value: ["無(단, 설정비, 공증비등 대출실비는 고객님 부담)"] },
  period: { label: "대출기간", value: ["고객 자유선택(연장가능)"] },
  repay: {
    label: "상환방법",
    value: ["고객 내맘대로 상환방식, 만기일시상환, 원리금 균등분할상환", "원금수시상환, 중도상환(중도상환수수로 無)", "원리금균등"],
  },
  payout: { label: "대출금지급방법", value: ["당일지급 - 고객님이 원하시는 계좌로 송금 or 현금지급"] },
  extraEmpty: { label: "추가구비서류", value: [""] },
} satisfies Record<string, ConditionRow>;

export const LOAN_PAGES: Record<string, LoanPage> = {
  /* ── 자동차대출 ── */
  personal: {
    title: "개인차",
    original: "/default/sub_02/sub_02_01.php",
    sections: [
      {
        rows: [
          CAR_COMMON.target,
          CAR_COMMON.regionA,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          CAR_COMMON.repay,
          CAR_COMMON.payout,
          { label: "기본구비서류", value: ["인감3통, 등본1통, 원초본1통, 신분증, 인감도장,", "자동차등록증원본"] },
          CAR_COMMON.extraEmpty,
        ],
      },
    ],
  },
  corporate: {
    title: "법인차",
    original: "/default/sub_02/sub_02_02.php",
    sections: [
      {
        rows: [
          { label: "대상", value: ["만 20세"] },
          CAR_COMMON.regionB,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          CAR_COMMON.repay,
          CAR_COMMON.payout,
          {
            label: "기본구비서류",
            // 원본은 &nbsp; 로 들여쓰기한 2케이스 4줄 – 줄바꿈으로만 재현
            value: [
              "대표이사 본인이 오는 경우 : 인감3통, 등본1통, 원초본1통, 신분증, 인감도장",
              "　　　　　　　　　　　　　자동차등록증원본, 등록원부(갑,을)",
              "대리인(직원)이 오는 경우 : 대리인 인감3통, 등본1통, 원초본1통,",
              "　　　　　　　　　　　　　대리인 신분증과 재직증명서와 위임장이 첨부되어야 합니다.",
            ],
          },
          { label: "추가구비서류", value: ["사업자등록증사본, 법인인감3통, 등기부등본2통, 법인인감도장"] },
        ],
      },
    ],
  },
  imported: {
    title: "수입차",
    original: "/default/sub_02/sub_02_03.php",
    sections: [
      {
        rows: [
          CAR_COMMON.target,
          CAR_COMMON.regionB,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          CAR_COMMON.repay,
          CAR_COMMON.payout,
          { label: "기본구비서류", value: ["인감3통, 등본1통, 원초본1통, 신분증, 인감도장", "자동차등록증원본"] },
          CAR_COMMON.extraEmpty,
        ],
      },
    ],
  },
  installment: {
    title: "설정/할부/타사대납차",
    original: "/default/sub_02/sub_02_04.php",
    sections: [
      {
        subheading: "- 설정/할부차",
        rows: [
          CAR_COMMON.target,
          CAR_COMMON.regionB,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          CAR_COMMON.repay,
          CAR_COMMON.payout,
          { label: "기본구비서류", value: ["인감3통, 등본1통, 원초본1통, 신분증, 인감도장, 보조키", "자동차등록증원본"] },
          CAR_COMMON.extraEmpty,
        ],
      },
      {
        subheading: "- 타사대납차",
        rows: [
          { label: "대상", value: ["만 20세 ~ 만 55세"] },
          CAR_COMMON.regionB,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          {
            label: "상환방법",
            value: [
              "고객 내맘대로 상환방식, 만기일시상환, 원리금 균등분할상환",
              "원금수시상환, 중도상환(중도상환수수로 無)",
              "원리금균등 or 수시 상환시 이자 감면혜택",
            ],
          },
          { label: "대출금지급방법", value: ["당일지금 - 고객님이 원하시는 계좌로 송금 or 현금지급"] },
          {
            label: "기본구비서류",
            value: ["인감3통, 등본1통, 원초본1통, 신분증, 인감도장, 보조키", "자동차등록증원본, 등록원부(갑,을)"],
          },
          CAR_COMMON.extraEmpty,
        ],
      },
    ],
  },
  lease: {
    title: "리스차",
    original: "/default/sub_02/sub_02_05.php",
    sections: [
      {
        rows: [
          CAR_COMMON.target,
          CAR_COMMON.regionB,
          CAR_COMMON.qualification,
          CAR_COMMON.limit,
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          CAR_COMMON.repay,
          CAR_COMMON.payout,
          { label: "기본구비서류", value: ["인감3통, 등본1통, 원초본1통, 신분증, 인감도장, 보조키", "자동차등록증원본"] },
          { label: "추가구비서류", value: ["리스계약서 원본, 리스대금 납부내역서"] },
        ],
      },
    ],
  },

  /* ── 부동산담보대출 ── */
  mortgage: {
    title: "부동산담보대출",
    original: "/default/sub_03/sub_03_01.php",
    sections: [
      {
        rows: [
          { label: "대상", value: ["만 20세 ~ 만 55세"] },
          CAR_COMMON.regionB,
          { label: "신청자격", value: ["아파트, 빌라, 다세대, 단독주택, 임야, 전, 답, 나대지 등을 소유하고 계신 고객"] },
          { label: "대출한도", value: ["현시세 50% ~ 100% (물건에 따라 차등 적용)"] },
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          { label: "상환방법", value: ["장기분할상환 및 중도금상환가능"] },
          {
            label: "기본구비서류",
            value: ["주민등록등본1통,주민등록원초본1통(전 주소가 표시된것), 인감3통,등기필증", "인감도장, 신분증"],
          },
        ],
      },
    ],
  },
  deposit: {
    // 원본 sub_03_02 는 sub_03_01 과 조건표가 완전히 동일(복사본) – 내용 검토 필요
    title: "전월세보증대출",
    original: "/default/sub_03/sub_03_02.php",
    sections: [
      {
        rows: [
          { label: "대상", value: ["만 20세 ~ 만 55세"] },
          CAR_COMMON.regionB,
          { label: "신청자격", value: ["아파트, 빌라, 다세대, 단독주택, 임야, 전, 답, 나대지 등을 소유하고 계신 고객"] },
          { label: "대출한도", value: ["현시세 50% ~ 100% (물건에 따라 차등 적용)"] },
          CAR_COMMON.rate,
          CAR_COMMON.fee,
          CAR_COMMON.period,
          { label: "상환방법", value: ["장기분할상환 및 중도금상환가능"] },
          {
            label: "기본구비서류",
            value: ["주민등록등본1통,주민등록원초본1통(전 주소가 표시된것), 인감3통,등기필증", "인감도장, 신분증"],
          },
        ],
      },
    ],
  },
};
