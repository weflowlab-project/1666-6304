/**
 * 고객센터 게시판 정의 + 샘플 데이터 (원본: 카페24 "컴포넌트 게시판", 일반형 리스트 스킨)
 *
 * 원본 사이트의 고객센터(sub_05_0X.php)는 6개 페이지 모두 카페24 게시판 컴포넌트를 붙여 놓은 것으로,
 * `com_board_id` 값만 다르고 마크업/CSS/버튼 이미지는 사실상 동일하다.
 *
 *   /default/sub_05/sub_05_01.php  공지사항      com_board_id=5   → /support/notice
 *   /default/sub_05/sub_05_02.php  자주하는 질문  com_board_id=12  → /support/faq
 *   /default/sub_05/sub_05_03.php  고객상담 Q&A   com_board_id=8   → /support/qna
 *   /default/sub_05/sub_05_04.php  대출진행현황   com_board_id=9   → /support/progress
 *   /default/sub_05/sub_05_05.php  업무제휴      com_board_id=10  → /support/partnership
 *   /default/sub_05/sub_05_06.php  자유게시판    com_board_id=11  → /support/free
 *
 * 원본 URL 파라미터(참고)
 *   목록   : ?com_board_page=N&com_board_search_code=subject|description|writer&com_board_search_value=키워드
 *   읽기   : ?com_board_basic=read_form&com_board_idx={idx}&com_board_id={ID}
 *   글쓰기 : ?com_board_basic=write_form&com_board_id={ID}
 *   답글   : ?com_board_basic=reply_form&com_board_idx={idx}&com_board_id={ID}
 * 새 사이트에서는
 *   목록   : /support/{board}?page=N&searchType=subject&keyword=키워드
 *   읽기   : /support/{board}/{idx}          ← idx = 원본 com_board_idx
 *   글쓰기 : /support/{board}/write            (답글: /support/{board}/write?reply={idx})
 *
 * 이 파일은 서버/클라이언트 컴포넌트 양쪽에서 import 되므로 순수 데이터/함수만 둔다.
 */

/** 게시판 식별자 (URL 세그먼트) */
export type BoardId = "notice" | "faq" | "qna" | "progress" | "partnership" | "free";

/** 목록 컬럼 종류 */
export type ColumnKey = "no" | "title" | "writer" | "date" | "views";

/** 검색 구분 값 (원본 select name=com_board_search_code 의 option value) */
export type SearchType = "subject" | "description" | "writer";

/** 읽기 화면 메타 행 종류 */
export type MetaKey = "title" | "writer" | "date" | "views";

/** 글쓰기 폼 필드 종류 (원본 폼의 input name 기준) */
export type WriteField =
  | "writer" // 작성자
  | "password" // 비밀번호
  | "email" // 이메일 (자유게시판만)
  | "subject" // 제목
  | "receiveMail" // 답변메일받기 체크박스 (자유게시판만)
  | "description" // 내용 (원본은 NNEditor 400px)
  | "secret"; // 비밀글 체크박스 (자주하는 질문만)

export type BoardConfig = {
  id: BoardId;
  /** 콘텐츠 박스 제목 */
  title: string;
  /** 원본 카페24 com_board_id */
  comBoardId: number;
  /** 원본 페이지 경로 */
  originalPath: string;
  /** 새 사이트 목록 경로 */
  href: string;
  /** 목록 컬럼 순서 (공지사항만 작성일자가 작성자보다 앞) */
  columns: ColumnKey[];
  /** 검색 구분 옵션 (빈 배열이면 검색폼 자체를 렌더링하지 않음 – 자주하는 질문) */
  searchOptions: { value: SearchType; label: string }[];
  /** 글쓰기 가능 여부 (공지사항은 write_auth=2 관리자 전용 → 버튼 없음, 직접 접근 시 alert) */
  canWrite: boolean;
  /** 읽기 화면에 댓글 폼/목록 표시 */
  hasComments: boolean;
  /** 읽기 화면에 추천하기 버튼 표시 (board 9/10/11 계열) */
  hasRecommend: boolean;
  /** 읽기 화면에 삭제/답글쓰기 버튼 표시 */
  hasDeleteReply: boolean;
  /** 읽기 화면 메타 행 – 본문 위 */
  readMetaBefore: MetaKey[];
  /** 읽기 화면 메타 행 – 본문 아래 (공지사항은 작성일자가 본문 아래에 옴) */
  readMetaAfter: MetaKey[];
  /** 글쓰기 폼 필드 순서 */
  writeFields: WriteField[];
  /** 페이지당 글 수 */
  perPage: number;
};

/** 댓글 */
export type Comment = {
  name: string;
  text: string;
  /** YYYY-MM-DD HH:MM:SS */
  time: string;
};

/** 게시글 */
export type Post = {
  /** 원본 com_board_idx (URL 에 사용, 게시판 내 유일) */
  idx: number;
  /** 목록 번호 (내림차순 – 최신글이 가장 큰 번호) */
  no: number;
  title: string;
  writer: string;
  /** YYYY-MM-DD */
  date: string;
  views: number;
  /** 본문 HTML (원본 #post_area 내용 그대로) */
  body: string;
  comments: Comment[];
};

/* ------------------------------------------------------------------ */
/* 공통 상수                                                             */
/* ------------------------------------------------------------------ */

/** 검색 옵션 – 제목/내용/작성자 (공지사항은 제목만) */
const SEARCH_ALL: BoardConfig["searchOptions"] = [
  { value: "subject", label: "제목" },
  { value: "description", label: "내용" },
  { value: "writer", label: "작성자" },
];
const SEARCH_SUBJECT_ONLY: BoardConfig["searchOptions"] = [{ value: "subject", label: "제목" }];

/** 일반 게시판 컬럼: 번호 | 제목 | 작성자 | 작성일자 | 조회수 */
const COLS_DEFAULT: ColumnKey[] = ["no", "title", "writer", "date", "views"];
/** 공지사항 컬럼: 번호 | 제목 | 작성일자 | 작성자 | 조회수 (작성일자가 먼저) */
const COLS_NOTICE: ColumnKey[] = ["no", "title", "date", "writer", "views"];

/** 컬럼 헤더 라벨 */
export const COLUMN_LABELS: Record<ColumnKey, string> = {
  no: "번호",
  title: "제목",
  writer: "작성자",
  date: "작성일자",
  views: "조회수",
};

/** 읽기 화면 라벨 */
export const META_LABELS: Record<MetaKey, string> = {
  title: "제목",
  writer: "작성자",
  date: "작성일자",
  views: "조회수",
};

/** 글쓰기 폼 필드 라벨 (원본 FormCheck 의 msg 값 – alert 문구에도 그대로 쓰임) */
export const WRITE_FIELD_LABELS: Record<WriteField, string> = {
  writer: "작성자",
  password: "비밀번호",
  email: "이메일",
  subject: "제목",
  receiveMail: "답변메일받기",
  description: "내용",
  secret: "비밀글",
};

/* ------------------------------------------------------------------ */
/* 게시판 설정                                                           */
/* ------------------------------------------------------------------ */

export const BOARDS: Record<BoardId, BoardConfig> = {
  // 공지사항 (board 5) – 관리자만 쓰기, 제목 검색만, 읽기 화면은 제목/본문/작성일자만
  notice: {
    id: "notice",
    title: "공지사항",
    comBoardId: 5,
    originalPath: "/default/sub_05/sub_05_01.php",
    href: "/support/notice",
    columns: COLS_NOTICE,
    searchOptions: SEARCH_SUBJECT_ONLY,
    canWrite: false,
    hasComments: false,
    hasRecommend: false,
    hasDeleteReply: false,
    readMetaBefore: ["title"],
    readMetaAfter: ["date"],
    writeFields: ["writer", "password", "subject", "description"],
    perPage: 10,
  },
  // 자주하는 질문 (board 12) – 아코디언이 아닌 일반 리스트, 검색폼 없음, 비밀글 옵션 있는 글쓰기, 글 0개
  faq: {
    id: "faq",
    title: "자주하는 질문",
    comBoardId: 12,
    originalPath: "/default/sub_05/sub_05_02.php",
    href: "/support/faq",
    columns: COLS_DEFAULT,
    searchOptions: [],
    canWrite: true,
    hasComments: true,
    hasRecommend: false,
    hasDeleteReply: true,
    readMetaBefore: ["title", "writer", "date", "views"],
    readMetaAfter: [],
    writeFields: ["writer", "password", "subject", "description", "secret"],
    perPage: 10,
  },
  // 고객상담 Q&A (board 8) – 글 2개, 댓글 있음, 삭제/답글쓰기/글쓰기
  qna: {
    id: "qna",
    title: "고객상담 Q&A",
    comBoardId: 8,
    originalPath: "/default/sub_05/sub_05_03.php",
    href: "/support/qna",
    columns: COLS_DEFAULT,
    searchOptions: SEARCH_ALL,
    canWrite: true,
    hasComments: true,
    hasRecommend: false,
    hasDeleteReply: true,
    readMetaBefore: ["title", "writer", "date", "views"],
    readMetaAfter: [],
    writeFields: ["writer", "password", "subject", "description"],
    perPage: 10,
  },
  // 대출진행현황 (board 9) – 글 162개(17페이지), 본문은 전부 비어 있는 "제목 티커" 성격, 추천하기 버튼 있음
  progress: {
    id: "progress",
    title: "대출진행현황",
    comBoardId: 9,
    originalPath: "/default/sub_05/sub_05_04.php",
    href: "/support/progress",
    columns: COLS_DEFAULT,
    searchOptions: SEARCH_ALL,
    canWrite: true,
    hasComments: true,
    hasRecommend: true,
    hasDeleteReply: true,
    readMetaBefore: ["title", "writer", "date", "views"],
    readMetaAfter: [],
    writeFields: ["writer", "password", "subject", "description"],
    perPage: 10,
  },
  // 업무제휴 (board 10) – board 9 와 동일 템플릿, 글 0개
  partnership: {
    id: "partnership",
    title: "업무제휴",
    comBoardId: 10,
    originalPath: "/default/sub_05/sub_05_05.php",
    href: "/support/partnership",
    columns: COLS_DEFAULT,
    searchOptions: SEARCH_ALL,
    canWrite: true,
    hasComments: true,
    hasRecommend: true,
    hasDeleteReply: true,
    readMetaBefore: ["title", "writer", "date", "views"],
    readMetaAfter: [],
    writeFields: ["writer", "password", "subject", "description"],
    perPage: 10,
  },
  // 자유게시판 (board 11) – 글 0개, 글쓰기 폼에 비밀번호가 먼저 오고 이메일 + 답변메일받기 체크박스가 있음
  free: {
    id: "free",
    title: "자유게시판",
    comBoardId: 11,
    originalPath: "/default/sub_05/sub_05_06.php",
    href: "/support/free",
    columns: COLS_DEFAULT,
    searchOptions: SEARCH_ALL,
    canWrite: true,
    hasComments: true,
    hasRecommend: true,
    hasDeleteReply: true,
    readMetaBefore: ["title", "writer", "date", "views"],
    readMetaAfter: [],
    writeFields: ["password", "writer", "email", "subject", "receiveMail", "description"],
    perPage: 10,
  },
};

export const BOARD_IDS = Object.keys(BOARDS) as BoardId[];

/** 문자열이 유효한 게시판 id 인지 */
export function isBoardId(id: string): id is BoardId {
  return (BOARD_IDS as string[]).includes(id);
}

/* ------------------------------------------------------------------ */
/* 샘플 데이터 – 원본에서 캡처한 값 그대로                                    */
/* ------------------------------------------------------------------ */

/** 공지사항 (board 5) – 글 1개. 목록 제목은 서버에서 25자 정도로 잘려 "…평택 .." 으로 표시됐음 */
const NOTICE_POSTS: Post[] = [
  {
    idx: 3,
    no: 1,
    title: "비트대부는 현재 코로나19로 인하여 평택 오산 화성 지역에서만 대출을 실시하고 있습니다",
    writer: "superball2",
    date: "2021-09-16",
    views: 796,
    // 원본 #post_area 내용 (read_form&com_board_idx=3&com_board_id=5)
    body:
      "<br><br>&nbsp;항상 비트대부에 관심을 가져주시고 애용하시는 고객님들께 감사드립니다.<br><br><br>" +
      "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " +
      "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - 비트임직원 일동-<br>",
    comments: [],
  },
];

/** 고객상담 Q&A (board 8) – 글 2개 (idx 3, 2). 댓글은 원본에 있던 것 그대로 (test/' 행은 스팸성 테스트 댓글) */
const QNA_POSTS: Post[] = [
  {
    idx: 3,
    no: 2,
    title: "대출문의",
    writer: "jhgfij78",
    date: "2021-09-14",
    views: 705,
    body: "제차량에 압류가 많이 있는데 대출이 가능할까요?",
    comments: [
      { name: "관리자", text: "네 가능하십니다 1666 6304로 연락주세요", time: "2021-09-14 11:59:32" },
      { name: "test'", text: "test", time: "2026-05-13 10:22:51" },
      { name: "'", text: "test", time: "2026-05-13 10:22:51" },
      { name: "test", text: "test", time: "2026-05-13 10:22:52" },
      { name: "test", text: "test'", time: "2026-05-13 10:22:52" },
      { name: "test", text: "test", time: "2026-05-13 10:22:52" },
      { name: "test", text: "test", time: "2026-05-13 10:22:52" },
      { name: "test", text: "'", time: "2026-05-13 10:22:52" },
    ],
  },
  {
    idx: 2,
    no: 1,
    title: "차대출문의요",
    writer: "투지",
    date: "2021-09-14",
    views: 647,
    body: "2018년 소나타 할부차량도 대출이 가능한가요?<br>",
    comments: [
      { name: "관리자", text: "네 연락주시면 더자세히 안내해드리겠습니다", time: "2021-09-14 11:45:34" },
    ],
  },
];

/**
 * 대출진행현황 (board 9) – 총 162개.
 * 1~2페이지(번호 162~143, idx 408~389)는 원본에서 캡처한 값 그대로,
 * 나머지 142개(번호 142~1, idx 388~247)는 같은 패턴으로 index 기반 결정적 생성.
 * (원본 목록은 제목을 ~24자에서 잘라 ".." 을 붙였는데, 여기서는 읽기 화면에서 확인된 idx 400 처럼
 *  전체 제목을 넣고 목록에서 잘라 표시한다. 잘린 부분은 패턴에 맞게 복원.)
 */
const PROGRESS_CAPTURED: [no: number, idx: number, title: string, writer: string, date: string, views: number][] = [
  [162, 408, "[이천복 고객님] 2018년 아우디 대출심사중", "관리자", "2021-09-20", 1270],
  [161, 407, "[강순정 고객님] 2015년 레이 대출심사중", "관리자", "2021-09-17", 1270],
  [160, 406, "[윤성수 고객님] 2017년 봉고3 대출심사중", "관리자", "2021-09-17", 1332],
  [159, 405, "[정영수 고객님] 2020년 k7 대출심사중", "관리자", "2021-09-16", 1375],
  [158, 404, "[박진혁 고객님] 2016년 스타렉스 대출심사중", "관리자", "2021-09-16", 1307],
  [157, 403, "[박은비 고객님] 2018년 그랜저 ig대출심사중", "관리자", "2021-09-16", 1089],
  [156, 402, "[유지영 고객님] 2013년 스파크 대출심사중", "superball3", "2021-09-14", 1230],
  [155, 401, "[소진웅 고객님] 2019년 k9 대출심사중", "superball3", "2021-09-14", 1222],
  [154, 400, "[김태민 고객님] 2012년식 코란도C 대출 심사중", "superball3", "2015-05-12", 1664],
  [153, 399, "[김준수 고객님] 2013년식 뉴QM5 대출 심사중", "superball3", "2015-05-12", 1757],
  [152, 398, "[박민성 고객님] 2008년식 오피러스 대출 심사중", "superball3", "2015-05-12", 1530],
  [151, 397, "[김현서 고객님] 2009년식  렉서스대출 심사중", "superball3", "2015-05-12", 1328],
  [150, 396, "[나희준 고객님] 2009년식 뉴투스카니 대출 심사중", "superball3", "2012-12-20", 1474],
  [149, 395, "[김창수 고객님] 2004년식 테라칸 대출 심사중", "superball3", "2012-12-20", 1408],
  [148, 394, "[김선자 고객님] 2012년식 그랜저HG 대출 심사중", "superball3", "2012-12-20", 1341],
  [147, 393, "[박후연 고객님] 2010년식 혼다 어코드 대출 심사중", "superball3", "2012-12-20", 1359],
  [146, 392, "[강연정 고객님] 2004년식 트라제XG 대출 심사중", "superball3", "2012-12-19", 1312],
  [145, 391, "[신용훈 고객님] 2007년식 로체 대출 심사중", "superball3", "2012-12-17", 1220],
  [144, 390, "[김연훈 고객님] 2003년식 매그너스 대출 심사중", "superball3", "2012-12-17", 1126],
  [143, 389, "[박송주 고객님] 2008년식 그랜저TG 대출 심사중", "superball3", "2012-12-17", 1172],
];

/** 생성용 이름/차종 풀 (결정적 – index 로만 선택) */
const GEN_NAMES = [
  "홍길동", "김민수", "이영희", "박철수", "최지현", "정우성", "강호동", "조민아", "윤서준", "장미란",
  "임재범", "한지민", "오세훈", "서정민", "신동엽", "권나라", "황보경", "안재홍", "송혜교", "류현진",
  "문소리", "배수지", "백종원", "남궁민", "노홍철", "하정우", "유재석", "전지현", "김태희", "이병헌",
];
const GEN_CARS = [
  "쏘렌토", "그랜저HG", "아반떼MD", "쏘나타YF", "K5", "K3", "모닝", "스포티지R", "투싼ix", "산타페",
  "카니발", "SM5", "SM3", "QM5", "코란도C", "렉스턴", "티볼리", "말리부", "크루즈", "스파크",
  "BMW 520d", "벤츠 E300", "아우디 A6", "렉서스 ES", "캠리", "어코드", "제네시스", "에쿠스", "스타렉스", "봉고3",
];

/** 대출진행현황 나머지 142개 글 생성 (번호 142 → 1, idx 388 → 247) */
function generateProgressRest(): Post[] {
  const rows: Post[] = [];
  const TOTAL_REST = 142; // 162 - 20
  for (let i = 0; i < TOTAL_REST; i++) {
    const no = 142 - i; // 142, 141, … 1
    const idx = no + 246; // 388 … 247 (캡처분과 같은 규칙: idx = no + 246)
    const name = GEN_NAMES[(i * 7) % GEN_NAMES.length];
    const car = GEN_CARS[(i * 11) % GEN_CARS.length];
    // 연식: 2003 ~ 2020, 날짜: 2012-12-16 부터 과거로 내려감 (2012~2021 범위 유지 – 캡처분 마지막이 2012-12-17)
    const modelYear = 2020 - ((i * 5) % 18);
    // 날짜: 번호가 작을수록 과거. 142개를 2012-01-01 ~ 2012-12-16 사이에 나눠 배치 (원본도 2012년 글이 대부분)
    const dayOffset = Math.floor((i / TOTAL_REST) * 350); // 0 ~ 349
    const d = new Date(Date.UTC(2012, 11, 16));
    d.setUTCDate(d.getUTCDate() - dayOffset);
    const date = d.toISOString().slice(0, 10);
    const views = 1100 + ((i * 137) % 651); // 1100 ~ 1750
    const writer = i % 9 === 0 ? "관리자" : "superball3";
    // 캡처분과 같은 두 가지 제목 패턴을 섞어 사용
    const title =
      i % 3 === 0
        ? `[${name} 고객님] ${modelYear}년 ${car} 대출심사중`
        : `[${name} 고객님] ${modelYear}년식 ${car} 대출 심사중`;
    rows.push({
      idx,
      no,
      title,
      writer,
      date,
      views,
      body: "&nbsp; &nbsp; &nbsp;<br>", // 원본: 모든 글 본문이 비어 있음
      comments: [],
    });
  }
  return rows;
}

const PROGRESS_POSTS: Post[] = [
  ...PROGRESS_CAPTURED.map(([no, idx, title, writer, date, views]) => ({
    idx,
    no,
    title,
    writer,
    date,
    views,
    body: "&nbsp; &nbsp; &nbsp;<br>",
    comments: [] as Comment[],
  })),
  ...generateProgressRest(),
];

/** 게시판별 글 목록 (최신글이 앞 – 원본 목록 순서와 같음) */
const POSTS: Record<BoardId, Post[]> = {
  notice: NOTICE_POSTS,
  faq: [], // 원본: 글 0개 (헤더 행만 렌더링)
  qna: QNA_POSTS,
  progress: PROGRESS_POSTS,
  partnership: [], // 원본: 글 0개
  free: [], // 원본: 글 0개
};

/* ------------------------------------------------------------------ */
/* 헬퍼                                                                 */
/* ------------------------------------------------------------------ */

/** 게시판 설정 */
export function getBoard(id: BoardId): BoardConfig {
  return BOARDS[id];
}

/** 게시판의 전체 글 (최신순) */
export function getAllPosts(id: BoardId): Post[] {
  return POSTS[id];
}

/** HTML 태그 제거 (내용 검색용) */
function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

/**
 * 목록 조회 – 검색 + 페이징
 * 원본: POST com_board_search_code / com_board_search_value → 서버에서 필터, com_board_page 로 페이징
 */
export function getPosts(
  id: BoardId,
  page = 1,
  search: { searchType?: string; keyword?: string } = {},
): { rows: Post[]; total: number; totalPages: number; page: number } {
  const board = BOARDS[id];
  const keyword = (search.keyword ?? "").trim();
  let all = POSTS[id];

  if (keyword) {
    const type = (search.searchType as SearchType) || "subject";
    all = all.filter((p) => {
      switch (type) {
        case "description":
          return stripTags(p.body).includes(keyword);
        case "writer":
          return p.writer.includes(keyword);
        case "subject":
        default:
          return p.title.includes(keyword);
      }
    });
  }

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / board.perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * board.perPage;
  return { rows: all.slice(start, start + board.perPage), total, totalPages, page: safePage };
}

/** 글 1건 (idx = 원본 com_board_idx) */
export function getPost(id: BoardId, idx: number): Post | undefined {
  return POSTS[id].find((p) => p.idx === idx);
}

/**
 * 이전글/다음글
 * 원본: 이전(prev.gif) = 더 오래된 글(idx-1 방향), 다음(next.gif) = 더 최신 글(idx+1 방향).
 * 목록이 최신순이므로 배열상 뒤가 "이전", 앞이 "다음".
 */
export function getAdjacentPosts(id: BoardId, idx: number): { prev?: Post; next?: Post } {
  const all = POSTS[id];
  const i = all.findIndex((p) => p.idx === idx);
  if (i < 0) return {};
  return {
    prev: all[i + 1], // 더 오래된 글
    next: all[i - 1], // 더 최신 글
  };
}

/**
 * 목록 제목 자르기 – 원본 서버는 EUC-KR 40바이트(한글 20자)까지만 남기고 ".." 을 붙였다.
 *   예) "[박진혁 고객님] 2016년 스타렉스 대출심사중" → "[박진혁 고객님] 2016년 스타렉스 대출심사.."
 *       "비트대부는 현재 코로나19로 인하여 평택 오산 …" → "비트대부는 현재 코로나19로 인하여 평택 .."
 * (한글 1자 = 2바이트, 영숫자/공백 = 1바이트로 계산. 남은 문자열 끝의 공백도 그대로 두고 ".." 을 붙임)
 */
export function truncateTitle(title: string, maxBytes = 40): string {
  let bytes = 0;
  let out = "";
  for (const ch of title) {
    bytes += ch.charCodeAt(0) > 0x7f ? 2 : 1;
    if (bytes > maxBytes) return out + "..";
    out += ch;
  }
  return title;
}

/** 목록 페이지 URL 생성 (?page=N&searchType=&keyword=) */
export function listHref(
  id: BoardId,
  params: { page?: number; searchType?: string; keyword?: string } = {},
): string {
  const q = new URLSearchParams();
  if (params.page && params.page > 1) q.set("page", String(params.page));
  if (params.keyword) {
    q.set("searchType", params.searchType || "subject");
    q.set("keyword", params.keyword);
  }
  const qs = q.toString();
  return `${BOARDS[id].href}${qs ? `?${qs}` : ""}`;
}

/** 읽기 페이지 URL (원본 ?com_board_basic=read_form&com_board_idx={idx}) */
export function readHref(id: BoardId, idx: number, params: { page?: number; searchType?: string; keyword?: string } = {}) {
  const q = new URLSearchParams();
  if (params.page && params.page > 1) q.set("page", String(params.page));
  if (params.keyword) {
    q.set("searchType", params.searchType || "subject");
    q.set("keyword", params.keyword);
  }
  const qs = q.toString();
  return `${BOARDS[id].href}/${idx}${qs ? `?${qs}` : ""}`;
}

/** 글쓰기 페이지 URL (원본 ?com_board_basic=write_form / reply_form&com_board_idx={idx}) */
export function writeHref(id: BoardId, replyIdx?: number) {
  return `${BOARDS[id].href}/write${replyIdx ? `?reply=${replyIdx}` : ""}`;
}
