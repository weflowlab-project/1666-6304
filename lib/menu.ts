/**
 * 사이트 전체 메뉴(사이트맵) 정의
 *
 * 원본 사이트(1666-6304.com, 카페24 빌더)는 상단 메뉴가 통이미지(top_menu_img.gif 1000x84) +
 * <map> 이미지맵으로 구현되어 있었다. 이미지맵 좌표를 실제 링크로 옮긴 것이 이 데이터다.
 * 레이아웃(1행 파란 메뉴바 + 2행 서브메뉴, 좌측 사이드바 타이틀)은 원본 틀을 그대로 유지하고,
 * 업종 전환(대부업 → 렌터카)에 맞춰 메뉴 구성만 교체했다.
 *
 * [업종 전환 변경 내역]
 *   자동차대출 5종(개인차/법인차/수입차/설정할부/리스차) → 보유차량 4종(차급별)
 *   부동산담보대출 2종                                   → 삭제 (렌터카와 무관)
 *   빠른상담신청(폼)                                     → 삭제. 요금 비공개·전화 문의 정책이라 폼을 두지 않음
 *   고객센터 게시판 6종                                  → 자주묻는질문 1개.
 *       관리자 페이지를 만들지 않으므로 고객이 글을 쓰는 게시판은 운영 불가.
 *       (답변이 안 달리면 방치 인상 + 스팸 누적. 실제 원본 Q&A에 test 스팸 댓글이 쌓여 있었다)
 *       회사가 직접 쓰는 고정 문답만 정적 페이지로 남김.
 *   이용안내                                             → 신설. 요금을 공개하지 않는 대신
 *                                                          대여자격·보험·필요서류를 여기서 안내
 */

export type MenuItem = {
  /** 화면에 표시되는 메뉴명 */
  label: string;
  /** 새 사이트 경로 */
  href: string;
  /** 원본 사이트 경로 (참고용 – 대부업 시절 매핑) */
  original?: string;
};

export type MenuSection = MenuItem & {
  /** 섹션 식별자 (사이드바 타이틀 이미지 title_0X.gif 자리와 매칭) */
  id: "company" | "cars" | "guide" | "faq";
  /** 사이드바(좌측 190px) 타이틀 – 원본은 "자/동/차/대/출" 처럼 슬래시로 구분된 이미지 */
  sidebarTitle: string;
  /** 하위 메뉴 (좌측 메뉴 + 상단 2행 메뉴에 사용) */
  children: MenuItem[];
  /** 상단 메뉴 2행에 하위 메뉴를 노출할지 여부 (원본은 자동차대출·부동산담보대출만 노출했다) */
  showChildrenInHeader?: boolean;
};

export const SITE = {
  /** ⚠️ TODO: 상호 미정. 고객사에서 확정되면 이 값만 바꾸면 사이트 전체에 반영된다 */
  name: "ㅇㅇ렌트카",
  /** ⚠️ TODO: 슬로건 확정 시 교체 */
  slogan: "합리적인 가격의 렌터카",
  phone: "1666-6304",
  title: "안녕하세요! ㅇㅇ렌트카입니다!",

  /** 상담 가능 시간 – ⚠️ TODO: 실제 운영시간 확인 */
  hours: "평일 09:00 ~ 19:00 / 주말·공휴일 상담 가능",

  /**
   * 사업자 정보
   * ⚠️ 대부업 시절 정보(대부업 등록번호 2021-경기 평택-0010호, 대표자 신경애,
   *    사업자번호 642-90-01634)는 전부 지웠다. 렌터카 정보로 새로 확인받아야 한다.
   * ⚠️ 렌터카는 여객자동차 운수사업법상 "자동차대여사업 등록번호" 표기가 필요하다.
   */
  business: {
    address: "경기도 평택시 점촌로 23번길 24 102호", // ⚠️ TODO: 주소 확인
    ceo: "○○○", // ⚠️ TODO: 대표자명 확인
    regNo: "000-00-00000", // ⚠️ TODO: 사업자등록번호 확인
    rentalLicense: "○○시 제0000호", // ⚠️ TODO: 자동차대여사업 등록번호 확인
  },
} as const;

export const MENU: MenuSection[] = [
  {
    id: "company",
    label: "회사소개",
    href: "/company",
    original: "/default/sub_01/sub_01_01.php",
    sidebarTitle: "회/사/소/개",
    children: [{ label: "회사소개", href: "/company" }],
  },
  {
    id: "cars",
    label: "보유차량",
    href: "/cars/compact",
    // 원본 자동차대출 자리를 그대로 이어받는다 (상단 2행에 하위 메뉴 노출)
    original: "/default/sub_02/sub_02_01.php",
    sidebarTitle: "보/유/차/량",
    showChildrenInHeader: true,
    children: [
      { label: "경차·소형", href: "/cars/compact" },
      { label: "중형·대형", href: "/cars/sedan" },
      { label: "SUV·승합", href: "/cars/suv" },
      { label: "수입차", href: "/cars/imported" },
    ],
  },
  {
    id: "guide",
    label: "이용안내",
    href: "/guide",
    sidebarTitle: "이/용/안/내",
    children: [{ label: "이용안내", href: "/guide" }],
  },
  {
    id: "faq",
    label: "자주묻는질문",
    href: "/faq",
    original: "/default/sub_05/sub_05_02.php",
    sidebarTitle: "자/주/묻/는/질/문",
    children: [{ label: "자주묻는질문", href: "/faq" }],
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
