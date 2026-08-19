import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/menu";

/**
 * 2열 정보표 + 전화 CTA 버튼 (원본 대출 조건표 컴포넌트를 그대로 재사용)
 *
 * 원본 마크업 (틀 그대로 유지)
 *   <table width="730" cellpadding="5" cellspacing="1" bgcolor="E4E4E4">   ← 1px 연회색 격자
 *     <tr><td width="180" align="center" bgcolor="#FFFFFF"><strong>대상</strong></td>
 *         <td bgcolor="#FFFFFF">만 20세 ~</td></tr> ...
 *   </table>
 *   <a href="…sub_04_01.php"><img sub_daechul_bm_bt.gif 205x55 "대출신청하기"></a>  ← 가운데 정렬
 *
 * ⚠️ 업종 전환 변경
 *    · 표 구조·격자·크기는 원본 그대로. 담기는 항목만 대출 조건 → 차량/이용 정보로 바뀐다.
 *    · CTA 버튼: "대출신청하기" → "전화 상담하기". 링크도 상담폼(/consult)이 아니라 tel: 로 연결.
 *      요금 비공개·예약폼 없음 정책이라 전화가 유일한 전환 지점이다.
 */

export type InfoRow = {
  /** 좌측 항목명 (180px, 가운데 정렬, 굵게) */
  label: string;
  /** 우측 내용 – 배열 요소마다 줄바꿈 */
  value: string[];
};

export type InfoSection = {
  /** 표 위 소제목 (없으면 생략) */
  subheading?: string;
  rows: InfoRow[];
};

/**
 * 2열 표 – 좌 180px 항목명 / 우 내용, 1px #E4E4E4 격자, 셀 패딩 5px
 * 폭은 부모에 맞춘다(w-full). 원본은 730px 고정이었으나, 차량 사진과 나란히 놓는 경우
 * 고정폭이면 사진 자리를 밀어내 찌그러지므로 부모가 폭을 정하도록 바꿨다.
 */
export function InfoTable({ rows }: { rows: InfoRow[] }) {
  return (
    <table className="w-full border-separate border-spacing-[1px] bg-[#E4E4E4] text-[12px] leading-[20px] text-[#666]">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className="w-[180px] bg-white p-[5px] text-center font-bold">
              {row.label}
            </th>
            <td className="whitespace-pre-wrap bg-white p-[5px] text-left">
              {row.value.map((line, i) => (
                <span key={i}>
                  {line || " "}
                  {i < row.value.length - 1 && <br />}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** "전화 상담하기" 버튼 – 원본 sub_daechul_bm_bt.gif(205x55, 파란 광택) 자리 */
export function CallCtaButton() {
  return (
    <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="block no-underline" aria-label="전화 상담하기">
      <Placeholder
        width={205}
        height={55}
        tone="dark"
        note="sub_daechul_bm_bt.gif"
        className="rounded-[6px] !border-solid !border-[#066593] !bg-gradient-to-b !from-[#1a86ad] !to-[#095384]"
      >
        <span className="text-[18px] font-bold text-white drop-shadow">전화 상담하기</span>
        <span className="text-[13px] font-bold text-white/90">{SITE.phone}</span>
      </Placeholder>
    </a>
  );
}

/** 표 + CTA 버튼을 묶은 본문 (원본 LoanConditions 와 동일한 구성) */
export default function InfoSections({ sections }: { sections: InfoSection[] }) {
  return (
    <div className="w-[730px]">
      {sections.map((section, i) => (
        <div key={i}>
          {section.subheading && (
            <div className="mb-[3px] mt-[10px] text-[13px] font-bold text-black">{section.subheading}</div>
          )}
          <InfoTable rows={section.rows} />
          <div className="h-[20px]" />
        </div>
      ))}

      <div className="flex justify-center">
        <CallCtaButton />
      </div>
    </div>
  );
}
