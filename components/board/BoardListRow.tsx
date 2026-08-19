"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * 게시판 목록의 글 1행 (클라이언트 – 행 전체 클릭 이동용)
 *
 * 원본:
 *   <tr align=center height=28 onclick="location.href='…read_form…'; return false;" style="cursor:pointer">
 *     <td class=bbsno>162</td>
 *     <td class=bbsnewf5 align=left><a href=''><a href='…read_form…'>제목   </a></a></td>   ← 중첩 <a> 는 템플릿 버그, 하나로 렌더링
 *     <td class=bbswriter>관리자</td> <td class=bbsetc_dateof_write>2021-09-20</td> <td class=bbsetc_view_count>1270</td>
 *   </tr>
 * 행 어디를 눌러도 읽기 화면으로 이동하고, 제목은 별도 링크(#555555, hover #FF5500)이기도 하다.
 */
export default function BoardListRow({
  href,
  cells,
}: {
  /** 읽기 화면 URL */
  href: string;
  /** 컬럼 순서대로의 셀 내용. title 셀은 { title: string } 로 넘김 */
  cells: { key: string; content: ReactNode; isTitle?: boolean }[];
}) {
  const router = useRouter();
  return (
    <tr
      className="h-[28px] cursor-pointer text-center"
      onClick={() => router.push(href)}
    >
      {cells.map((c) =>
        c.isTitle ? (
          // .bbsnewf5: padding 10px, 링크 #555555 → hover #FF5500 (밑줄 없음)
          <td key={c.key} className="bbsnewf5 border border-[#E5E5E5] px-[10px] text-left">
            <Link
              href={href}
              className="text-[12px] !text-[#555555] hover:!text-[#FF5500]"
              onClick={(e) => e.stopPropagation()}
            >
              {c.content}
            </Link>
          </td>
        ) : (
          <td key={c.key} className="border border-[#E5E5E5] px-[5px] text-[12px] text-[#333333]">
            {c.content}
          </td>
        ),
      )}
    </tr>
  );
}
