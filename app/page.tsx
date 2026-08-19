import CallBox from "@/components/layout/CallBox";
import TopBanners from "@/components/layout/TopBanners";
import RollingBanner from "@/components/home/RollingBanner";
import RightBanners from "@/components/home/RightBanners";
import HomeNotice from "@/components/home/HomeNotice";
import { SITE } from "@/lib/menu";

/**
 * 홈(메인) 페이지
 *
 * 원본 /default/index.php 의 구성을 이어받되, 폭을 고정 → 반응형으로 바꿨다.
 *
 *   1. 히어로 (원본 main_visual_wepix.jpg 1000x298 자리)
 *   2. 본문 2컬럼 – 좌: 전화 상담 박스 / 우: 3단 배너 + 롤링 배너 + 안내 블록
 *
 * 반응형 처리
 *   · lg 이상: 좌(상담 박스) + 우(콘텐츠) 2컬럼 – 원본 배치 유지
 *   · lg 미만: 세로로 쌓이고, 전화 상담 박스는 콘텐츠 아래로 내려간다.
 *     좁은 화면에서 사이드 박스가 위에 있으면 정작 본문이 한참 아래로 밀리기 때문이다.
 *
 * 히어로 이미지 자리
 *   실제 사진을 받기 전이라 배경에 "이미지 삽입 예정"을 크게 깔아 자리를 표시한다.
 *   사진이 준비되면 이 <span> 을 지우고 배경에 <Image> 를 깔면 된다.
 */
export default function Home() {
  return (
    <div className="w-full">
      {/* ── 1. 히어로 ── */}
      <section className="relative isolate flex min-h-[240px] w-full items-center justify-center overflow-hidden bg-[#eef3f8] px-4 py-14 text-center sm:min-h-[300px] md:py-20">
        {/* 배경 – 이미지가 들어갈 자리 안내 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-[40px] font-black tracking-tight text-[#1c3f7a]/[0.08] sm:text-[62px] md:text-[88px] lg:text-[116px]"
        >
          이미지 삽입 예정
        </span>

        {/* 문구 – 가운데 정렬 */}
        <div className="relative">
          <h1 className="text-[26px] font-extrabold leading-[1.35] tracking-tight text-[#1c5aa8] sm:text-[34px] md:text-[40px]">
            <span className="text-[#e0322e]">필요한 기간만큼</span>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            합리적인 렌터카
          </h1>
          <p className="mt-4 inline-block bg-white/80 px-3 py-1 text-[14px] font-bold text-[#e0322e] sm:text-[17px]">
            차종·기간 상담은 전화 한 통!
          </p>
        </div>
      </section>

      {/* ── 2. 본문 ── */}
      <div className="mx-auto w-full max-w-[1000px] px-4 py-6 md:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-5">
          {/* 콘텐츠 (모바일에서는 위로) */}
          <div className="order-1 min-w-0 flex-1 lg:order-2">
            <TopBanners />

            <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start">
              <RollingBanner />
              <RightBanners />
            </div>

            <div className="mt-6">
              <HomeNotice />
            </div>
          </div>

          {/* 전화 상담 박스 (모바일에서는 아래로) */}
          <div className="order-2 flex justify-center lg:order-1 lg:w-[200px] lg:shrink-0 lg:justify-start">
            <CallBox />
          </div>
        </div>
      </div>

      {/* 검색엔진·스크린리더용 대표 정보 */}
      <p className="sr-only">
        {SITE.name} – {SITE.slogan}. 전화 상담 {SITE.phone}
      </p>
    </div>
  );
}
