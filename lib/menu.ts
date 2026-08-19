/**
 * 사이트 전체 메뉴(사이트맵) 정의
 *
 * 원본 사이트(1666-6304.com, 카페24 빌더)는 상단 메뉴가 통이미지(top_menu_img.gif 1000x84) +
 * <map> 이미지맵으로 구현되어 있었다. 이미지맵 좌표를 실제 링크로 옮긴 것이 아래 데이터다.
 *
 *  - 1행(파란 바): 회사소개 / 자동차대출 / 부동산담보대출 / 빠른상담신청 / 고객센터
 *  - 2행(흰 배경): 개인차 법인차 수입차 설정/할부/타사대납차 리스차 | 부동산담보대출 전월세 보증대출
 *
 * 원본 PHP 경로 → 새 Next.js 경로 매핑은 `original` 필드에 남겨두었다.
 */

export type MenuItem = {
  /** 화면에 표시되는 메뉴명 */
  label: string;
  /** 새 사이트 경로 */
  href: string;
  /** 원본 사이트 경로 (참고용) */
  original?: string;
};

export type MenuSection = MenuItem & {
  /** 섹션 식별자 (사이드바 타이틀 이미지 title_0X.gif 와 매칭) */
  id: "company" | "car-loan" | "estate-loan" | "consult" | "support";
  /** 사이드바(좌측 190px) 타이틀 – 원본은 "자/동/차/대/출" 처럼 슬래시로 구분된 이미지 */
  sidebarTitle: string;
  /** 하위 메뉴 (좌측 메뉴 + 상단 2행 메뉴에 사용) */
  children: MenuItem[];
  /** 상단 메뉴 2행에 하위 메뉴를 노출할지 여부 (원본은 자동차대출·부동산담보대출만 노출) */
  showChildrenInHeader?: boolean;
};

export const SITE = {
  /** 상호 – 원본 <title>은 "안녕하세요! 비트대부 금융입니다!" (일부 페이지는 구 상호 "신성투자금융") */
  name: "비트대부",
  slogan: "자동차 전문 대출 기업",
  phone: "1666-6304",
  title: "안녕하세요! 비트대부 금융입니다!",
} as const;

export const MENU: MenuSection[] = [
  {
    id: "company",
    label: "회사소개",
    href: "/company",
    original: "/default/sub_01/sub_01_01.php",
    sidebarTitle: "회/사/소/개",
    children: [
      { label: "회사소개", href: "/company", original: "/default/sub_01/sub_01_01.php" },
    ],
  },
  {
    id: "car-loan",
    label: "자동차대출",
    href: "/car-loan/personal",
    original: "/default/sub_02/sub_02_01.php",
    sidebarTitle: "자/동/차/대/출",
    showChildrenInHeader: true,
    children: [
      { label: "개인차", href: "/car-loan/personal", original: "/default/sub_02/sub_02_01.php" },
      { label: "법인차", href: "/car-loan/corporate", original: "/default/sub_02/sub_02_02.php" },
      { label: "수입차", href: "/car-loan/imported", original: "/default/sub_02/sub_02_03.php" },
      {
        label: "설정/할부/타사대납차",
        href: "/car-loan/installment",
        original: "/default/sub_02/sub_02_04.php",
      },
      { label: "리스차", href: "/car-loan/lease", original: "/default/sub_02/sub_02_05.php" },
    ],
  },
  {
    id: "estate-loan",
    label: "부동산담보대출",
    href: "/estate-loan/mortgage",
    original: "/default/sub_03/sub_03_01.php",
    sidebarTitle: "부/동/산/담/보/대/출",
    showChildrenInHeader: true,
    children: [
      {
        label: "부동산담보대출",
        href: "/estate-loan/mortgage",
        original: "/default/sub_03/sub_03_01.php",
      },
      {
        label: "전월세보증대출",
        href: "/estate-loan/deposit",
        original: "/default/sub_03/sub_03_02.php",
      },
    ],
  },
  {
    id: "consult",
    label: "빠른상담신청",
    href: "/consult",
    original: "/default/sub_04/sub_04_01.php",
    sidebarTitle: "빠/른/상/담/신/청",
    children: [{ label: "빠른상담신청", href: "/consult", original: "/default/sub_04/sub_04_01.php" }],
  },
  {
    id: "support",
    label: "고객센터",
    href: "/support/qna",
    original: "/default/sub_05/sub_05_03.php",
    sidebarTitle: "고/객/센/터",
    children: [
      { label: "공지사항", href: "/support/notice", original: "/default/sub_05/sub_05_01.php" },
      { label: "자주하는 질문", href: "/support/faq", original: "/default/sub_05/sub_05_02.php" },
      { label: "고객상담 Q&A", href: "/support/qna", original: "/default/sub_05/sub_05_03.php" },
      { label: "대출진행현황", href: "/support/progress", original: "/default/sub_05/sub_05_04.php" },
      { label: "업무제휴", href: "/support/partnership", original: "/default/sub_05/sub_05_05.php" },
      { label: "자유게시판", href: "/support/free", original: "/default/sub_05/sub_05_06.php" },
    ],
  },
];

/** 섹션 id 로 메뉴 섹션 찾기 */
export function getSection(id: MenuSection["id"]) {
  return MENU.find((m) => m.id === id)!;
}

/** 현재 경로가 어느 섹션/하위메뉴에 속하는지 찾기 (사이드바 활성 표시용) */
export function findMenuByPath(pathname: string) {
  for (const section of MENU) {
    for (const child of section.children) {
      if (pathname === child.href || pathname.startsWith(child.href + "/")) {
        return { section, child };
      }
    }
  }
  return null;
}
