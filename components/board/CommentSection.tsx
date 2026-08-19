"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import BoardButton from "@/components/board/BoardButton";
import type { Comment } from "@/lib/boards";

/**
 * 읽기 화면 댓글 영역 (댓글 작성 폼 + 댓글 목록) – 클라이언트
 *
 * 원본 구조 (read_form, board_8/9/… 공통):
 *   <table class=board_comment_bgcolor (bg #F6F6F6) width=100%>
 *     <form name=com_board_form method=post onsubmit="return com_board_commentCheck(ID,'bizdemo1703')">
 *       hidden com_board_basic=comment_insert, com_board_idx, referer
 *       td.comment_txt (padding 8px 0 8px 20px):
 *         이름 [text size=15 maxlength=20 id=border name=com_board_comment_name]   비밀번호 [password size=15 maxlength=20]
 *         <textarea id=border name=com_board_comment_contents cols=96 rows=3 onkeyup=strlen_escape(this) style="float:left;margin-right:5px">
 *         [comment_write.gif 68x38 댓글달기 image submit, hspace 10]
 *         * 한글 1000자 까지만 입력가능 : [text size=3 id=txtDiplay border:0 value=0] 자
 *   </table>
 *   <table class=board_comment_bgcolor>  ← 댓글 목록 (댓글마다 width 95% 가운데 정렬 내부 table)
 *     td width=100 class=comment_name (#0055B5) 이름 | td.comment_txt 내용 | td width=170 right: <font #999999>YYYY-MM-DD HH:MM:SS</font> [수정 13x12] [삭제 13x12]
 *     댓글 사이 1px #EEEEEE 구분선, 목록 끝에 bg_dot.gif 점선(96%) + 5px 여백
 *
 * 인터랙션
 *   - com_board_commentCheck: 이름/비밀번호/내용 필수 → FormCheck alert "이름을(를) 정확히 입력하세요." 등
 *   - strlen_escape: 입력할 때마다 글자수(한글 기준) 카운트, 1000자 초과 시 alert("1000자 이상 입력 하실 수 없습니다. ") 후 잘라냄
 *   - 댓글 수정/삭제 아이콘 → 450x250 비밀번호 팝업 (여기서는 alert 데모)
 *   - 등록 성공 시 원본은 POST 후 새로고침. 여기서는 데모 alert 후 목록에 임시로 추가.
 */
export default function CommentSection({ comments: initial }: { comments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [count, setCount] = useState(0);

  /**
   * 원본 strlen_escape() 이식: escape() 결과 길이가 3 초과인 문자(한글 등)를 세고,
   * 누적 카운트가 1000 을 넘으면 alert 후 거기까지만 남긴다.
   */
  function onContentsChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    let tmpbyte = 0;
    let tmpStr = "";
    let truncated = false;
    for (let i = 0; i < v.length; i++) {
      const ch = v.charAt(i);
      // 원본은 escape(ch).length > 3 – 한글은 "%uAC00"(6), 영숫자는 1~3. encodeURIComponent 로 대체 (한글 9, 영숫자 1~3)
      if (encodeURIComponent(ch).length > 3) tmpbyte++; // 한글일 경우
      if (tmpbyte > 1000) {
        alert("1000자 이상 입력 하실 수 없습니다. ");
        truncated = true;
        break;
      }
      tmpStr += ch;
      tmpbyte++;
    }
    setContents(truncated ? tmpStr : v);
    setCount(Math.min(tmpbyte, 1000));
  }

  /** com_board_commentCheck → FormCheck.init('com_board_form') */
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return alert("이름을(를) 정확히 입력하세요.");
    if (!password.trim()) return alert("비밀번호을(를) 정확히 입력하세요.");
    if (!contents.trim()) return alert("내용을(를) 정확히 입력하세요.");
    alert("[데모] 댓글이 등록되었습니다.");
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setComments([...comments, { name: name.trim(), text: contents.trim(), time }]);
    setName("");
    setPassword("");
    setContents("");
    setCount(0);
  }

  const inputCls = "border border-[#D4D4D4] bg-white text-[12px] text-[#666] h-[20px] px-1";

  return (
    <div className="board_comment_area">
      {/* 5px 여백 (원본 <div style="overflow:hidden;height:5px">) */}
      <div className="h-[5px]" />

      {/* 댓글 작성 폼 – bg #F6F6F6 */}
      <div className="board_comment_bgcolor w-full bg-[#F6F6F6]">
        <form name="com_board_form" onSubmit={onSubmit} className="m-0">
          <div className="comment_txt py-[8px] pl-[20px] pr-0 text-[12px] text-black">
            {/* 이름 / 비밀번호 */}
            <label className="mr-[20px]">
              이름{" "}
              <input
                type="text"
                name="com_board_comment_name"
                maxLength={20}
                size={15}
                className={`${inputCls} ml-[5px] w-[120px]`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              비밀번호{" "}
              <input
                type="password"
                name="com_board_comment_password"
                maxLength={20}
                size={15}
                className={`${inputCls} ml-[5px] w-[120px]`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* 5px 여백 */}
            <div className="h-[5px]" />
            {/* textarea (cols=96 rows=3, float:left, margin-right 5px) + 댓글달기 버튼 (hspace 10) */}
            <div className="flex items-start">
              <textarea
                name="com_board_comment_contents"
                cols={96}
                rows={3}
                className="mr-[5px] h-[52px] w-[590px] resize-none border border-[#D4D4D4] bg-white p-1 text-[12px] text-[#666]"
                value={contents}
                onChange={onContentsChange}
              />
              <button type="submit" className="mx-[10px] cursor-pointer border-0 bg-transparent p-0" title="댓글달기">
                <BoardButton kind="comment_write" />
              </button>
            </div>
            {/* 글자수 카운터 (원본 #txtDiplay, border 0, size 3) */}
            <div className="mt-[8px]">
              * 한글 1000자 까지만 입력가능 :{" "}
              <input
                type="text"
                id="txtDiplay"
                size={3}
                readOnly
                value={count}
                className="w-[30px] border-0 bg-transparent text-center text-[12px] text-black"
              />{" "}
              자
            </div>
          </div>
        </form>
      </div>

      {/* 댓글 목록 – bg #F6F6F6 */}
      {comments.length > 0 && (
        <div className="board_comment_bgcolor w-full bg-[#F6F6F6] pt-[5px]">
          <table className="mx-auto w-[95%] border-collapse">
            <tbody>
              {comments.map((c, i) => (
                <CommentRow key={i} comment={c} last={i === comments.length - 1} />
              ))}
            </tbody>
          </table>
          {/* 목록 끝 점선 (bg_dot.gif 4x1 반복, 96%) + 5px 여백 */}
          <div className="flex h-[15px] items-center justify-center">
            <div className="w-[96%] border-t border-dotted border-[#D4D4D4]" />
          </div>
          <div className="h-[5px]" />
        </div>
      )}
    </div>
  );
}

/** 댓글 1행: 이름(#0055B5, 100px) | 내용 | 시각(#999999) + 수정/삭제 아이콘 (170px 우측) */
function CommentRow({ comment, last }: { comment: Comment; last: boolean }) {
  return (
    <>
      <tr>
        <td className="comment_name w-[100px] pt-[4px] align-top text-[12px] text-[#0055B5]">{comment.name}</td>
        <td className="comment_txt pt-[4px] text-left text-[12px] text-black">{comment.text}</td>
        <td className="comment_txt w-[170px] pt-[4px] text-right text-[12px] whitespace-nowrap">
          <span className="text-[#999999]">{comment.time}</span>{" "}
          {/* 댓글 수정 → com_board_comment_action('comment_update_form…') 450x250 비밀번호 팝업 */}
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0 align-middle"
            title="댓글 수정"
            onClick={() => alert("[데모] 댓글 수정 – 원본은 비밀번호 확인 팝업(450x250)이 열립니다.")}
          >
            <BoardButton kind="comment_modify" />
          </button>{" "}
          {/* 댓글 삭제 → com_board_comment_action('comment_delete_form…') */}
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0 align-middle"
            title="댓글 삭제"
            onClick={() => alert("[데모] 댓글 삭제 – 원본은 비밀번호 확인 팝업(450x250)이 열립니다.")}
          >
            <BoardButton kind="comment_delete" />
          </button>
        </td>
      </tr>
      {/* 댓글 사이 1px #EEEEEE 구분선 (마지막 댓글 뒤에는 없음) */}
      {!last && (
        <tr>
          <td colSpan={3} className="h-px bg-[#EEEEEE] p-0" />
        </tr>
      )}
    </>
  );
}
