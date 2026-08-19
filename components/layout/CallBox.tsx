import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/menu";

/**
 * 전화 상담 박스 (서브 페이지 사이드바 하단, 190px 폭)
 *
 * 원본 자리: SMS 빠른상담신청 폼(190x256). 접수처가 없는 폼은 문의가 유실되므로 전화 안내로 교체했다.
 *
 * ⚠️ 이 컴포넌트는 아직 현대화하지 않은 서브 페이지(회사소개·보유차량·이용안내·FAQ)에서만 쓰인다.
 *    메인 페이지는 이미 화면 전체 폭 구조로 바뀌었고, 서브 페이지도 같은 방식으로 정리하면
 *    사이드바와 함께 이 파일도 필요 없어진다.
 */
export default function CallBox() {
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <div className="box-border w-[190px] border border-[#dadada] bg-white pb-[10px] text-center">
      {/* 제목 – 원본 title_sms.gif (190x41) 자리 */}
      <Placeholder width={188} height={41} tone="blue" note="title_call.gif">
        <span className="text-[14px] font-bold text-[#1b4f80]">전화 상담 안내</span>
      </Placeholder>

      <div className="px-[10px] pt-[10px]">
        <p className="text-[12px] leading-[18px] text-[#666]">
          차종과 이용 기간만
          <br />
          말씀해 주세요.
        </p>

        <a
          href={telHref}
          className="mt-[8px] block text-[22px] font-extrabold leading-tight tracking-tight text-[#1c3f7a]"
        >
          {SITE.phone}
        </a>

        <p className="mt-[6px] text-[11px] leading-[16px] text-[#999]">{SITE.hours}</p>

        <a href={telHref} className="mt-[10px] inline-block">
          <Placeholder width={120} height={26} tone="dark" note="btn_call.gif">
            <span className="text-[12px] font-bold">전화 상담하기</span>
          </Placeholder>
        </a>
      </div>
    </div>
  );
}
