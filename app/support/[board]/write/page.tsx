import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BoardWrite from "@/components/board/BoardWrite";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { getBoard, getPost, isBoardId } from "@/lib/boards";
import { SITE } from "@/lib/menu";

/**
 * 고객센터 게시글 쓰기 / 답글 페이지
 *
 *   /support/{board}/write            ← 원본 …sub_05_0X.php?com_board_basic=write_form&com_board_id={ID}
 *   /support/{board}/write?reply={no} ← 원본 …sub_05_0X.php?com_board_basic=reply_form&com_board_idx={no}&com_board_id={ID}
 *
 * 공지사항(board 5)은 관리자 전용(write_auth=2): 원본은 alert("게시판 쓰기 권한이 없습니다.") 후
 * confirm 으로 메인/이전 페이지 이동 – BoardWrite 가 마운트 시 같은 흐름을 재현한다.
 * 정적 세그먼트 `write` 는 형제 동적 세그먼트 `[no]` 보다 우선한다.
 */
type Props = {
  params: Promise<{ board: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board } = await params;
  return { title: isBoardId(board) ? `글쓰기 | ${getBoard(board).title} - ${SITE.name}` : SITE.title };
}

export default async function BoardWritePage({ params, searchParams }: Props) {
  const { board: boardId } = await params;
  if (!isBoardId(boardId)) notFound();
  const board = getBoard(boardId);

  // 답글 모드: ?reply={idx} → 원글 제목을 "RE: …" 로 프리필
  const sp = await searchParams;
  const replyRaw = Array.isArray(sp.reply) ? sp.reply[0] : sp.reply;
  const replyIdx = replyRaw ? Number(replyRaw) : NaN;
  const replyTo = Number.isInteger(replyIdx) ? getPost(boardId, replyIdx) : undefined;

  return (
    <SubPageLayout sectionId="support" title={board.title}>
      <BoardWrite board={board} replyTo={replyTo} />
    </SubPageLayout>
  );
}
