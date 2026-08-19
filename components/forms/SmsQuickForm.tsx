"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Placeholder from "@/components/Placeholder";

/**
 * SMS 빠른상담신청 폼 (원본: 홈·모든 서브 페이지 좌측 사이드바 하단 <div id="sms">, 190x256)
 *
 * 원본 구조
 *   <h3><img title_sms.gif "SMS 빠른상담신청" 190x41></h3>
 *   <dl>
 *     <dt>성 명</dt><dd><input send_name></dd>
 *     <dt>전 화</dt><dd><input send_no1 maxlength=3> - <input send_no2 maxlength=4> - <input send_no3 maxlength=4></dd>
 *     <dt>내 용</dt><dd><textarea send_contents></dd>
 *   </dl>
 *   <p><a onClick="checkSms()"><img btn_counsel.gif "상담 신청하기" 80x20></a></p>
 *   + 숨겨진 iframe(sms_send) 으로 POST 전송
 *
 * 원본 인터랙션(자바스크립트) 그대로 재현
 *   - checkSms(): 성명 → 전화1/2/3 → 내용 순으로 빈 값 검사, alert 후 focus, 개인정보 동의 체크박스가 있으면 검사
 *   - isCheckOnlyNum(): 전화번호 입력칸은 숫자 키(0~9)만 허용
 *   - checkContents(): 내용은 2000 Byte(한글 2byte) 초과 시 alert 후 잘라냄
 *   - 전송은 서버(PHP)로 POST 하던 것을 여기서는 alert 로 대체 (TODO: API 연동)
 */
export default function SmsQuickForm() {
  const [name, setName] = useState("");
  const [no1, setNo1] = useState("");
  const [no2, setNo2] = useState("");
  const [no3, setNo3] = useState("");
  const [contents, setContents] = useState("");
  const [agree, setAgree] = useState(true); // 원본엔 sms_use_personal 체크박스가 실제 렌더링되지 않았음(옵션)

  const nameRef = useRef<HTMLInputElement>(null);
  const no1Ref = useRef<HTMLInputElement>(null);
  const no2Ref = useRef<HTMLInputElement>(null);
  const no3Ref = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);

  /** 원본 isCheckOnlyNum: 숫자 키만 허용 */
  const onlyNumber = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
  };

  /** 원본 checkContents: 2000byte 제한(한글 2byte 계산) */
  const limitBytes = (value: string, maxLen = 2000) => {
    let bytes = 0;
    let out = "";
    for (const ch of value) {
      bytes += escape(ch).length > 4 ? 2 : 1;
      if (bytes <= maxLen) out += ch;
      else {
        alert(`메시지는 ${maxLen} Byte 이하로 입력해주세요.`);
        break;
      }
    }
    return out;
  };

  /** 원본 checkSms() */
  const checkSms = (e: FormEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("이름을 적어주세요!");
      nameRef.current?.focus();
      return false;
    }
    if (no1 === "") {
      alert("휴대폰 번호를 적어주세요");
      no1Ref.current?.focus();
      return false;
    }
    if (no2 === "") {
      alert("휴대폰 번호를 적어주세요");
      no2Ref.current?.focus();
      return false;
    }
    if (no3 === "") {
      alert("휴대폰 번호를 적어주세요");
      no3Ref.current?.focus();
      return false;
    }
    if (contents === "") {
      alert("상담내용을 적어주세요!");
      contentsRef.current?.focus();
      return false;
    }
    if (!agree) {
      alert("개인정보의 수집 및 이용에 동의를 체크해주세요");
      agreeRef.current?.focus();
      return false;
    }
    // TODO: 원본은 document.smsFrm.submit() 으로 숨김 iframe(sms_send)에 POST → SMS 발송
    alert(`[데모] SMS 상담 신청이 접수되었습니다.\n${name} / ${no1}-${no2}-${no3}\n${contents}`);
    setName("");
    setNo1("");
    setNo2("");
    setNo3("");
    setContents("");
    return true;
  };

  return (
    // 원본 #sms : 190x256, 하단 배경이미지(bottom_bg.gif) – 여기서는 연한 테두리 박스로 대체
    <form
      id="sms"
      name="smsFrm"
      onSubmit={checkSms}
      className="box-border w-[190px] border border-[#dadada] bg-white pb-[8px] text-[12px] text-[#666]"
    >
      {/* 제목 이미지 title_sms.gif (190x41) "SMS 빠른상담신청" */}
      <h3 className="m-0">
        <Placeholder width={188} height={41} tone="blue" note="title_sms.gif">
          <span className="text-[14px] font-bold text-[#1b4f80]">SMS 빠른상담신청</span>
        </Placeholder>
      </h3>

      <dl className="m-0 mt-[6px] w-[190px]">
        {/* 성명 */}
        <div className="flex items-center pl-[10px]">
          <dt className="w-[36px] pr-[4px] pt-[1px]">성 명</dt>
          <dd className="m-0">
            <input
              ref={nameRef}
              type="text"
              name="send_name"
              id="send_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputType h-[18px] w-[102px] border border-[#dadada] px-1 text-[12px]"
            />
          </dd>
        </div>
        {/* 전화 – 3칸 분리 입력, 숫자만 */}
        <div className="mt-[4px] flex items-center pl-[10px]">
          <dt className="w-[36px] pr-[4px] pt-[1px]">전 화</dt>
          <dd className="m-0 flex items-center gap-[2px]">
            <input
              ref={no1Ref}
              type="text"
              name="send_no1"
              id="send_no1"
              maxLength={3}
              inputMode="numeric"
              value={no1}
              onKeyDown={onlyNumber}
              onChange={(e) => setNo1(e.target.value.replace(/\D/g, ""))}
              className="tel h-[18px] w-[30px] border border-[#dadada] px-1 text-[12px]"
            />
            <span>-</span>
            <input
              ref={no2Ref}
              type="text"
              name="send_no2"
              id="send_no2"
              maxLength={4}
              inputMode="numeric"
              value={no2}
              onKeyDown={onlyNumber}
              onChange={(e) => setNo2(e.target.value.replace(/\D/g, ""))}
              className="tel h-[18px] w-[30px] border border-[#dadada] px-1 text-[12px]"
            />
            <span>-</span>
            <input
              ref={no3Ref}
              type="text"
              name="send_no3"
              id="send_no3"
              maxLength={4}
              inputMode="numeric"
              value={no3}
              onKeyDown={onlyNumber}
              onChange={(e) => setNo3(e.target.value.replace(/\D/g, ""))}
              className="tel h-[18px] w-[30px] border border-[#dadada] px-1 text-[12px]"
            />
          </dd>
        </div>
        {/* 내용 – 2000byte 제한 */}
        <div className="mt-[4px] flex items-start pl-[10px]">
          <dt className="w-[36px] pr-[4px] pt-[1px]">내 용</dt>
          <dd className="txtArea m-0">
            <textarea
              ref={contentsRef}
              name="send_contents"
              id="send_contents"
              value={contents}
              onChange={(e) => setContents(limitBytes(e.target.value))}
              className="sms_text h-[86px] w-[130px] resize-none border border-[#dadada] p-1 text-[12px]"
            />
          </dd>
        </div>
      </dl>

      {/* 개인정보 수집 동의 (원본에는 조건부로만 존재 – 옵션) */}
      <label className="mt-[6px] flex items-center justify-center gap-1 text-[11px]">
        <input
          ref={agreeRef}
          type="checkbox"
          id="sms_use_personal"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        개인정보 수집·이용 동의
      </label>

      {/* 상담 신청하기 버튼 (원본 btn_counsel.gif 80x20 이미지 링크) */}
      <p className="m-0 pt-[5px] text-center">
        <button type="submit" className="cursor-pointer border-0 bg-transparent p-0">
          <Placeholder width={80} height={20} tone="dark" note="btn_counsel.gif">
            <span className="text-[11px] font-bold">상담 신청하기</span>
          </Placeholder>
        </button>
      </p>
    </form>
  );
}
