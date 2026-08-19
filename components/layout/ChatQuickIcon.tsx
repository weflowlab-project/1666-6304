"use client";

import Placeholder from "@/components/Placeholder";

/**
 * 채팅상담 퀵 아이콘 (원본: 우측 여백 컬럼 상단, chat_quick_off.gif 74x68, id="MRAZChatQuickIcon")
 *
 * 원본 인터랙션
 *  - 상담 가능 시간이면 runningCounselChat_3(): 545x455 팝업(/chtml/chat/chat_request.php?com_no=3) 오픈
 *  - 상담 불가 시간이면(현재 사이트 상태) runningCounselChat_off3(): alert('상담이 가능한 시간이 아닙니다.')
 *  - 원본 페이지가 서빙될 때 상태가 결정되므로, 여기서는 `online` prop 으로 토글 (기본 false = OFF 이미지)
 *
 * 위치: 원본은 1000px 본문 오른쪽 여백(테이블 3열)에서 상단 배너 아래(84+298+49+18px 지점)에 놓였다.
 * 여기서는 본문 컨테이너 기준 absolute 배치로 같은 위치를 재현한다.
 */
export default function ChatQuickIcon({ online = false }: { online?: boolean }) {
  const onClick = () => {
    if (online) {
      // 원본: window.open(url, 'MRAZChatWindow', 'width=545,height=455,status=no,resizable=no,...')
      window.open("/consult", "MRAZChatWindow", "width=545,height=455,status=no,resizable=no,scrollbars=no,menubar=no,location=no,top=100,left=100");
    } else {
      alert("상담이 가능한 시간이 아닙니다.");
    }
  };

  return (
    <button
      type="button"
      id="MRAZChatQuickIcon"
      onClick={onClick}
      className="cursor-pointer border-0 bg-transparent p-0"
      title="채팅상담"
    >
      <Placeholder width={74} height={68} tone={online ? "blue" : "light"} note={online ? "chat_quick_on.gif" : "chat_quick_off.gif"}>
        <span className="text-[11px] font-bold leading-[14px]">
          채팅상담
          <br />
          {online ? "ON" : "OFF"}
        </span>
      </Placeholder>
    </button>
  );
}
