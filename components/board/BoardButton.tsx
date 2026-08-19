import type { ReactNode } from "react";
import Placeholder from "@/components/Placeholder";

/**
 * 게시판 버튼 이미지 플레이스홀더
 *
 * 원본 카페24 게시판은 모든 버튼이 GIF 이미지였다 (/cimg/board/*.gif == /bizdemo1703/img/component/board/board_N/*.gif,
 * 6개 게시판 모두 md5 동일). 흰 배경 + 1px #DBDBDB 테두리 박스, #333333 12px 굴림 글씨, 높이 20px.
 *
 *   write.gif 62x20 글쓰기(주황 연필 아이콘)   search.gif 50x20 검색(돋보기)   list.gif 65x20 목록보기(■)
 *   prev.gif 41x20 ◂ 이전   next.gif 42x20 다음 ▸   delete.gif 34x20 삭제   modify.gif 34x20 수정
 *   reply.gif 62x20 답글쓰기(굵게)   confirm.gif 43x20 ■ 확인   cancel.gif 43x20 ■ 취소
 *   comment_write.gif 68x38 댓글달기   recommend.gif 62x20 추천하기
 *   comment_modify.gif 13x12 (파란 연필)   comment_delete.gif 13x12 (주황 X)
 *   /cimg/arr_page_pre|back|go|next.gif 14x14 ◀◀ ◀ ▶ ▶▶ (페이지 이동 화살표)
 *
 * 실제 이미지로 교체할 때는 이 컴포넌트만 <Image>로 바꾸면 된다.
 */
export type BoardButtonKind =
  | "write"
  | "search"
  | "list"
  | "prev"
  | "next"
  | "delete"
  | "modify"
  | "reply"
  | "confirm"
  | "cancel"
  | "comment_write"
  | "recommend"
  | "comment_modify"
  | "comment_delete"
  | "arr_page_pre"
  | "arr_page_back"
  | "arr_page_go"
  | "arr_page_next";

const BUTTONS: Record<BoardButtonKind, { file: string; width: number; height: number; label: ReactNode }> = {
  write: { file: "write.gif", width: 62, height: 20, label: <span><span className="text-[#FF720D]">✎</span> 글쓰기</span> },
  search: { file: "search.gif", width: 50, height: 20, label: <span><span className="text-[#888]">⌕</span> 검색</span> },
  list: { file: "list.gif", width: 65, height: 20, label: "■ 목록보기" },
  prev: { file: "prev.gif", width: 41, height: 20, label: "◂ 이전" },
  next: { file: "next.gif", width: 42, height: 20, label: "다음 ▸" },
  delete: { file: "delete.gif", width: 34, height: 20, label: "삭제" },
  modify: { file: "modify.gif", width: 34, height: 20, label: "수정" },
  reply: { file: "reply.gif", width: 62, height: 20, label: <b>답글쓰기</b> },
  confirm: { file: "confirm.gif", width: 43, height: 20, label: "■ 확인" },
  cancel: { file: "cancel.gif", width: 43, height: 20, label: "■ 취소" },
  comment_write: { file: "comment_write.gif", width: 68, height: 38, label: <b>댓글달기</b> },
  recommend: { file: "recommend.gif", width: 62, height: 20, label: "추천하기" },
  comment_modify: { file: "comment_modify.gif", width: 13, height: 12, label: "" },
  comment_delete: { file: "comment_delete.gif", width: 13, height: 12, label: "" },
  arr_page_pre: { file: "/cimg/arr_page_pre.gif", width: 14, height: 14, label: "◀◀" },
  arr_page_back: { file: "/cimg/arr_page_back.gif", width: 14, height: 14, label: "◀" },
  arr_page_go: { file: "/cimg/arr_page_go.gif", width: 14, height: 14, label: "▶" },
  arr_page_next: { file: "/cimg/arr_page_next.gif", width: 14, height: 14, label: "▶▶" },
};

export default function BoardButton({ kind, className = "" }: { kind: BoardButtonKind; className?: string }) {
  const b = BUTTONS[kind];
  const isIcon = kind === "comment_modify" || kind === "comment_delete";
  const isArrow = kind.startsWith("arr_page");
  return (
    <Placeholder
      width={b.width}
      height={b.height}
      note={b.file}
      tone="none"
      className={`inline-block align-middle whitespace-nowrap !border-solid ${
        isIcon
          ? kind === "comment_modify"
            ? "border-[#699DDB] bg-[#699DDB]"
            : "border-[#FF7D47] bg-[#FF7D47]"
          : "border-[#DBDBDB] bg-white"
      } ${className}`}
      style={{ verticalAlign: "middle" }}
    >
      <span
        className={`leading-none ${
          isArrow ? "text-[8px] text-[#828384]" : "text-[11px] text-[#333]"
        } ${kind === "comment_write" ? "text-[12px]" : ""}`}
        style={{ fontFamily: "굴림, Gulim, 돋움, Dotum, sans-serif" }}
      >
        {b.label}
      </span>
    </Placeholder>
  );
}
