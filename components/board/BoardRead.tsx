import Link from "next/link";
import BoardButton from "@/components/board/BoardButton";
import CommentSection from "@/components/board/CommentSection";
import ReadActions from "@/components/board/ReadActions";
import { getAdjacentPosts, listHref, META_LABELS, readHref, type BoardConfig, type MetaKey, type Post } from "@/lib/boards";

/**
 * 게시글 읽기 화면 (원본 ?com_board_basic=read_form&com_board_idx={idx}&com_board_id={ID}, 폭 730)
 *
 * 원본 구조:
 *   [3px 상단 룰 #E5E5E5]
 *   [table.board border=1 bordercolor=#e5e5e5 border-collapse width=100%]
 *      tr h30: td.board_bgcolor(20%, center, bg #F7F7F7, 12px #000) "제목"    | td.board_desc(80%, left, padding 3 0 3 10 / padding-left 5, line-height 150%)
 *      tr h30: "작성자" | …    tr h30: "작성일자" | …    tr h30: "조회수" | …
 *        ※ 공지사항(board 5)은 제목 → 본문 → 작성일자 순이고 작성자/조회수 행이 없음
 *      tr: td colspan=2 .board_description height=100px → div#post_area (padding 5px, word-break:break-all, 이미지 최대 695px)
 *   [1px 룰 #E5E5E5] [10px 여백]
 *   [댓글 폼 + 댓글 목록]  (댓글 사용 게시판)  → CommentSection
 *   <br> [1px 룰 #E5E5E5]
 *   [버튼 행 h34]  좌: [이전] [목록보기] [다음] (없는 쪽 생략)   우: [추천하기] [삭제] [답글쓰기] [글쓰기]  → ReadActions
 *
 * 인터랙션
 *   - 이전(prev.gif)=더 오래된 글, 다음(next.gif)=더 최신 글 (com_board_idx ±)
 *   - 본문 이미지: resizeImage() 로 695px 제한 + 클릭 시 showPicture() 팝업 (여기서는 max-width 만 적용)
 *   - 조회수는 원본에서 읽을 때마다 +1 (목록 705 → 읽기 706). 여기서는 목록값 +1 로 표시.
 */
export default function BoardRead({
  board,
  post,
  listQuery,
}: {
  board: BoardConfig;
  post: Post;
  /** 목록으로 돌아갈 때 유지할 페이지/검색 상태 */
  listQuery?: { page?: number; searchType?: string; keyword?: string };
}) {
  const { prev, next } = getAdjacentPosts(board.id, post.idx);

  /** 메타 값 */
  const metaValue = (key: MetaKey) => {
    switch (key) {
      case "title":
        return post.title;
      case "writer":
        return post.writer;
      case "date":
        return post.date;
      case "views":
        return post.views + 1; // 원본: 읽을 때 조회수 +1
    }
  };

  /** 라벨(20%, #F7F7F7) | 값(80%) 메타 행 */
  const metaRow = (k: MetaKey) => (
    <tr key={k} className="h-[30px]">
      <td className="board_bgcolor w-[20%] border border-[#E5E5E5] bg-[#F7F7F7] text-center text-[12px] text-black">
        {META_LABELS[k]}
      </td>
      <td className="board_desc w-[80%] border border-[#E5E5E5] py-[3px] pl-[5px] text-left text-[12px] leading-[150%] text-[#333]">
        {metaValue(k)}
      </td>
    </tr>
  );

  return (
    <div className="w-[730px] bg-white text-left" style={{ fontFamily: "굴림, Gulim, 돋움, Dotum, sans-serif" }}>
      {/* 3px 상단 룰 */}
      <div className="h-[3px] bg-[#E5E5E5]" />

      {/* 메타 + 본문 테이블 */}
      <table className="board w-full border-collapse">
        <tbody>
          {/* 본문 위 메타 행 (제목/작성자/작성일자/조회수 – 공지사항은 제목만) */}
          {board.readMetaBefore.map(metaRow)}
          {/* 본문 행: td colspan=2 class=board_description height=100px → div#post_area */}
          <tr>
            <td colSpan={2} className="board_description h-[100px] border border-[#E5E5E5] align-top">
              <div
                id="post_area"
                className="w-full p-[5px] text-[12px] leading-[150%] text-[#333] break-all [&_img]:max-w-[695px] [&_p]:m-0"
                // 원본 게시글 HTML (정적 샘플 데이터) 그대로 출력
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </td>
          </tr>
          {/* 본문 아래 메타 행 (공지사항: 작성일자) */}
          {board.readMetaAfter.map(metaRow)}
        </tbody>
      </table>

      {/* 1px 룰 + 10px 여백 */}
      <div className="h-px bg-[#E5E5E5]" />
      <div className="h-[10px]" />

      {/* 게시물 평가(rating) – 사용 안 함 */}

      {/* 댓글 폼 + 목록 */}
      {board.hasComments && <CommentSection comments={post.comments} />}

      {/* <br> + 1px 룰 */}
      <div className="h-[20px]" />
      <div className="h-px bg-[#E5E5E5]" />

      {/* 버튼 행 (h34) */}
      <table className="w-full border-collapse">
        <tbody>
          <tr className="h-[34px]">
            {/* 좌: [이전] [목록보기] [다음] – 원본 td.bbsnewf5 align=left width=50% */}
            <td className="bbsnewf5 w-1/2 px-[10px] text-left align-middle">
              <span className="inline-flex items-center gap-[4px]">
                {prev && (
                  <Link href={readHref(board.id, prev.idx, listQuery)} title="이전" className="inline-flex">
                    <BoardButton kind="prev" />
                  </Link>
                )}
                <Link href={listHref(board.id, listQuery)} title="목록보기" className="inline-flex">
                  <BoardButton kind="list" />
                </Link>
                {next && (
                  <Link href={readHref(board.id, next.idx, listQuery)} title="다음" className="inline-flex">
                    <BoardButton kind="next" />
                  </Link>
                )}
              </span>
            </td>
            {/* 우: [추천하기] [삭제] [답글쓰기] [글쓰기] */}
            <td className="w-1/2 px-[10px] text-right align-middle">
              <ReadActions board={board} post={post} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
