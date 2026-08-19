import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import type { LoanPage } from "@/lib/loans";

/**
 * 대출 조건표 페이지 본문 (자동차대출 5종 / 부동산담보대출 2종 공통 템플릿)
 *
 * 원본 마크업
 *   <table width="730" cellpadding="5" cellspacing="1" bgcolor="E4E4E4">   ← 1px 연회색 격자
 *     <tr><td width="180" align="center" bgcolor="#FFFFFF"><strong>대상</strong></td>
 *         <td bgcolor="#FFFFFF">만 20세 ~</td></tr> ...
 *   </table>
 *   (빈 줄)
 *   <a href="/default/sub_04/sub_04_01.php"><img sub_daechul_bm_bt.gif 205x55 "대출신청하기"></a>  ← 가운데 정렬
 *
 * 인터랙션: "대출신청하기" 버튼 클릭 → 빠른상담신청 페이지(/consult) 이동. 그 외 없음.
 */
export default function LoanConditions({ page }: { page: LoanPage }) {
  return (
    <div className="w-[730px]">
      {page.sections.map((section, i) => (
        <div key={i}>
          {/* 소제목 (설정/할부/타사대납차 페이지만 존재, 굵은 검정 13px) */}
          {section.subheading && (
            <div className="mb-[3px] mt-[10px] text-[13px] font-bold text-black">{section.subheading}</div>
          )}
          <ConditionTable rows={section.rows} />
          <div className="h-[20px]" />
        </div>
      ))}

      {/* 대출신청하기 CTA 버튼 (sub_daechul_bm_bt.gif 205x55) */}
      <div className="flex justify-center">
        <ApplyButton />
      </div>
    </div>
  );
}

/** 2열 조건표 – 좌 180px 항목명 / 우 내용, 1px #E4E4E4 격자, 셀 패딩 5px */
export function ConditionTable({ rows }: { rows: LoanPage["sections"][number]["rows"] }) {
  return (
    <table className="w-[730px] border-separate border-spacing-[1px] bg-[#E4E4E4] text-[12px] leading-[20px] text-[#666]">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className="w-[180px] bg-white p-[5px] text-center font-bold">
              {row.label}
            </th>
            <td className="whitespace-pre-wrap bg-white p-[5px] text-left">
              {row.value.map((line, i) => (
                <span key={i}>
                  {line || " "}
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

/** "대출신청하기" 버튼 – 원본은 파란 광택 그라데이션 이미지 버튼 → 빠른상담신청 페이지 */
export function ApplyButton() {
  return (
    <Link href="/consult" className="block no-underline" aria-label="대출신청하기">
      <Placeholder width={205} height={55} tone="dark" note="sub_daechul_bm_bt.gif" className="rounded-[6px] !bg-gradient-to-b !from-[#1a86ad] !to-[#095384] !border-[#066593] !border-solid">
        <span className="text-[20px] font-bold text-white drop-shadow">대출신청하기</span>
      </Placeholder>
    </Link>
  );
}
