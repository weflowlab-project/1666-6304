import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/menu";

/**
 * 루트 레이아웃
 *
 * 원본 사이트(1666-6304.com)는 최상위가 <frameset> 이고 그 안의 default/index.php 가 실제 화면이다.
 * 모든 페이지 공통으로 상단 헤더(84px) + 하단 푸터(441px)가 붙으므로 루트 레이아웃에서 렌더링한다.
 * 폭은 반응형(최대 1000px)이며, 원본이 배경 이미지로 채우던 좌우 여백은 흰색으로 대체했다.
 */
export const metadata: Metadata = {
  title: SITE.title,
  description: `${SITE.name} – ${SITE.slogan}. 경기·서울 전 지역 렌터카 상담. 차종과 이용 기간만 말씀해 주시면 바로 안내해 드립니다. 전화 ${SITE.phone}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: globals.css 의 scroll-behavior:smooth 를
    // 라우트 전환에서는 적용하지 않도록 Next 에 알리는 표시
    <html lang="ko" data-scroll-behavior="smooth" className="h-full">
      <body className="flex min-h-full flex-col bg-white">
        {/* 상단 헤더: 로고 + 메뉴 + 고객센터 번호 */}
        <Header />
        {/* 페이지 본문 */}
        <main className="flex-1">{children}</main>
        {/* 하단 푸터: 회사정보 + 이용 안내 */}
        <Footer />
      </body>
    </html>
  );
}
