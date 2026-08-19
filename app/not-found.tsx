import Link from "next/link";
import { SITE } from "@/lib/menu";

/**
 * 404 페이지 – 원본 사이트에는 별도 404 화면이 없었음(카페24 기본 에러). 최소한의 안내만 제공.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-[1000px] flex-col items-center py-[80px] text-center">
      <p className="text-[18px] font-bold text-[#1c3f7a]">페이지를 찾을 수 없습니다.</p>
      <p className="mt-2 text-[12px] text-[#666]">주소를 다시 확인해 주세요. 문의: {SITE.phone}</p>
      <Link href="/" className="mt-6 rounded bg-[#3281C3] px-4 py-2 text-[12px] font-bold text-white hover:text-white">
        홈으로
      </Link>
    </div>
  );
}
