import type { CSSProperties, ReactNode } from "react";

/**
 * 이미지 플레이스홀더 컴포넌트
 *
 * 원본 사이트는 거의 모든 시각 요소(메뉴, 배너, 버튼, 안내문)가 GIF/JPG 이미지로 되어 있다.
 * 이미지 파일을 그대로 가져오는 대신, 같은 크기의 자리를 잡아주고
 *  - 이미지에 적혀 있던 텍스트(transcribed text)를 실제 텍스트로 보여주며
 *  - 우측 하단에 "IMG 000x000" 태그를 달아 나중에 실제 이미지로 교체할 자리임을 표시한다.
 *
 * 사용 예)
 *   <Placeholder width={288} height={112} label="24시간 SPEED 고객상담 1666-6304" note="callcenter_img.gif" />
 *
 * 실제 이미지로 바꿀 때는 이 컴포넌트를 <Image src=... width height /> 로 치환하면 된다.
 */
export type PlaceholderProps = {
  /** 원본 이미지 가로(px). 생략 시 100% */
  width?: number | string;
  /** 원본 이미지 세로(px) */
  height?: number | string;
  /** 이미지 안에 적혀 있던 텍스트/설명. 그대로 화면에 표시된다 */
  label?: ReactNode;
  /** 원본 파일명 등 개발자용 메모 (title 속성 + 우측 하단 태그로 표시) */
  note?: string;
  /** 추가 클래스 */
  className?: string;
  /** 추가 인라인 스타일 */
  style?: CSSProperties;
  /** 배경 톤: light(기본) | blue | dark  – 원본 이미지의 분위기를 흉내낼 때 사용 */
  tone?: "light" | "blue" | "dark" | "none";
  /** 텍스트 정렬 */
  align?: "left" | "center" | "right";
  /** 자식 노드가 있으면 label 대신 자식을 렌더링 (복잡한 배너 구성용) */
  children?: ReactNode;
};

const TONES: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
  light: "bg-[#f3f4f6] border-[#c9ced6] text-[#555]",
  blue: "bg-[#eaf4fd] border-[#9ccbee] text-[#1b4f80]",
  dark: "bg-[#3d3d3d] border-[#222] text-white",
  none: "bg-transparent border-transparent text-inherit",
};

export default function Placeholder({
  width,
  height,
  label,
  note,
  className = "",
  style,
  tone = "light",
  align = "center",
  children,
}: PlaceholderProps) {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  const dims =
    typeof width === "number" && typeof height === "number" ? `${width}x${height}` : "";
  // 작은 이미지(아이콘·버튼)는 태그가 내용을 가리므로 hover 시에만 태그 표시 (title 툴팁은 항상 제공)
  const small =
    (typeof width === "number" && width < 120) || (typeof height === "number" && height < 40);

  return (
    <div
      className={`ph group relative box-border overflow-hidden border border-dashed ${TONES[tone]} ${className}`}
      style={{ width: w ?? "100%", height: h, ...style }}
      title={note ? `이미지 자리: ${note}${dims ? ` (${dims})` : ""}` : "이미지 자리"}
      role="img"
      aria-label={typeof label === "string" ? label : note}
    >
      {/* 이미지에 들어 있던 내용 – 실제 텍스트로 노출 */}
      <div
        className={`flex h-full w-full flex-col justify-center px-2 py-1 leading-tight ${
          align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left"
        }`}
      >
        {children ?? label}
      </div>
      {/* 개발자용 태그: 원본 크기 + 파일명 */}
      <span
        className={`pointer-events-none absolute bottom-0 right-0 z-10 whitespace-nowrap bg-black/60 px-1 text-[9px] leading-[12px] text-white ${
          small ? "hidden group-hover:block" : ""
        }`}
      >
        IMG {dims}
        {note ? ` · ${note}` : ""}
      </span>
    </div>
  );
}
