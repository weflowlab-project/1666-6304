import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/menu";

/**
 * 콘텐츠 상단 3단 배너 (홈·모든 서브 페이지 공통, 원본 <table width="779"> 1행) – 원본 틀 유지
 *
 *  [callcenter_img.gif 288x112]  [center_banner_01.gif 247x117]  [center_banner_02.gif 244x117 → 링크]
 *
 * ⚠️ 내용 교체 (레이아웃·크기는 원본 그대로)
 *    1번 "24시간 SPEED 고객상담"  → 전화 상담 안내 (문구만 조정)
 *    2번 "영업망 안내"            → 그대로 유지 (렌터카에도 유효한 정보)
 *    3번 "초간편 빠른신청" → 상담폼 → 이용안내 링크로 교체.
 *       예약/상담 폼을 두지 않기로 해서 폼 페이지가 사라졌고,
 *       요금을 공개하지 않는 대신 대여자격·보험·서류를 안내하는 페이지로 보낸다.
 */
export default function TopBanners() {
  return (
    <div className="flex w-[779px] items-start">
      {/* 전화 상담 안내 (헤드셋 아이콘 + 빨간 번호) */}
      <a href={`tel:${SITE.phone.replace(/-/g, "")}`} className="block no-underline">
        <Placeholder width={288} height={112} note="callcenter_img.gif" tone="light" align="left">
          <div className="flex items-center gap-3 pl-3">
            <span className="text-[34px]" aria-hidden>
              🎧
            </span>
            <div>
              <div className="text-[13px] text-[#444]">전화 한 통이면 상담 완료</div>
              <span className="text-[28px] font-extrabold tracking-wide text-[#d61c1c]">{SITE.phone}</span>
            </div>
          </div>
        </Placeholder>
      </a>

      {/* 영업 지역 안내 (지도 아이콘 배경) – 원본 내용 유지 */}
      <Placeholder width={247} height={117} note="center_banner_01.gif" tone="light" align="left">
        <div className="pl-2 text-[11px] leading-[15px] text-[#555]">
          <div className="text-[15px] font-bold text-[#222]">영업 지역 안내</div>
          <div className="mb-1 text-[12px]">가까운 지점에서 도와드립니다.</div>
          <div>
            <b className="text-[#1c5aa8]">경기권</b>(성남/분당/수원/안양/안산 의정부/일산/평택/오산/화성/천안 등)
          </div>
          <div>
            <b className="text-[#1c5aa8]">서울권</b>(강남/강동/송파/강서 서울전지역)
          </div>
          <div className="text-[#d61c1c]">*지역에 따라 차량 인수 방법 상이*</div>
        </div>
      </Placeholder>

      {/* 이용안내 링크 (원본 "초간편 빠른신청" → 상담폼 자리) */}
      <Link href="/guide" className="block no-underline">
        <Placeholder width={244} height={117} note="center_banner_02.gif" tone="blue" align="left">
          <div className="pl-2 text-[11px] leading-[15px] text-[#444]">
            <div className="text-[15px] font-bold text-[#1c5aa8]">처음이신가요?</div>
            <div>대여 자격과 필요 서류,</div>
            <div>보험 범위를 미리 확인하시면</div>
            <div>상담이 훨씬 빨라집니다.</div>
            <span className="mt-1 inline-block rounded bg-[#d61c1c] px-2 py-[2px] text-[11px] font-bold text-white">
              이용안내 보기
            </span>
          </div>
        </Placeholder>
      </Link>
    </div>
  );
}
