import { SITE } from "@/lib/menu";

/**
 * 2열 정보표 + 전화 CTA 버튼
 *
 * 원본(대부업) 대출 조건표의 구조를 이어받았다.
 *   <table cellpadding="5" cellspacing="1" bgcolor="E4E4E4">  ← 1px 연회색 격자
 *     <tr><td width="180" align="center"><strong>항목</strong></td><td>내용</td></tr>
 *
 * 변경 이력
 *   · 담기는 항목: 대출 조건 → 차량/이용 정보
 *   · CTA: "대출신청하기"(상담폼) → "전화 상담하기"(tel:) — 요금 비공개·전화 문의 정책
 *   · 폭: 730px 고정 → 부모에 맞춤(w-full). 모바일 대응을 위해 고정폭을 없앴다.
 *   · 모바일에서는 2열 표가 좁아 읽기 어려우므로, 640px 미만에서는
 *     항목명을 위, 내용을 아래로 쌓아 보여준다.
 */

export type InfoRow = {
  /** 좌측 항목명 */
  label: string;
  /** 우측 내용 – 배열 요소마다 줄바꿈 */
  value: string[];
};

export type InfoSection = {
  /** 표 위 소제목 (없으면 생략) */
  subheading?: string;
  rows: InfoRow[];
};

/** 2열 표 – PC: 좌 180px 항목 / 우 내용, 모바일: 위아래로 쌓임 */
export function InfoTable({ rows }: { rows: InfoRow[] }) {
  return (
    <dl className="w-full overflow-hidden rounded-[4px] border border-[#E4E4E4] text-[13px] leading-[1.7] text-[#666]">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex flex-col sm:flex-row ${i > 0 ? "border-t border-[#E4E4E4]" : ""}`}
        >
          <dt className="bg-[#f7f9fb] px-3 py-2 font-bold text-[#444] sm:w-[180px] sm:shrink-0 sm:border-r sm:border-[#E4E4E4] sm:text-center">
            {row.label}
          </dt>
          <dd className="m-0 min-w-0 flex-1 bg-white px-3 py-2">
            {row.value.map((line, j) => (
              <span key={j} className="block">
                {line || " "}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** "전화 상담하기" 버튼 – 원본의 파란 광택 이미지 버튼을 실제 버튼으로 대체 */
export function CallCtaButton() {
  return (
    <a
      href={`tel:${SITE.phone.replace(/-/g, "")}`}
      className="inline-flex h-[54px] w-full max-w-[280px] items-center justify-center gap-2 rounded-[6px] bg-gradient-to-b from-[#1a86ad] to-[#095384] px-6 text-white shadow-sm transition-opacity hover:opacity-90"
      aria-label={`전화 상담하기 ${SITE.phone}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
      </svg>
      <span className="text-[17px] font-bold">전화 상담하기</span>
    </a>
  );
}

/** 표 + CTA 버튼 묶음 */
export default function InfoSections({ sections }: { sections: InfoSection[] }) {
  return (
    <div className="w-full">
      {sections.map((section, i) => (
        <div key={i}>
          {section.subheading && (
            <div className="mb-[5px] mt-[10px] text-[14px] font-bold text-black">{section.subheading}</div>
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
