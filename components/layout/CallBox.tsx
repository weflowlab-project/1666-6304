import { SITE } from "@/lib/menu";

/**
 * 전화 상담 박스
 *
 * 원본 자리: SMS 빠른상담신청 폼(190x256, 성명·전화·내용 입력).
 * 접수처가 없는 폼은 문의가 유실되므로 전화 안내로 교체했다.
 *
 * 변경: 190px 고정 → 유동(모바일에서는 가로로 넓게, lg 이상 사이드에서는 좁게).
 *       이미지 자리 표시 제거.
 */
export default function CallBox() {
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-[4px] border border-[#dadada] bg-white text-center lg:max-w-none">
      {/* 제목 */}
      <p className="bg-[#eaf4fd] py-2.5 text-[14px] font-bold text-[#1b4f80]">전화 상담 안내</p>

      <div className="px-4 py-4">
        <p className="text-[13px] leading-[1.6] text-[#666]">
          차종과 이용 기간만
          <br />
          말씀해 주세요.
        </p>

        <a
          href={telHref}
          className="mt-2 block text-[24px] font-extrabold leading-tight tracking-tight text-[#1c3f7a]"
        >
          {SITE.phone}
        </a>

        <p className="mt-1 text-[12px] leading-[1.5] text-[#999]">{SITE.hours}</p>

        <a
          href={telHref}
          className="mt-3 inline-flex h-[38px] w-full items-center justify-center gap-1.5 rounded-[4px] bg-[#1c3f7a] px-4 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
          </svg>
          전화 상담하기
        </a>
      </div>
    </div>
  );
}
