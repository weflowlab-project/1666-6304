import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { SITE } from "@/lib/menu";

/**
 * 콘텐츠 상단 3단 배너 (홈·모든 서브 페이지 공통, 원본 <table width="779"> 1행)
 *
 *  [callcenter_img.gif 288x112]  [center_banner_01.gif 247x117]  [center_banner_02.gif 244x117 → 링크]
 *   24시간 SPEED 고객상담         영업망 안내                     초간편 빠른신청
 *   1666-6304                     가장 가까운 지점으로 연결…       빠른상담신청하기 버튼 → /consult
 *
 * 인터랙션: 3번째 배너(초간편 빠른신청)만 클릭 가능 → 빠른상담신청 페이지(원본 sub_04_01.php)
 */
export default function TopBanners() {
  return (
    <div className="flex w-[779px] items-start">
      {/* 24시간 SPEED 고객상담 (헤드셋 스마일 아이콘 + 빨간 번호) */}
      <Placeholder width={288} height={112} note="callcenter_img.gif" tone="light" align="left">
        <div className="flex items-center gap-3 pl-3">
          <span className="text-[34px]" aria-hidden>
            🎧
          </span>
          <div>
            <div className="text-[13px] text-[#444]">24시간 SPEED 고객상담</div>
            <a href={`tel:${SITE.phone}`} className="text-[28px] font-extrabold tracking-wide text-[#d61c1c] no-underline">
              {SITE.phone}
            </a>
          </div>
        </div>
      </Placeholder>

      {/* 영업망 안내 (지도 아이콘 배경) */}
      <Placeholder width={247} height={117} note="center_banner_01.gif" tone="light" align="left">
        <div className="pl-2 text-[11px] leading-[15px] text-[#555]">
          <div className="text-[15px] font-bold text-[#222]">영업망 안내</div>
          <div className="mb-1 text-[12px]">가장 가까운 지점으로 연결해드립니다.</div>
          <div>
            <b className="text-[#1c5aa8]">경기권</b>(성남/분당/수원/안양/안산 의정부/일산/평택/오산/화성/천안 등)
          </div>
          <div>
            <b className="text-[#1c5aa8]">서울권</b>(강남/강동/송파/강서 서울전지역)
          </div>
          <div className="text-[#d61c1c]">*고객님이 계신 지역으로 출장 가능*</div>
        </div>
      </Placeholder>

      {/* 초간편 빠른신청 → 빠른상담신청 페이지 링크 */}
      <Link href="/consult" className="block no-underline">
        <Placeholder width={244} height={117} note="center_banner_02.gif" tone="blue" align="left">
          <div className="pl-2 text-[11px] leading-[15px] text-[#444]">
            <div className="text-[15px] font-bold text-[#1c5aa8]">초간편 빠른신청</div>
            <div>간편한 신청만으로 빠른상담을 받아보세요.</div>
            <div>상담신청만으로는 조회기록이 남거나</div>
            <div>신용에 아무런 영향을 끼치지 않습니다.</div>
            <span className="mt-1 inline-block rounded bg-[#d61c1c] px-2 py-[2px] text-[11px] font-bold text-white">
              빠른상담신청하기
            </span>
          </div>
        </Placeholder>
      </Link>
    </div>
  );
}
