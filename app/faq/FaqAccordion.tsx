"use client";

import { useState } from "react";
import { SITE } from "@/lib/menu";
import { faqByCategory, type FaqItem } from "@/lib/faq";

/**
 * 자주묻는질문 아코디언
 *
 * ⚠️ 게시판이 아니다.
 *    원본 고객센터에는 게시판이 6개 있었지만(공지사항 / 자주하는 질문 / 고객상담 Q&A /
 *    대출진행현황 / 업무제휴 / 자유게시판), 고객사가 관리자 페이지를 만들지 않기로 해서
 *    글이 올라와도 답변할 수단이 없다. 실제로 원본 Q&A에는 답변 없는 스팸 댓글이 쌓여 있었다.
 *    그래서 고객이 글을 쓰는 게시판은 전부 없애고,
 *    회사가 직접 쓰는 고정 문답만 코드에 넣어 정적으로 보여준다.
 *    내용 수정이 필요하면 lib/faq.ts 를 고쳐 배포하면 된다.
 *
 * 동작
 *   - 질문 클릭 시 답변 펼침/접힘 (여러 개 동시에 열 수 있다)
 *   - 카테고리 버튼으로 필터
 *   - 키보드 접근 가능 (<button> + aria-expanded / aria-controls)
 */
export default function FaqAccordion() {
  const groups = faqByCategory();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visible = activeCategory === "all" ? groups : groups.filter((g) => g.category.id === activeCategory);

  return (
    <div className="w-[730px]">
      {/* 카테고리 필터 */}
      <div className="mb-[14px] flex flex-wrap gap-[4px]">
        <FilterButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          전체
        </FilterButton>
        {groups.map((g) => (
          <FilterButton
            key={g.category.id}
            active={activeCategory === g.category.id}
            onClick={() => setActiveCategory(g.category.id)}
          >
            {g.category.label}
          </FilterButton>
        ))}
      </div>

      {visible.map((group) => (
        <section key={group.category.id} className="mb-[20px]">
          {/* 카테고리 소제목 – 원본 서브 페이지의 "- 소제목" 스타일 */}
          <div className="mb-[5px] text-[13px] font-bold text-black">- {group.category.label}</div>
          <p className="mb-[6px] text-[12px] text-[#999]">{group.category.description}</p>

          <ul className="list-none border-t border-[#d6d6d6] p-0">
            {group.items.map((item) => (
              <FaqRow key={item.id} item={item} open={openIds.has(item.id)} onToggle={() => toggle(item.id)} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer border px-[10px] py-[4px] text-[12px] ${
        active ? "border-[#1c5aa8] bg-[#1c5aa8] font-bold text-white" : "border-[#d6d6d6] bg-white text-[#555]"
      }`}
    >
      {children}
    </button>
  );
}

/** 문답 한 줄 – 질문(항상 표시) + 답변(펼침) */
function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <li className="border-b border-[#e5e5e5]">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${item.id}-panel`}
          className="flex w-full cursor-pointer items-start gap-[8px] bg-white px-[8px] py-[10px] text-left"
        >
          <span className="text-[13px] font-bold text-[#1c5aa8]">Q</span>
          <span className={`flex-1 text-[12px] leading-[20px] ${open ? "font-bold text-[#1c5aa8]" : "text-[#333]"}`}>
            {item.q}
          </span>
          <span className="text-[11px] text-[#999]" aria-hidden>
            {open ? "▲" : "▼"}
          </span>
        </button>
      </h3>

      {open && (
        <div id={`${item.id}-panel`} role="region" className="bg-[#fafafa] px-[8px] py-[12px]">
          <div className="flex gap-[8px]">
            <span className="text-[13px] font-bold text-[#d61c1c]">A</span>
            <div className="flex-1">
              {item.a.map((p, i) => (
                <p key={i} className={`text-[12px] leading-[20px] text-[#555] ${i > 0 ? "mt-[8px]" : ""}`}>
                  {p}
                </p>
              ))}

              {/* 요금 등 전화 안내가 필요한 항목 */}
              {item.call && (
                <a
                  href={`tel:${SITE.phone.replace(/-/g, "")}`}
                  className="mt-[10px] inline-block border border-[#1c5aa8] bg-white px-[10px] py-[4px] text-[12px] font-bold text-[#1c5aa8] no-underline hover:text-[#0593B7]"
                >
                  전화 상담 {SITE.phone}
                </a>
              )}

              {/* 고객사 확인이 필요한 내용 – 실제 값 확정 후 lib/faq.ts 의 todo 를 지우면 사라진다 */}
              {item.todo && (
                <p className="mt-[8px] border border-dashed border-[#d9a441] bg-[#fff9ec] px-[6px] py-[4px] text-[11px] text-[#a9761a]">
                  확인 필요 : {item.todo}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
