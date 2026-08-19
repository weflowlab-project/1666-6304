import Link from "next/link";
import Placeholder from "@/components/Placeholder";

/**
 * 홈 하단 게시판 최신글 위젯 (공지사항 / 대출진행현황)
 *
 * 원본 구조 (각 380px 폭, 좌우 2개 나란히)
 *   <a href="…sub_05_01.php"><img news_title.gif 380x21></a>   ← "공지사항" 제목 이미지, 클릭 시 게시판 목록으로
 *   (5px 여백)
 *   <table width=320 class=board_output>                        ← 카페24 board_output 스킨
 *     <tr><td width=1%><img output_ol.gif(불릿)></td><td class=bd_out1><a href="…read_form&com_board_idx=3…">제목..</a></td></tr>
 *   </table>
 *
 * 인터랙션
 *   - 제목 이미지 클릭 → 해당 게시판 목록
 *   - 각 행 클릭 → 해당 글 상세 (원본: ?com_board_basic=read_form&com_board_idx=N&com_board_id=M)
 *   - 원본은 제목이 서버에서 잘려 ".." 로 끝남 (예: "…평택 오산 화성 ..")
 */
export type PreviewItem = { no: number; title: string; href: string };

export default function BoardPreview({
  title,
  href,
  items,
  width = 320,
  note,
}: {
  /** 위젯 제목 (이미지에 적혀 있던 텍스트) */
  title: string;
  /** 제목 클릭 시 이동할 게시판 목록 경로 */
  href: string;
  /** 최신글 목록 */
  items: PreviewItem[];
  /** 목록 테이블 폭 (원본: 공지사항 320 / 대출진행현황 300) */
  width?: number;
  /** 원본 제목 이미지 파일명 */
  note: string;
}) {
  return (
    <div className="w-[380px]">
      {/* 제목 이미지 (380x21) → 게시판 목록 링크 */}
      <Link href={href} className="block no-underline">
        <Placeholder width={380} height={21} note={note} tone="none" align="left">
          <span className="border-l-[3px] border-[#1c5aa8] pl-[6px] text-[13px] font-bold text-[#222]">{title}</span>
        </Placeholder>
      </Link>
      <div className="h-[5px]" />

      {/* 최신글 목록 (board_output 스킨) */}
      <table className="board_output bg-white text-[12px]" style={{ width }}>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td className="py-[2px] text-[#999]">등록된 게시물이 없습니다.</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.no} className="board_output_tr">
              {/* 불릿 아이콘 output_ol.gif */}
              <td className="w-[1%] pr-[4px] align-middle text-[#1c5aa8]" aria-hidden>
                ▪
              </td>
              <td className="bd_out1 overflow-hidden text-ellipsis whitespace-nowrap break-all leading-[20px]">
                <Link href={item.href} className="text-[#333] hover:text-[#0593B7]">
                  {item.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
