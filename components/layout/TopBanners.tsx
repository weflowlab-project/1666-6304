import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 콘텐츠 상단 3단 배너 (홈·모든 서브 페이지 공통)
 *
 * 원본은 288x112 / 247x117 / 244x117 이미지 3장이었다.
 * 이미지 자리 표시를 없애고 실제 텍스트 블록으로 만들었으며, 폭은 유동으로 바꿨다.
 *
 * 반응형: 모바일 1열 → sm 이상 3열
 */
export default function TopBanners() {
  const telHref = `tel:${SITE.phone.replace(/-/g, "")}`;

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      {/* 전화 상담 안내 */}
      <a
        href={telHref}
        className="flex items-center gap-3 rounded-[4px] border border-[#e5e5e5] bg-white px-4 py-4 transition-colors hover:border-[#9ccbee]"
      >
        <span className="text-[30px] leading-none" aria-hidden>
          🎧
        </span>
        <span className="min-w-0">
          <span className="block text-[12px] text-[#666]">전화 한 통이면 상담 완료</span>
          <span className="block text-[24px] font-extrabold leading-tight tracking-tight text-[#d61c1c]">
            {SITE.phone}
          </span>
        </span>
      </a>

      {/* 영업 지역 안내 */}
      <div className="rounded-[4px] border border-[#e5e5e5] bg-white px-4 py-4 text-[12px] leading-[1.6] text-[#555]">
        <p className="text-[15px] font-bold text-[#222]">영업 지역 안내</p>
        <p className="mb-1 text-[12px]">가까운 지점에서 도와드립니다.</p>
        <p>
          <b className="text-[#1c5aa8]">경기권</b> 성남/분당/수원/안양/안산/의정부/일산/평택/오산/화성/천안 등
        </p>
        <p>
          <b className="text-[#1c5aa8]">서울권</b> 강남/강동/송파/강서 서울전지역
        </p>
        <p className="text-[#d61c1c]">*지역에 따라 차량 인수 방법 상이*</p>
      </div>

      {/* 이용안내 링크 */}
      <Link
        href="/guide"
        className="flex flex-col justify-between rounded-[4px] border border-[#9ccbee] bg-[#f4f9fe] px-4 py-4 text-[12px] leading-[1.6] text-[#444] transition-colors hover:bg-[#eaf4fd]"
      >
        <span>
          <span className="block text-[15px] font-bold text-[#1c5aa8]">처음이신가요?</span>
          대여 자격과 필요 서류, 보험 범위를 미리 확인하시면 상담이 훨씬 빨라집니다.
        </span>
        <span className="mt-2 inline-block w-fit rounded bg-[#d61c1c] px-2 py-[3px] text-[12px] font-bold text-white">
          이용안내 보기
        </span>
      </Link>
    </div>
  );
}
