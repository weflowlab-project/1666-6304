import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BoardList from "@/components/board/BoardList";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { BOARD_IDS, getBoard, isBoardId } from "@/lib/boards";
import { SITE } from "@/lib/menu";

/**
 * 고객센터 게시판 목록 페이지 (동적 라우트)
 *
 *   /support/notice       ← 원본 /default/sub_05/sub_05_01.php  공지사항      (com_board_id=5)
 *   /support/faq          ← 원본 /default/sub_05/sub_05_02.php  자주하는 질문  (com_board_id=12)
 *   /support/qna          ← 원본 /default/sub_05/sub_05_03.php  고객상담 Q&A   (com_board_id=8)
 *   /support/progress     ← 원본 /default/sub_05/sub_05_04.php  대출진행현황   (com_board_id=9)
 *   /support/partnership  ← 원본 /default/sub_05/sub_05_05.php  업무제휴      (com_board_id=10)
 *   /support/free         ← 원본 /default/sub_05/sub_05_06.php  자유게시판    (com_board_id=11)
 *
 * 쿼리: ?page=N (원본 com_board_page) / ?searchType=subject|description|writer&keyword=… (원본 com_board_search_code/value)
 * 6개 페이지 모두 SubPageLayout(서브 비주얼 → 사이드바 → 파란 박스 → 제목) 안에 카페24 게시판 컴포넌트(730px)만 다르게 들어간다.
 */
type Props = {
  params: Promise<{ board: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return BOARD_IDS.map((board) => ({ board }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board } = await params;
  return { title: isBoardId(board) ? `${getBoard(board).title} - ${SITE.name}` : SITE.title };
}

/** 쿼리값 1개 꺼내기 (배열이면 첫 값) */
function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BoardListPage({ params, searchParams }: Props) {
  const { board: boardId } = await params;
  if (!isBoardId(boardId)) notFound();
  const board = getBoard(boardId);

  const sp = await searchParams;
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);
  const searchType = first(sp.searchType);
  const keyword = first(sp.keyword);

  return (
    <SubPageLayout sectionId="support" title={board.title}>
      <BoardList board={board} page={page} searchType={searchType} keyword={keyword} />
    </SubPageLayout>
  );
}
