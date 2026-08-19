import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BoardRead from "@/components/board/BoardRead";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { getBoard, getPost, isBoardId } from "@/lib/boards";
import { SITE } from "@/lib/menu";

/**
 * 고객센터 게시글 읽기 페이지
 *
 *   /support/{board}/{no}   ← 원본 /default/sub_05/sub_05_0X.php?com_board_basic=read_form&com_board_idx={no}&com_board_id={ID}
 *   ({no} = 원본 com_board_idx. 예: /support/qna/3 ← read_form&com_board_idx=3&com_board_id=8)
 *
 * 쿼리 ?page=&searchType=&keyword= 는 목록보기/이전/다음 링크에 그대로 넘겨 검색 상태를 유지한다
 * (원본도 read 링크에 com_board_search_code/value/page 를 실어 다녔음).
 * 정적 세그먼트 `write` 가 이 동적 세그먼트보다 우선하므로 /support/qna/write 는 글쓰기 페이지로 간다.
 */
type Props = {
  params: Promise<{ board: string; no: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, no } = await params;
  if (!isBoardId(board)) return { title: SITE.title };
  const post = getPost(board, Number(no));
  const b = getBoard(board);
  return { title: post ? `${post.title} | ${b.title} - ${SITE.name}` : `${b.title} - ${SITE.name}` };
}

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BoardReadPage({ params, searchParams }: Props) {
  const { board: boardId, no } = await params;
  if (!isBoardId(boardId)) notFound();
  const board = getBoard(boardId);

  const idx = Number(no);
  const post = Number.isInteger(idx) ? getPost(boardId, idx) : undefined;
  if (!post) notFound();

  const sp = await searchParams;
  const pageNum = parseInt(first(sp.page) ?? "", 10);
  const listQuery = {
    page: Number.isNaN(pageNum) ? undefined : pageNum,
    searchType: first(sp.searchType),
    keyword: first(sp.keyword),
  };

  return (
    <SubPageLayout sectionId="support" title={board.title}>
      <BoardRead board={board} post={post} listQuery={listQuery} />
    </SubPageLayout>
  );
}
