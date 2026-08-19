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
 * 페이지 폭은 1000px 고정, 좌우 여백은 원본이 배경 이미지(top_bg.gif 등)로 채우던 것을 흰색으로 대체.
 */
export const metadata: Metadata = {
  title: SITE.title,
  description: `${SITE.name} – ${SITE.slogan}. 빠르고 간편한 자동차대출, 즉시대출 신용조회 무! ${SITE.phone}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full min-w-[1000px] flex-col bg-white">
        {/* 상단 헤더: 로고 + 메뉴 + 고객센터 번호 */}
        <Header />
        {/* 페이지 본문 */}
        <main className="flex-1">{children}</main>
        {/* 하단 푸터: 회사정보 + 대부업 고지 */}
        <Footer />
      </body>
    </html>
  );
}
