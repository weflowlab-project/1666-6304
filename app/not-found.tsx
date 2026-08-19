import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 404 페이지 – 원본 사이트에는 별도 404 화면이 없었음(카페24 기본 에러).
 *
 * 대부업 시절 URL(자동차대출·부동산담보대출·게시판)이 검색엔진이나 즐겨찾기에 남아 있을 수 있어,
 * 그런 경로로 들어온 방문자도 이탈하지 않도록 홈 이동과 전화번호를 함께 제공한다.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-[1000px] flex-col items-center py-[80px] text-center">
      <p className="text-[18px] font-bold text-[#1c3f7a]">페이지를 찾을 수 없습니다.</p>
      <p className="mt-2 text-[12px] text-[#666]">주소가 변경되었거나 삭제된 페이지입니다. 문의: {SITE.phone}</p>
      <Link href="/" className="mt-6 rounded bg-[#3281C3] px-4 py-2 text-[12px] font-bold text-white hover:text-white">
        홈으로
      </Link>
    </div>
  );
}
