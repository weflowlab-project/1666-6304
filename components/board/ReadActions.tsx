"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import BoardButton from "@/components/board/BoardButton";
import Placeholder from "@/components/Placeholder";
import WriteButton from "@/components/board/WriteButton";
import { listHref, writeHref, type BoardConfig, type Post } from "@/lib/boards";

/**
 * 읽기 화면 우측 버튼 묶음 (클라이언트): [추천하기] [삭제] [답글쓰기] [글쓰기]
 *
 * 원본 (button row, td align=right):
 *   - 추천하기 recommend.gif → …&com_board_basic=recommend&com_board_idx=N   (board 9/10/11 계열만)
 *   - 삭제 delete.gif → <a href='#' onclick='com_board_delete("ID","idx","/default/sub_05/sub_05_0X.php","bizdemo1703","…")'>
 *       → window.open('/chtml/board.php?com_board_basic=delete_form&…', 'cafe_component_delete', 'width=450,height=220')
 *       팝업 "게시판 글 삭제": [img_delpop_01.gif 410x43 "삭제 비밀번호 입력"]
 *                            "삭제하기 위해서는 비밀번호가 필요합니다.<br>글 작성시 입력한 비밀번호를 입력하세요."
 *                            [img_delpop_02.gif 410x3] #F7F3F0 바 h43: 비밀번호 [password size=15 maxlength=20 id=border] [확인] [취소=self.close()] [img_delpop_03.gif 410x3]
 *       → POST com_board_basic=delete → 원래 페이지로 리다이렉트
 *   - 답글쓰기 reply.gif → …&com_board_basic=reply_form&com_board_idx=N  (제목 "RE: …" 프리필)
 *   - 글쓰기 write.gif → …?com_board_basic=write_form
 *   - 수정 modify.gif 는 서버에 있지만 비회원에게는 렌더링되지 않음
 *
 * 여기서는 삭제 팝업을 같은 크기(450x220)의 인라인 모달로 대체하고, 확인 시 데모 alert 를 띄운다.
 */
export default function ReadActions({ board, post }: { board: BoardConfig; post: Post }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  function onDeleteSubmit(e: FormEvent) {
    e.preventDefault();
    // 원본 팝업 폼: 비밀번호 필수 (FormCheck) → 서버 검증
    if (!password.trim()) {
      alert("비밀번호을(를) 정확히 입력하세요.");
      return;
    }
    alert("[데모] 게시글이 삭제되었습니다. (실제 삭제는 되지 않습니다)");
    setOpen(false);
    setPassword("");
    router.push(listHref(board.id));
  }

  return (
    <span className="inline-flex items-center gap-[4px]">
      {/* 추천하기 (board 9/10/11) */}
      {board.hasRecommend && (
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-0"
          title="추천하기"
          onClick={() => alert("[데모] 추천되었습니다.")}
        >
          <BoardButton kind="recommend" />
        </button>
      )}

      {board.hasDeleteReply && (
        <>
          {/* 삭제 → 비밀번호 확인 모달 (원본 450x220 팝업) */}
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0"
            title="삭제"
            onClick={() => setOpen(true)}
          >
            <BoardButton kind="delete" />
          </button>
          {/* 답글쓰기 → write?reply=idx */}
          <Link href={writeHref(board.id, post.idx)} title="답글쓰기" className="inline-flex">
            <BoardButton kind="reply" />
          </Link>
        </>
      )}

      {/* 글쓰기 (공지사항은 원본이 display:none 이라 렌더링 안 함) */}
      <WriteButton board={board} />

      {/* ---- 삭제 비밀번호 모달 (원본 /chtml/board.php?com_board_basic=delete_form 팝업 450x220) ---- */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[450px] bg-white p-[10px] shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-label="게시판 글 삭제"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={onDeleteSubmit} className="mx-auto w-[410px]">
              {/* 헤더 이미지: 남색 둥근 바 + 흰 굵은 글씨 "삭제 비밀번호 입력" */}
              <Placeholder width={410} height={43} note="/cimg/img_delpop_01.gif" tone="dark" align="left">
                <span className="pl-2 text-[13px] font-bold text-white">삭제 비밀번호 입력</span>
              </Placeholder>
              {/* 안내문 (.board_txt, padding 23 0 5 10, line-height 150%) */}
              <p className="m-0 pb-[5px] pl-[10px] pt-[23px] text-[12px] leading-[18px] text-black">
                삭제하기 위해서는 비밀번호가 필요합니다.
                <br />
                글 작성시 입력한 비밀번호를 입력하세요.
              </p>
              <Placeholder width={410} height={3} note="/cimg/img_delpop_02.gif" tone="light" />
              {/* 비밀번호 바 (#F7F3F0, h43) */}
              <div className="flex h-[43px] items-center gap-[6px] bg-[#F7F3F0] pl-[10px] text-[12px] text-black">
                비밀번호
                <input
                  type="password"
                  name="com_board_password"
                  size={15}
                  maxLength={20}
                  autoFocus
                  className="h-[20px] w-[120px] border border-[#D4D4D4] bg-white px-1 text-[12px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="cursor-pointer border-0 bg-transparent p-0" title="확인">
                  <BoardButton kind="confirm" />
                </button>
                {/* 취소 = self.close() */}
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0"
                  title="취소"
                  onClick={() => setOpen(false)}
                >
                  <BoardButton kind="cancel" />
                </button>
              </div>
              <Placeholder width={410} height={3} note="/cimg/img_delpop_03.gif" tone="light" />
            </form>
          </div>
        </div>
      )}
    </span>
  );
}
