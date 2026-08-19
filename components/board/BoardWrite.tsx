"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import BoardButton from "@/components/board/BoardButton";
import { listHref, WRITE_FIELD_LABELS, type BoardConfig, type Post, type WriteField } from "@/lib/boards";

/**
 * 게시글 쓰기 / 답글 폼 (클라이언트)
 *
 * 원본 (?com_board_basic=write_form&com_board_id={ID} / reply_form&com_board_idx={idx}):
 *   [3px 상단 룰 #E5E5E5]
 *   <form name=com_board method=post enctype=multipart/form-data onSubmit='return com_board_writeformCheck()'>
 *     hidden com_board_basic=write|reply, template=bizdemo1703, board_id, (reply 시 com_board_idx), honeypot text name=maybe (display:none)
 *     [table border=1 cellpadding=3 bordercolor=#E5E5E5 border-collapse width=100%]  rows h30 class=board
 *       td.board_bgcolor (center, bg #F7F7F7, 12px #000) 라벨 | td.board_desc (width 623, padding 3 0 3 10, line-height 150%) 입력
 *         작성자   [text name=writer maxlength=50 size=50 id=border]
 *         비밀번호 [password name=password maxlength=20 size=20 id=border]
 *         (자유게시판만) 이메일 [text name=receiver_email size=70]      ※ 자유게시판은 비밀번호 → 작성자 → 이메일 → 제목 → 답변메일받기 순
 *         제목     [text name=subject maxlength=100 size=80 class="public_input input_form" id=border]
 *         (자유게시판만) 답변메일받기 [checkbox name=receive_remail[] value=답변메일받기] 답변메일받기
 *       tr colspan=2 center: 카페24 NNEditor WYSIWYG (height 400, toolbar minus full/help/movie/html) + hidden textarea name=description
 *         (자주하는 질문만) 비밀글 [checkbox name=secret[] value=비밀글] 비밀글
 *       tr#bn display:none: 첨부파일 (렌더링 안 됨)
 *   [1px 룰 #E5E5E5]
 *   버튼 행: td w62 [list.gif 목록보기 → 목록] | td center h34 [confirm.gif 확인 = image submit] [cancel.gif 취소 → document.com_board.reset()] | td w62
 *
 * 인터랙션 (com_board_writeformCheck → realBoardCheck → FormCheck.init('com_board'))
 *   alert 문구 (javascript.lib.js FormCheck 그대로):
 *     "작성자을(를) 정확히 입력하세요. [1 ~ 50 글자]"  "비밀번호을(를) 정확히 입력하세요."
 *     "이메일을(를) 정확히 입력하세요."  "제목을(를) 정확히 입력하세요. [1 ~ 100 글자]"  "내용을 입력해주세요."
 *   성공 시 원본은 POST 후 목록으로 이동. 여기서는 alert("[데모] 게시글이 등록되었습니다.") 후 목록으로 이동.
 *   답글(reply_form): 제목이 "RE: <원글 제목>" 으로 프리필. (원본은 password maxlength='Array' 버그가 있으나 무시)
 *   NNEditor 는 400px 높이의 일반 textarea 로 대체.
 */
export default function BoardWrite({
  board,
  replyTo,
}: {
  board: BoardConfig;
  /** 답글 대상 원글 (있으면 답글 모드) */
  replyTo?: Post;
}) {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(replyTo ? `RE: ${replyTo.title}` : "");
  const [receiveMail, setReceiveMail] = useState(false);
  const [description, setDescription] = useState("");
  const [secret, setSecret] = useState(false);

  // 공지사항(board 5, write_auth=2): 원본 write_form 응답은 alert → confirm → 이동 스크립트뿐
  useEffect(() => {
    if (!board.canWrite) {
      alert("게시판 쓰기 권한이 없습니다.");
      if (confirm("확인을 누르면 메인으로 이동하고 취소를 누르면 이전페이지로 이동합니다.")) {
        router.push("/");
      } else {
        router.back();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.canWrite]);

  /** 원본 form reset (취소 버튼: javascript:document.com_board.reset()) */
  function reset() {
    setWriter("");
    setPassword("");
    setEmail("");
    setSubject(replyTo ? `RE: ${replyTo.title}` : "");
    setReceiveMail(false);
    setDescription("");
    setSecret(false);
  }

  /** com_board_writeformCheck() 이식 – 필드 순서대로 검사 */
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    for (const f of board.writeFields) {
      switch (f) {
        case "writer":
          if (!writer.trim() || writer.length > 50) return alert("작성자을(를) 정확히 입력하세요. [1 ~ 50 글자]");
          break;
        case "password":
          if (!password.trim()) return alert("비밀번호을(를) 정확히 입력하세요.");
          break;
        case "email":
          // FormCheck kind=email: /([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)\.([0-9a-zA-Z_-]+)/
          if (!/([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)\.([0-9a-zA-Z_-]+)/.test(email))
            return alert("이메일을(를) 정확히 입력하세요.");
          break;
        case "subject":
          if (!subject.trim() || subject.length > 100) return alert("제목을(를) 정확히 입력하세요. [1 ~ 100 글자]");
          break;
        case "description":
          if (!description.trim()) return alert("내용을 입력해주세요.");
          break;
        default:
          break;
      }
    }
    alert("[데모] 게시글이 등록되었습니다.");
    router.push(listHref(board.id));
  }

  if (!board.canWrite) {
    // 알림 후 이동하는 동안 빈 화면 (원본도 스크립트만 내려옴)
    return <div className="w-[730px] min-h-[100px]" />;
  }

  const inputCls = "h-[20px] border border-[#D4D4D4] bg-white px-1 text-[12px] text-[#666]";
  const labelCls = "board_bgcolor w-[100px] border border-[#E5E5E5] bg-[#F7F7F7] text-center text-[12px] text-black";
  const descCls = "board_desc border border-[#E5E5E5] py-[3px] pl-[10px] text-left text-[12px] leading-[150%]";

  /** 필드별 행 렌더링 */
  const renderField = (f: WriteField) => {
    switch (f) {
      case "writer":
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.writer}</td>
            <td className={descCls}>
              <input type="text" name="writer" maxLength={50} size={50} className={`${inputCls} w-[360px]`} value={writer} onChange={(e) => setWriter(e.target.value)} />
            </td>
          </tr>
        );
      case "password":
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.password}</td>
            <td className={descCls}>
              <input type="password" name="password" maxLength={20} size={20} className={`${inputCls} w-[150px]`} value={password} onChange={(e) => setPassword(e.target.value)} />
            </td>
          </tr>
        );
      case "email":
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.email}</td>
            <td className={descCls}>
              <input type="text" name="receiver_email" size={70} className={`${inputCls} w-[500px]`} value={email} onChange={(e) => setEmail(e.target.value)} />
            </td>
          </tr>
        );
      case "subject":
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.subject}</td>
            <td className={descCls}>
              <input type="text" name="subject" maxLength={100} size={80} className={`${inputCls} public_input input_form w-[560px]`} value={subject} onChange={(e) => setSubject(e.target.value)} />
            </td>
          </tr>
        );
      case "receiveMail":
        // 원본: 내부 table.board 안에 checkbox + "답변메일받기" 텍스트
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.receiveMail}</td>
            <td className={descCls}>
              <label className="inline-flex items-center gap-1 text-[12px] text-[#333]">
                <input type="checkbox" name="receive_remail[]" value="답변메일받기" checked={receiveMail} onChange={(e) => setReceiveMail(e.target.checked)} />
                답변메일받기
              </label>
            </td>
          </tr>
        );
      case "description":
        // 원본: NNEditor (WYSIWYG iframe, 400px) → 여기서는 textarea 400px
        return (
          <tr key={f} className="board">
            <td colSpan={2} className="border border-[#E5E5E5] p-[3px] text-center">
              <textarea
                name="description"
                className="h-[400px] w-full resize-none border border-[#D4D4D4] bg-white p-[5px] text-[12px] text-[#666]"
                placeholder="(원본: 카페24 NNEditor 위지윅 편집기 400px – 텍스트 영역으로 대체)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>
          </tr>
        );
      case "secret":
        // 자주하는 질문(board 12)만: 내부 table.board 안에 checkbox name=secret[] value=비밀글
        return (
          <tr key={f} className="board h-[30px]">
            <td className={labelCls}>{WRITE_FIELD_LABELS.secret}</td>
            <td className={descCls}>
              <label className="inline-flex items-center gap-1 text-[12px] text-[#333]">
                <input type="checkbox" name="secret[]" value="비밀글" checked={secret} onChange={(e) => setSecret(e.target.checked)} />
                비밀글
              </label>
            </td>
          </tr>
        );
    }
  };

  return (
    <div className="w-[730px] bg-white text-left" style={{ fontFamily: "굴림, Gulim, 돋움, Dotum, sans-serif" }}>
      {/* 3px 상단 룰 */}
      <div className="h-[3px] bg-[#E5E5E5]" />

      <form name="com_board" onSubmit={onSubmit} className="m-0" autoComplete="off">
        {/* hidden: com_board_basic=write|reply, template, board_id, com_board_idx(답글), honeypot maybe */}
        <input type="hidden" name="com_board_basic" value={replyTo ? "reply" : "write"} />
        <input type="hidden" name="board_id" value={board.comBoardId} />
        {replyTo && <input type="hidden" name="com_board_idx" value={replyTo.idx} />}
        <input type="text" name="maybe" className="hidden" tabIndex={-1} aria-hidden readOnly value="" />

        {/* 입력 테이블 (border=1 cellpadding=3 bordercolor=#E5E5E5) */}
        <table className="w-full border-collapse">
          <tbody>
            {board.writeFields.map(renderField)}
            {/* tr#bn 첨부파일 – 원본 display:none (파일 입력 없음) */}
            <tr id="bn" className="hidden">
              <td colSpan={2}>첨부 파일</td>
            </tr>
          </tbody>
        </table>

        {/* 1px 룰 */}
        <div className="h-px bg-[#E5E5E5]" />

        {/* 버튼 행: [62px 목록보기] [가운데 확인/취소] [62px] */}
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-[62px] py-[7px] align-middle">
                <Link href={listHref(board.id)} title="목록보기" className="inline-flex">
                  <BoardButton kind="list" />
                </Link>
              </td>
              <td className="bbsnewf5 h-[34px] text-center align-middle">
                <span className="inline-flex items-center gap-[4px]">
                  {/* 확인 = <input type=image src=confirm.gif> (submit) */}
                  <button type="submit" className="cursor-pointer border-0 bg-transparent p-0" title="확인">
                    <BoardButton kind="confirm" />
                  </button>
                  {/* 취소 = javascript:document.com_board.reset() */}
                  <button type="button" className="cursor-pointer border-0 bg-transparent p-0" title="취소" onClick={reset}>
                    <BoardButton kind="cancel" />
                  </button>
                </span>
              </td>
              <td className="w-[62px]" />
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
