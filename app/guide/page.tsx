import type { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { InfoTable, CallCtaButton } from "@/components/table/InfoTable";
import { SITE } from "@/lib/menu";
import {
  GUIDE_SECTIONS,
  DRIVER_REQUIREMENTS,
  REQUIRED_DOCUMENTS,
  QUALIFICATION_NOTES,
  INSURANCE_ROWS,
  CDW_COMPARISON,
  INSURANCE_EXCLUSIONS,
  INSURANCE_NOTES,
  RENTAL_STEPS,
  HANDOVER_FACTS,
  RETURN_CHECKLIST,
  ACCIDENT_STEPS,
  EMERGENCY_FACTS,
  CANCEL_ROWS,
  CANCEL_NOTES,
} from "@/lib/guide";

/**
 * 이용안내 (신설 페이지)
 *
 * 원본 대부업 사이트에는 없던 페이지다. 요금을 공개하지 않기로 했기 때문에,
 * 전화하기 전에 궁금할 내용(대여 자격 · 보험 · 서류 · 인수반납 · 사고 · 취소)을
 * 여기서 풀어주지 않으면 방문자가 그냥 이탈한다.
 *
 * 레이아웃은 원본 서브 페이지 틀 그대로다.
 * (사이드바 + 파란 테두리 콘텐츠 박스 + 730px 본문 + 하단 CTA 버튼,
 *  본문 표는 원본 조건표와 같은 1px #E4E4E4 격자 스타일)
 *
 * ⚠️ "○" 로 표시된 값은 전부 고객사 확인이 필요한 자리표시다. (lib/guide.ts 의 todo 항목)
 *    임의로 채우면 실제 약관과 달라져 분쟁 소지가 있으므로 추측해서 넣으면 안 된다.
 */
export const metadata: Metadata = { title: `이용안내 - ${SITE.name}` };

/** 소제목 – 원본 sub_02_04 페이지의 "- 설정/할부차" 스타일(굵은 검정 13px) */
function SubHeading({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="mb-[5px] mt-[6px] text-[13px] font-bold text-black">
      {no}. {children}
    </div>
  );
}

/** 확인 필요 배지 – 자리표시 값임을 화면에서도 구분할 수 있게 표시 */
function Todo() {
  return (
    <span className="ml-[4px] border border-dashed border-[#d9a441] bg-[#fff9ec] px-[4px] text-[11px] text-[#a9761a]">
      확인 필요
    </span>
  );
}

/** 목록형 안내 (점 불릿) */
function NoteList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-[8px] list-none p-0 text-[12px] leading-[20px] text-[#666]">
      {items.map((t) => (
        <li key={t} className="flex">
          <span className="mr-[5px] text-[#1c5aa8]" aria-hidden>
            ·
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function GuidePage() {
  return (
    <SubPageLayout sectionId="guide" title="이용안내">
      <div className="w-[730px]">
        {/* 목차 – 원본에는 없던 요소지만, 내용이 길어 앵커 이동을 제공한다 */}
        <div className="mb-[18px] border border-[#e5e5e5] bg-[#fafafa] px-[12px] py-[10px]">
          <ul className="flex list-none flex-wrap gap-x-[14px] gap-y-[4px] p-0 text-[12px]">
            {GUIDE_SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#333] hover:text-[#0593B7]">
                  {s.no}. {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 01. 대여 자격 · 필요 서류 */}
        <section id="qualification" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="01">대여 자격 · 필요 서류</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[0].summary}</p>

          <InfoTable
            rows={DRIVER_REQUIREMENTS.map((f) => ({
              label: f.label,
              value: [f.value + (f.todo ? "  ※ 확인 필요" : ""), ...(f.note ? [f.note] : [])],
            }))}
          />

          <div className="mt-[14px]" />
          <div className="mb-[3px] text-[12px] font-bold text-black">대여일 지참 서류</div>
          <InfoTable
            rows={REQUIRED_DOCUMENTS.map((d) => ({
              label: d.name,
              value: [`[${d.level}] ${d.desc}${d.todo ? "  ※ 확인 필요" : ""}`],
            }))}
          />
          <NoteList items={QUALIFICATION_NOTES} />
        </section>

        {/* 02. 보험 안내 */}
        <section id="insurance" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="02">보험 안내</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[1].summary}</p>

          <InfoTable
            rows={INSURANCE_ROWS.map((r) => ({
              label: r.name,
              value: [r.target, `보상 한도 : ${r.limit}${r.todo ? "  ※ 확인 필요" : ""}`, r.note],
            }))}
          />

          <div className="mt-[14px]" />
          <div className="mb-[3px] text-[12px] font-bold text-black">자차보험(차량손해면책) 가입 여부에 따른 차이</div>
          <table className="w-[730px] border-separate border-spacing-[1px] bg-[#E4E4E4] text-[12px] leading-[20px] text-[#666]">
            <thead>
              <tr>
                <th className="w-[180px] bg-white p-[5px] text-center font-bold">구분</th>
                <th className="bg-white p-[5px] text-center font-bold">가입 시</th>
                <th className="bg-white p-[5px] text-center font-bold">미가입 시</th>
              </tr>
            </thead>
            <tbody>
              {CDW_COMPARISON.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="bg-white p-[5px] text-center font-bold">
                    {row.label}
                  </th>
                  <td className="bg-white p-[5px]">{row.covered}</td>
                  <td className="bg-white p-[5px]">{row.notCovered}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-[12px] text-[12px] font-bold text-[#d61c1c]">보험 적용이 제외되는 경우</div>
          <NoteList items={INSURANCE_EXCLUSIONS} />
          <NoteList items={INSURANCE_NOTES} />
        </section>

        {/* 03. 이용 절차 */}
        <section id="process" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="03">이용 절차</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[2].summary}</p>
          <InfoTable
            rows={RENTAL_STEPS.map((s) => ({
              label: `${s.no}. ${s.title}`,
              value: [s.desc, ...(s.points ?? []).map((p) => `· ${p}`)],
            }))}
          />
        </section>

        {/* 04. 차량 인수 · 반납 */}
        <section id="handover" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="04">차량 인수 · 반납</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[3].summary}</p>
          <InfoTable
            rows={HANDOVER_FACTS.map((f) => ({
              label: f.label,
              value: [f.value + (f.todo ? "  ※ 확인 필요" : ""), ...(f.note ? [f.note] : [])],
            }))}
          />
          <div className="mt-[12px] text-[12px] font-bold text-black">반납 전 확인해 주세요</div>
          <NoteList items={RETURN_CHECKLIST} />
        </section>

        {/* 05. 사고 · 고장 시 조치 */}
        <section id="accident" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="05">사고 · 고장 시 조치</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[4].summary}</p>
          <InfoTable
            rows={ACCIDENT_STEPS.map((s) => ({
              label: `${s.no}. ${s.title}`,
              value: [s.desc, ...(s.points ?? []).map((p) => `· ${p}`)],
            }))}
          />
          <div className="mt-[14px]" />
          <InfoTable
            rows={EMERGENCY_FACTS.map((f) => ({
              label: f.label,
              value: [f.value + (f.todo ? "  ※ 확인 필요" : ""), ...(f.note ? [f.note] : [])],
            }))}
          />
        </section>

        {/* 06. 취소 · 환불 */}
        <section id="cancel" className="mb-[26px] scroll-mt-[20px]">
          <SubHeading no="06">취소 · 환불 규정</SubHeading>
          <p className="mb-[8px] text-[12px] leading-[20px] text-[#666]">{GUIDE_SECTIONS[5].summary}</p>
          <InfoTable
            rows={CANCEL_ROWS.map((r) => ({
              label: r.timing,
              value: [`${r.fee}${r.todo ? "  ※ 확인 필요" : ""}`, r.note],
            }))}
          />
          <NoteList items={CANCEL_NOTES} />
        </section>

        {/* 자리표시 안내 – 개발 중에만 노출. 실제 값 확정 후 이 블록은 삭제한다 */}
        <div className="mb-[20px] border border-dashed border-[#d9a441] bg-[#fff9ec] px-[12px] py-[10px] text-[12px] leading-[20px] text-[#a9761a]">
          <b>※ 확인 필요</b> 표시가 붙은 항목과 「○」로 표시된 숫자는 고객사 확인 후 채워야 하는 자리입니다.
          <Todo />
        </div>

        {/* 하단 CTA */}
        <div className="flex justify-center">
          <CallCtaButton />
        </div>
      </div>
    </SubPageLayout>
  );
}
