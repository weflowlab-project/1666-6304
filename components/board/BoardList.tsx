import Link from "next/link";
import BoardButton from "@/components/board/BoardButton";
import BoardListRow from "@/components/board/BoardListRow";
import BoardSearchForm from "@/components/board/BoardSearchForm";
import WriteButton from "@/components/board/WriteButton";
import {
  COLUMN_LABELS,
  getPosts,
  listHref,
  readHref,
  truncateTitle,
  type BoardConfig,
  type ColumnKey,
  type Post,
} from "@/lib/boards";

/**
 * 게시판 목록 (카페24 일반형 리스트 스킨, 폭 730)
 *
 * 원본 구조 (sub_05_0X.php, <table width=730 bgcolor=#FFFFFF>):
 *   [3px 상단 룰 #E5E5E5]
 *   [table.board border=1 bordercolor=#E5E5E5 border-collapse]   ← 모든 셀 1px #E5E5E5 격자
 *      헤더 tr height=30 bgcolor=#F7F7F7 : 번호 | 제목 | 작성자 | 작성일자 | 조회수 (12px #000)   ※공지사항은 작성일자가 작성자보다 앞
 *      본문 tr height=28 align=center cursor:pointer  (제목 셀만 align=left, 링크 #555 → hover #FF5500)
 *      → 글이 없으면 헤더 행만 렌더링 (안내문 없음)
 *   [1px 룰 #E5E5E5]
 *   [페이징 table]  td w62 | td.paging h34 center (현재 페이지 #FF5500 bold, 나머지 #555 링크, 10개 블록, 화살표 14x14) | td w62 right 글쓰기
 *   [1px 룰 #E5E5E5]
 *   [검색 폼]  select + text + 검색 버튼 (자주하는 질문은 없음)
 *
 * 원본 URL: 목록 ?com_board_page=N, 검색 POST com_board_search_code/value → 새 사이트 ?page=N&searchType=&keyword=
 * 컬럼 폭은 원본에 지정이 없어 자동 배치였음. 730 안에서 번호 60 / 제목 가변 / 작성자 100 / 작성일자 100 / 조회수 70 로 고정.
 */
export default function BoardList({
  board,
  page,
  searchType,
  keyword,
}: {
  board: BoardConfig;
  page: number;
  searchType?: string;
  keyword?: string;
}) {
  const { rows, totalPages, page: current } = getPosts(board.id, page, { searchType, keyword });
  const q = { searchType, keyword };

  return (
    <div className="w-[730px] bg-white text-left">
      {/* 카테고리 영역 – 6개 게시판 모두 비어 있음 */}

      {/* 3px 상단 룰 */}
      <div className="h-[3px] bg-[#E5E5E5]" />

      {/* 목록 테이블 (border=1 bordercolor=#E5E5E5 border-collapse) */}
      <table className="board w-full border-collapse" style={{ fontFamily: "굴림, Gulim, 돋움, Dotum, sans-serif" }}>
        <thead>
          {/* 헤더 행: 30px, bg #F7F7F7, 검정 12px */}
          <tr className="h-[30px] bg-[#F7F7F7] text-center">
            {board.columns.map((col) => (
              <th
                key={col}
                className={`att_title border border-[#E5E5E5] text-[12px] font-normal text-black ${colWidthClass(col)}`}
              >
                {COLUMN_LABELS[col]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 본문 행 – 글이 없으면 원본처럼 헤더만 남김 */}
          {rows.map((post) => (
            <BoardListRow
              key={post.idx}
              href={readHref(board.id, post.idx, { page: current, ...q })}
              cells={board.columns.map((col) => ({
                key: col,
                content: cellContent(col, post),
                isTitle: col === "title",
              }))}
            />
          ))}
        </tbody>
      </table>

      {/* 1px 룰 */}
      <div className="h-px bg-[#E5E5E5]" />

      {/* 페이징 행: [62px] [paging 34px 가운데] [62px 우측 글쓰기] */}
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="w-[62px]" />
            <td className="paging h-[34px] text-center text-[12px] leading-[34px]">
              <Paging board={board} current={current} totalPages={totalPages} searchType={searchType} keyword={keyword} />
            </td>
            <td className="w-[62px] text-right">
              <WriteButton board={board} />
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="h-px bg-[#E5E5E5] p-0" />
          </tr>
        </tbody>
      </table>

      {/* 검색 폼 – 자주하는 질문(board 12)은 <!-- 검색 --> 블록이 비어 있어 렌더링하지 않음 */}
      {board.searchOptions.length > 0 && (
        <BoardSearchForm board={board} searchType={searchType} keyword={keyword} />
      )}
    </div>
  );
}

/** 컬럼별 고정 폭 (원본은 자동 폭 – 730 기준 권장값) */
function colWidthClass(col: ColumnKey) {
  switch (col) {
    case "no":
      return "w-[60px]";
    case "writer":
      return "w-[100px]";
    case "date":
      return "w-[100px]";
    case "views":
      return "w-[70px]";
    default:
      return "";
  }
}

/** 셀 내용 – 제목은 원본처럼 ~24자에서 잘라 ".." 표시 */
function cellContent(col: ColumnKey, post: Post) {
  switch (col) {
    case "no":
      return post.no;
    case "title":
      return truncateTitle(post.title);
    case "writer":
      return post.writer;
    case "date":
      return post.date;
    case "views":
      return post.views;
  }
}

/**
 * 페이지 번호 블록
 *
 * 원본 (page 1):  &nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;<a>2</a> … <a>10</a>&nbsp;&nbsp;&nbsp;[▶ page=11]&nbsp;&nbsp;[▶▶ page=17]
 * 원본 (page 17): [◀◀ page=1]&nbsp;&nbsp;[◀ page=10]&nbsp;&nbsp;&nbsp;&nbsp;<a>11</a> … <b>17</b>
 *   - 현재 페이지 <b> #FF5500, 나머지 링크 #555555 (hover 밑줄), 10페이지 블록
 *   - arr_page_pre = 1페이지, arr_page_back = 이전 블록, arr_page_go = 다음 블록, arr_page_next = 마지막 페이지
 *   - 페이지가 하나뿐이면 셀이 비어 있음
 */
function Paging({
  board,
  current,
  totalPages,
  searchType,
  keyword,
}: {
  board: BoardConfig;
  current: number;
  totalPages: number;
  searchType?: string;
  keyword?: string;
}) {
  if (totalPages <= 1) return null;

  const BLOCK = 10;
  const blockStart = Math.floor((current - 1) / BLOCK) * BLOCK + 1;
  const blockEnd = Math.min(blockStart + BLOCK - 1, totalPages);
  const href = (p: number) => listHref(board.id, { page: p, searchType, keyword });
  const pages: number[] = [];
  for (let p = blockStart; p <= blockEnd; p++) pages.push(p);

  return (
    <span className="inline-flex items-center gap-[6px] text-[12px]">
      {/* 이전 블록이 있을 때: ◀◀(1페이지) ◀(이전 블록) */}
      {blockStart > 1 && (
        <>
          <Link href={href(1)} title="처음" className="inline-flex">
            <BoardButton kind="arr_page_pre" />
          </Link>
          <Link href={href(blockStart - 1)} title="이전 블록" className="inline-flex">
            <BoardButton kind="arr_page_back" />
          </Link>
          <span className="w-[6px]" />
        </>
      )}
      {/* 페이지 번호 */}
      {pages.map((p) =>
        p === current ? (
          <b key={p} className="px-[3px] font-bold text-[#FF5500]">
            {p}
          </b>
        ) : (
          <Link key={p} href={href(p)} className="px-[3px] font-normal !text-[#555555] hover:underline">
            {p}
          </Link>
        ),
      )}
      {/* 다음 블록이 있을 때: ▶(다음 블록) ▶▶(마지막) */}
      {blockEnd < totalPages && (
        <>
          <span className="w-[6px]" />
          <Link href={href(blockEnd + 1)} title="다음 블록" className="inline-flex">
            <BoardButton kind="arr_page_go" />
          </Link>
          <Link href={href(totalPages)} title="마지막" className="inline-flex">
            <BoardButton kind="arr_page_next" />
          </Link>
        </>
      )}
    </span>
  );
}
