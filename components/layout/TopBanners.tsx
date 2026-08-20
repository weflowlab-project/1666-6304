import Link from "next/link";

/**
 * 콘텐츠 상단 안내 배너 (홈·모든 서브 페이지 공통)
 *
 * 원본은 288x112 / 247x117 / 244x117 이미지 3장이었다.
 * 이미지 자리 표시를 없애고 실제 텍스트 블록으로 만들었으며, 폭은 유동으로 바꿨다.
 *
 * 전화 안내 카드는 제거했다. 헤더(모바일)와 사이드 전화 상담 박스에 같은 번호가 이미 있어
 * 중복이었고, 남은 두 카드를 넓게 쓰는 편이 읽기 좋다.
 *
 * 반응형: 모바일 1열 → sm 이상 2열
 */
export default function TopBanners() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {/* 영업 지역 안내 */}
      <div className="rounded-[4px] border border-[#e5e5e5] bg-white px-4 py-4 text-[12px] leading-[1.6] text-[#555] max-md:text-[14px]">
        <p className="text-[15px] font-bold text-[#222]">영업 지역 안내</p>
        <p className="mb-1 text-[12px] max-md:text-[14px]">가까운 지점에서 도와드립니다.</p>
        <p>
          <b className="text-[#1c5aa8]">경기권</b> 성남/분당/수원/안양/안산/의정부/일산/평택/오산/화성/천안 등
        </p>
        <p>
          <b className="text-[#1c5aa8]">서울권</b> 강남/강동/송파/강서 서울 전 지역
        </p>
        {/* 위 "가까운 지점에서 도와드립니다."의 아래 간격(mb-1)과 같은 값을 위쪽에 준다 */}
        <p className="mt-1 text-[#d61c1c]">*지역에 따라 차량 인수 방법이 다를 수 있습니다*</p>
      </div>

      {/* 이용안내 링크 */}
      <Link
        href="/guide"
        className="flex flex-col justify-between rounded-[4px] border border-[#9ccbee] bg-[#f4f9fe] px-4 py-4 text-[12px] leading-[1.6] text-[#444] transition-colors hover:bg-[#eaf4fd] max-md:text-[14px]"
      >
        <span>
          <span className="block text-[15px] font-bold text-[#1c5aa8]">처음이신가요?</span>
          대여 자격과 필요 서류, 보험 범위를 미리 확인하시면
          <br />
          상담이 훨씬 빨라집니다.
        </span>
        <span className="mt-3 inline-flex w-fit items-center rounded-[6px] bg-[#1c3f7a] px-4 py-2 text-[14px] font-bold text-white">
          이용안내 보기
        </span>
      </Link>
    </div>
  );
}
