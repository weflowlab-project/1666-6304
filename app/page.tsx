import Placeholder from "@/components/Placeholder";
import SmsQuickForm from "@/components/forms/SmsQuickForm";
import ChatQuickIcon from "@/components/layout/ChatQuickIcon";
import TopBanners from "@/components/layout/TopBanners";
import RollingBanner from "@/components/home/RollingBanner";
import RightBanners from "@/components/home/RightBanners";
import BoardPreview from "@/components/home/BoardPreview";
import { getPosts, readHref, truncateTitle } from "@/lib/boards";

/**
 * 홈(메인) 페이지 – 원본 /default/index.php  (최상위 http://1666-6304.com 은 이 페이지를 담는 frameset)
 *
 * 원본 레이아웃 (1000px 고정폭, 세로 순서)
 *   1. 헤더 84px                                       ← app/layout.tsx
 *   2. 메인 비주얼 main_visual_wepix.jpg 1000x298       "빠르고 간편한 자동차대출 / 즉시대출! 신용조회 무!"
 *      (좌우 여백은 main_left_bg / main_right_bg 회색 그라데이션)
 *   3. 49px 여백 스트립 (bm_bg.gif)
 *   4. 본문 2컬럼
 *        좌 221px : SMS 빠른상담신청 폼 (190x256)
 *        우 779px :
 *          ① 상단 3단 배너 (24시간 고객상담 / 영업망 안내 / 초간편 빠른신청→상담페이지)
 *          ② 빈 행
 *          ③ [롤링 배너 467px (번호 버튼 4개, 4.5초 자동 순환, 클릭 시 상품 페이지)] [우측: 대출절차안내 310x119 / 자동차시세 3사 링크 310x91]
 *          ④ 빈 행
 *          ⑤ [공지사항 최신글 380px] [대출진행현황 최신글 380px]  – 각 제목 이미지 클릭 시 게시판으로
 *          ⑥ 빈 행
 *   5. 우측 여백 상단 채팅상담 아이콘 (클릭 시 "상담이 가능한 시간이 아닙니다." alert)
 *   6. 푸터 441px                                       ← app/layout.tsx
 */
export default function Home() {
  // 원본: 공지사항(board 5) 최신 1건, 대출진행현황(board 9) 최신 5건을 위젯으로 노출
  const notice = getPosts("notice", 1).rows.slice(0, 1);
  const progress = getPosts("progress", 1).rows.slice(0, 5);

  return (
    <div className="relative mx-auto w-[1000px]">
      {/* 2. 메인 비주얼 (1000x298) */}
      <Placeholder width={1000} height={298} note="main_visual_wepix.jpg" tone="light" align="left">
        <div className="pl-[340px]">
          <div className="text-[40px] font-extrabold italic leading-[46px] text-[#1c5aa8]">
            <span className="text-[#e0322e]">빠르고 간편한</span>
            <br />
            자동차대출
          </div>
          <div className="mt-3 inline-block bg-white/80 px-3 py-1 text-[18px] font-bold text-[#e0322e]">
            즉시대출! 신용조회 무!
          </div>
          <div className="mt-2 text-[11px] text-[#999]">(흰색 자동차·지폐 더미·인물 일러스트 배경)</div>
        </div>
      </Placeholder>

      {/* 3. 49px 여백 스트립 */}
      <div className="h-[49px]" />

      {/* 5. 우측 여백 채팅상담 아이콘 (원본: 3열 우측 컬럼, 비주얼 아래 18px) */}
      <div className="absolute left-full top-[calc(298px+49px+18px)] pl-[5px]">
        <ChatQuickIcon />
      </div>

      {/* 4. 본문 2컬럼 */}
      <div className="flex items-start">
        {/* 좌: SMS 빠른상담신청 폼 */}
        <div className="flex w-[221px] shrink-0 justify-center">
          <SmsQuickForm />
        </div>

        {/* 우: 779px 콘텐츠 */}
        <div className="w-[779px]">
          {/* ① 상단 3단 배너 */}
          <TopBanners />
          <div className="h-[20px]" />

          {/* ③ 롤링 배너 + 우측 배너 2종 */}
          <div className="flex w-[779px] items-start justify-between">
            <RollingBanner />
            <RightBanners />
          </div>
          <div className="h-[20px]" />

          {/* ⑤ 게시판 최신글 위젯 2개 (770px 안에 380 + 380, 우측 정렬) */}
          <div className="flex w-[770px] items-start justify-between">
            <BoardPreview
              title="공지사항"
              href="/support/notice"
              note="news_title.gif"
              width={320}
              items={notice.map((p) => ({ no: p.idx, title: truncateTitle(p.title), href: readHref("notice", p.idx) }))}
            />
            <BoardPreview
              title="대출진행현황"
              href="/support/progress"
              note="qna_title.gif"
              width={300}
              items={progress.map((p) => ({ no: p.idx, title: truncateTitle(p.title), href: readHref("progress", p.idx) }))}
            />
          </div>
          <div className="h-[20px]" />
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[18px]" />
    </div>
  );
}
