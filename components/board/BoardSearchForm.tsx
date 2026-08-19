"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import BoardButton from "@/components/board/BoardButton";
import { listHref, type BoardConfig } from "@/lib/boards";

/**
 * 게시판 목록 하단 검색 폼 (클라이언트)
 *
 * 원본 (div#ext_search → table#search_table cellpadding=2, form name=com_board_search method=post):
 *   [select name=com_board_search_code class=cateform onchange=sel_search()]  ← 제목/내용/작성자 (공지사항은 제목만)
 *   [input type=text name=com_board_search_value chk="y" msg="검색어" class=keywordform]
 *   [input type=image src=search.gif]                                        ← 50x20 "검색" 버튼
 *   (날짜검색용 dateform 2개는 display:none – 어떤 게시판에도 dateof_write 옵션이 없어 항상 숨김)
 *
 * 인터랙션
 *   - submit → FormCheck.init('com_board_search'): 검색어가 비어 있으면 alert("검색어을(를) 정확히 입력하세요.") 후 중단
 *   - 원본은 POST 였지만 여기서는 GET ?searchType=&keyword= 로 목록 페이지에 넘긴다.
 *   - 검색 결과 페이지에서는 select 가 선택값을 유지한다.
 */
export default function BoardSearchForm({
  board,
  searchType,
  keyword,
}: {
  board: BoardConfig;
  /** 현재 선택된 검색 구분 */
  searchType?: string;
  /** 현재 검색어 */
  keyword?: string;
}) {
  const router = useRouter();
  const [type, setType] = useState(searchType || board.searchOptions[0]?.value || "subject");
  const [value, setValue] = useState(keyword ?? "");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // 원본 FormCheck: chk="y" msg="검색어" → 공백이면 alert 후 focus
    if (!value.trim()) {
      alert("검색어을(를) 정확히 입력하세요.");
      return;
    }
    router.push(listHref(board.id, { searchType: type, keyword: value.trim() }));
  }

  return (
    <div id="ext_search" className="text-left">
      <form name="com_board_search" onSubmit={onSubmit} className="m-0">
        <table id="search_table" cellPadding={2} className="border-collapse">
          <tbody>
            <tr>
              {/* 검색 구분 select (원본 class=cateform – CSS 정의 없음, 브라우저 기본 스타일) */}
              <td className="est_cate_cell">
                <select
                  name="com_board_search_code"
                  className="cateform h-[20px] text-[12px]"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {board.searchOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </td>
              {/* 검색어 입력 (원본 div#search_display1 – 날짜검색 div#search_display2 는 항상 숨김) */}
              <td className="est_keyword_cell">
                <div id="search_display1">
                  <input
                    type="text"
                    name="com_board_search_value"
                    className="keywordform h-[20px] w-[150px] px-1 text-[12px]"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </td>
              {/* 검색 버튼 (원본 input type=image src=search.gif 50x20) */}
              <td className="est_btn_cell">
                <button type="submit" className="cursor-pointer border-0 bg-transparent p-0 align-middle" title="검색">
                  <BoardButton kind="search" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
