import type { CSSProperties, ReactNode } from "react";

/**
 * 이미지 자리 표시 컴포넌트
 *
 * 실제 사진을 받기 전까지 자리와 비율만 잡아두는 용도다.
 * 화면에는 "이미지 삽입 예정" 한 줄만 가운데에 보여주고,
 * 어떤 사진이 들어갈 자리인지(note)는 마우스를 올렸을 때 툴팁으로만 확인한다.
 *
 * 실제 이미지로 교체할 때는 이 컴포넌트를 <Image src=... alt=... fill /> 로 바꾸면 된다.
 */
export type PlaceholderProps = {
  /** 자리 가로. 숫자면 px, 문자열이면 그대로 (예: "100%") */
  width?: number | string;
  /** 자리 세로 */
  height?: number | string;
  /** 어떤 사진이 들어갈 자리인지 – 툴팁과 스크린리더 라벨로만 쓰인다 */
  note?: string;
  className?: string;
  style?: CSSProperties;
  /** 배경 톤 */
  tone?: "light" | "blue" | "dark" | "none";
  /** 안내 문구 크기 – 작은 자리(버튼 등)에서는 sm */
  size?: "sm" | "md";
  /** 자식 내용 정렬 (children 을 직접 넣는 경우에만 의미가 있다) */
  align?: "left" | "center" | "right";
  /** 문구 대신 다른 내용을 넣고 싶을 때 */
  children?: ReactNode;
};

const TONES: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
  light: "bg-navy-50 text-navy-400",
  blue: "bg-navy-100 text-navy-500",
  dark: "bg-navy-800 text-navy-200",
  none: "bg-transparent text-navy-400",
};

export default function Placeholder({
  width,
  height,
  note,
  className = "",
  style,
  tone = "light",
  size = "md",
  align = "center",
  children,
}: PlaceholderProps) {
  const justify = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`ph flex items-center overflow-hidden ${justify} ${TONES[tone]} ${className}`}
      style={{ width: w ?? "100%", height: h, ...style }}
      title={note ? `이미지 삽입 예정 : ${note}` : "이미지 삽입 예정"}
      role="img"
      aria-label={note ? `이미지 삽입 예정 (${note})` : "이미지 삽입 예정"}
    >
      {children ?? (
        <span className={`font-medium ${size === "sm" ? "text-[11px]" : "text-[15px]"}`}>이미지 삽입 예정</span>
      )}
    </div>
  );
}
