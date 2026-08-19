"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BoardButton from "@/components/board/BoardButton";
import { writeHref, type BoardConfig } from "@/lib/boards";

/**
 * 글쓰기 버튼 (클라이언트)
 *
 * 원본: 페이징 행 우측 62px 셀의 <a href='…?com_board_basic=write_form&com_board_id=N'><img src=write.gif></a>
 *   - 공지사항(board 5, write_auth=2 관리자 전용)은 목록에 버튼이 아예 없고, 읽기 화면에도 display:none 링크만 있음.
 *     write_form 에 직접 접근하면 alert("게시판 쓰기 권한이 없습니다.") 후
 *     confirm("확인을 누르면 메인으로 이동하고 취소를 누르면 이전페이지로 이동합니다.") → 확인: '/', 취소: history.back().
 *   - 그 외 게시판은 로그인 없이 글쓰기 폼으로 이동.
 *
 * `forceShow` 는 읽기 화면 우측 버튼 묶음처럼 공지사항에서도 자리를 표시해야 할 때 사용 (원본은 숨김이라 기본은 렌더링 안 함).
 */
export default function WriteButton({ board, forceShow = false }: { board: BoardConfig; forceShow?: boolean }) {
  const router = useRouter();

  if (!board.canWrite) {
    if (!forceShow) return null;
    return (
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0 align-middle"
        onClick={() => {
          // 원본 write_form 응답 스크립트 그대로
          alert("게시판 쓰기 권한이 없습니다.");
          if (confirm("확인을 누르면 메인으로 이동하고 취소를 누르면 이전페이지로 이동합니다.")) {
            router.push("/");
          } else {
            router.back();
          }
        }}
      >
        <BoardButton kind="write" />
      </button>
    );
  }

  return (
    <Link href={writeHref(board.id)} className="inline-block align-middle" title="글쓰기">
      <BoardButton kind="write" />
    </Link>
  );
}
