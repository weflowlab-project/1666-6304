"use client";

import { useRef, useState, type FormEvent } from "react";
import Placeholder from "@/components/Placeholder";

/**
 * 빠른상담신청 폼 (원본 /default/sub_04/sub_04_01.php – 카페24 formmail #4)
 *
 * 원본 마크업
 *   <form name="com_formmail" method="post" action="…sub_04_01.php?ip=…" enctype="multipart/form-data">
 *   <table width=100% border=1 bordercolor=#E5E5E5 style="border-collapse:collapse">   ← 1px 회색 격자
 *     <tr><td colspan=2 height=2 bgcolor=#E5E5E5>                                        ← 상단 2px 회색 라인
 *     <tr height=30><td width=20% class=formmail_title_bgcolor(#F7F7F7)>신청인</td><td class=formmail_cell_bgcolor><input name=name></td>
 *     …연락처(phone_no1 - phone_no2 - phone_no3) / 차량명(add1) / 차량연식(add2) / 필요금액(add3) / 기타(궁금사항)(add4)
 *     <tr><td colspan=2 height=1 bgcolor=#E5E5E5>                                        ← 하단 1px 라인
 *   </table>
 *   <div align=center>[확인 btn_confirm.gif 43x20 → com_formmail_formCheck()] [취소 cancel.gif 51x24 → form.reset()]</div>
 *
 * 원본 인터랙션 (/cjs/formmail.js + javascript.lib.js FormCheck)
 *   - 확인 클릭 → 필수 항목(신청인, 연락처 3칸)만 검사, 첫 실패 항목에서 alert 후 focus
 *       "신청인을(를) 정확히 입력하세요. [1 ~ 50 글자]"
 *       "연락처을(를) 숫자로만 정확히 입력하세요. [1 ~ 4 글자]"   (phone_no1/2/3 각각)
 *   - 통과 시 값들을 카페24 AuthSSLManager 로 암호화(encrypt_data)해 같은 URL 로 POST → 관리자 메일 발송
 *     → 여기서는 alert 데모로 대체 (TODO: 서버 액션/API 로 메일 발송 연결)
 *   - 취소 클릭 → form.reset() (확인창 없음)
 *   - 개인정보 동의 체크박스, 캡차, 셀렉트, textarea 없음 (원본 그대로)
 */
type Field = { key: string; label: string; required?: boolean; maxLength?: number };

const EXTRA_FIELDS: Field[] = [
  { key: "add1", label: "차량명", maxLength: 20 },
  { key: "add2", label: "차량연식", maxLength: 20 },
  { key: "add3", label: "필요금액", maxLength: 20 },
  { key: "add4", label: "기타(궁금사항)", maxLength: 20 },
];

export default function ConsultForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false); // 원본 comFormmailFormCheckFlag (중복 제출 방지)

  /** 원본 com_formmail_formCheck() */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const f = e.currentTarget;
    const get = (n: string) => f.elements.namedItem(n) as HTMLInputElement;

    // 신청인: 1~50자
    const name = get("name");
    if (name.value.trim().length < 1 || name.value.trim().length > 50) {
      alert("신청인을(를) 정확히 입력하세요. [1 ~ 50 글자]");
      name.focus();
      return;
    }
    // 연락처: 세 칸 각각 숫자 1~4자
    for (const n of ["phone_no1", "phone_no2", "phone_no3"]) {
      const el = get(n);
      if (!/^[0-9]{1,4}$/.test(el.value)) {
        alert("연락처을(를) 숫자로만 정확히 입력하세요. [1 ~ 4 글자]");
        el.focus();
        return;
      }
    }

    setSubmitting(true);
    // TODO: 원본은 encrypt_data 를 붙여 POST → 메일 발송. 여기서는 데모 알림.
    const data = new FormData(f);
    const summary = [
      `신청인: ${data.get("name")}`,
      `연락처: ${data.get("phone_no1")}-${data.get("phone_no2")}-${data.get("phone_no3")}`,
      ...EXTRA_FIELDS.map((x) => `${x.label}: ${data.get(x.key) || "-"}`),
    ].join("\n");
    alert(`[데모] 상담 신청이 접수되었습니다.\n\n${summary}`);
    f.reset();
    setSubmitting(false);
  };

  return (
    <form ref={formRef} name="com_formmail" onSubmit={onSubmit} className="w-[730px] bg-white">
      {/* 숨김 필드 (원본) */}
      <input type="hidden" name="com_formmail4_basic" value="send" />
      <input type="hidden" name="template" value="bizdemo1703" />

      <table className="w-full border-collapse text-[12px] text-[#333]">
        <tbody>
          {/* 상단 2px 회색 라인 */}
          <tr>
            <td colSpan={2} className="h-[2px] bg-[#E5E5E5] p-0" />
          </tr>

          {/* 신청인 (필수) */}
          <FormRow label="신청인">
            <input type="text" name="name" size={50} maxLength={100} className="formmail_border h-[20px] px-1" />
          </FormRow>

          {/* 연락처 (필수, 3칸) */}
          <FormRow label="연락처">
            <input type="text" name="phone_no1" size={4} maxLength={5} inputMode="numeric" className="formmail_border h-[20px] px-1" />
            {" - "}
            <input type="text" name="phone_no2" size={5} maxLength={5} inputMode="numeric" className="formmail_border h-[20px] px-1" />
            {" - "}
            <input type="text" name="phone_no3" size={5} maxLength={5} inputMode="numeric" className="formmail_border h-[20px] px-1" />
          </FormRow>

          {/* 선택 항목 4개 (원본 add1~add4, 각각 hidden addN_attr=1 동반) */}
          {EXTRA_FIELDS.map((field) => (
            <FormRow key={field.key} label={field.label}>
              <input type="text" name={field.key} size={20} maxLength={field.maxLength} className="formmail_border h-[20px] px-1" />
              <input type="hidden" name={`${field.key}_attr`} value="1" />
            </FormRow>
          ))}

          {/* 하단 1px 회색 라인 */}
          <tr>
            <td colSpan={2} className="h-[1px] bg-[#E5E5E5] p-0" />
          </tr>
        </tbody>
      </table>

      {/* 버튼 영역: 확인 / 취소 (원본 이미지 버튼, vspace=7) */}
      <div className="my-[7px] flex items-center justify-center gap-[4px]">
        <button type="submit" className="cursor-pointer border-0 bg-transparent p-0" disabled={submitting}>
          <Placeholder width={43} height={20} note="btn_confirm.gif" tone="light" className="!border-solid !border-[#DBDBDB] !bg-white">
            <span className="text-[11px] font-bold text-[#333]">▫ 확인</span>
          </Placeholder>
        </button>
        <button type="reset" className="cursor-pointer border-0 bg-transparent p-0">
          <Placeholder width={51} height={24} note="cancel.gif" tone="light" className="!border-solid !border-[#CBCBCB] !bg-[#F6F6F6]">
            <span className="text-[11px] text-[#7F7974]">취소</span>
          </Placeholder>
        </button>
      </div>
    </form>
  );
}

/** 폼 1행: 좌측 20% 라벨(#F7F7F7) / 우측 80% 입력칸(흰색, padding-left 10), 높이 30px, 1px #E5E5E5 격자 */
function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="h-[30px]">
      <th
        scope="row"
        className="formmail_title_bgcolor w-[20%] border border-[#E5E5E5] bg-[#F7F7F7] text-center text-[12px] font-normal text-black"
      >
        {label}
      </th>
      <td className="formmail_cell_bgcolor w-[80%] border border-[#E5E5E5] bg-white pl-[10px] text-[12px] text-[#333]">
        {children}
        {"  "}
      </td>
    </tr>
  );
}
