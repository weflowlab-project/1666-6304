import type { Metadata } from "next";
import Link from "next/link";
import SubPageLayout from "@/components/layout/SubPageLayout";
import FaqAccordion from "./FaqAccordion";
import { CallCtaButton } from "@/components/table/InfoTable";
import { SITE } from "@/lib/menu";

/**
 * 자주묻는질문 (원본 고객센터 자리를 이어받음)
 *
 * 원본: /default/sub_05/sub_05_02.php (게시판 board_12, 실제로는 글이 0건이었다)
 *
 * ⚠️ 게시판이 아니라 정적 페이지다.
 *    관리자 페이지를 만들지 않기로 해서 게시판 운영이 불가능하다.
 *    고객이 글을 쓰는 게시판은 답변이 안 달리면 방치 인상을 주고 스팸이 쌓이므로 전부 제거했고,
 *    회사가 직접 쓰는 고정 문답만 남겼다. 내용 수정은 lib/faq.ts 를 고쳐 배포하면 된다.
 *
 * 레이아웃은 원본 서브 페이지 틀 그대로 (사이드바 + 파란 테두리 콘텐츠 박스 + 730px 본문).
 */
export const metadata: Metadata = { title: `자주묻는질문 - ${SITE.name}` };

export default function FaqPage() {
  return (
    <SubPageLayout sectionId="faq" title="자주묻는질문">
      <div className="w-full">
        <p className="mb-[14px] text-[12px] leading-[20px] text-[#666]">
          전화 주시기 전에 자주 문의하시는 내용을 정리했습니다. 요금은 차종과 이용 기간, 보험 조건에 따라 달라져
          전화로만 안내해 드리고 있습니다.
        </p>

        <FaqAccordion />

        {/* 답변이 없을 때 – 전화 유도 */}
        <div className="mb-[20px] border border-[#e5e5e5] bg-[#fafafa] px-[12px] py-[12px] text-center">
          <p className="text-[13px] font-bold text-[#333]">찾으시는 답변이 없으신가요?</p>
          <p className="mt-[4px] text-[12px] leading-[20px] text-[#666]">
            대여 자격 · 보험 · 서류에 대한 자세한 내용은{" "}
            <Link href="/guide" className="font-bold text-[#1c5aa8] hover:text-[#0593B7]">
              이용안내
            </Link>{" "}
            에서 확인하실 수 있습니다.
          </p>
        </div>

        {/* 하단 CTA */}
        <div className="flex justify-center">
          <CallCtaButton />
        </div>
      </div>
    </SubPageLayout>
  );
}
