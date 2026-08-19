import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCallButton from "@/components/layout/FloatingCallButton";
import { SITE } from "@/lib/menu";

/**
 * 루트 레이아웃
 *
 * 구성: 상단 헤더(sticky) + 본문 + 푸터 + 전화 플로팅 버튼
 *
 * [변경 이력]
 *   1차: 원본 대부업 사이트 이식 (1000px 고정폭, 좌우 여백을 배경 이미지로 채움)
 *   2차: 렌터카로 내용 교체
 *   3차: ← 지금. 화면 전체 폭을 쓰는 요즘 홈페이지 구조로 전환.
 *        폰트도 시스템 돋움체 → Noto Sans KR (next/font 로 자체 호스팅, 외부 요청 없음)
 */
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.slogan}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} · 경기·서울 전 지역 렌터카 상담. 차종과 이용 기간만 말씀해 주시면 바로 안내해 드립니다. 전화 ${SITE.phone}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: globals.css 의 scroll-behavior:smooth 를 라우트 전환에서는 끄기 위한 표시
    <html lang="ko" data-scroll-behavior="smooth" className={notoSansKr.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* 전화 플로팅 버튼
            PC: 항상 노출 / 모바일: 스크롤 중에만 노출되고 멈추면 오른쪽으로 빠진다 */}
        <FloatingCallButton />
      </body>
    </html>
  );
}
