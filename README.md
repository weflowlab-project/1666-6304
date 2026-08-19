# 비트대부 (1666-6304.com) 리빌드 – Next.js

원본 사이트 <http://1666-6304.com> (카페24 빌더, EUC-KR, 테이블 레이아웃, 대부분 이미지)의
**틀(레이아웃)과 인터랙션**을 Next.js 16 / React 19 / Tailwind v4 로 옮긴 프로젝트입니다.
이미지는 모두 `<Placeholder>` 컴포넌트(점선 박스 + 원본 크기/파일명 태그)로 자리만 잡아 두었고,
이미지 안에 있던 텍스트는 실제 텍스트로 옮겨 놓았습니다.

## 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 원본 ↔ 새 경로 매핑

| 탭 | 원본 경로 | 새 경로 |
|---|---|---|
| 홈 | `/default/index.php` | `/` |
| 회사소개 | `/default/sub_01/sub_01_01.php` | `/company` |
| 자동차대출 › 개인차 | `/default/sub_02/sub_02_01.php` | `/car-loan/personal` |
| 자동차대출 › 법인차 | `/default/sub_02/sub_02_02.php` | `/car-loan/corporate` |
| 자동차대출 › 수입차 | `/default/sub_02/sub_02_03.php` | `/car-loan/imported` |
| 자동차대출 › 설정/할부/타사대납차 | `/default/sub_02/sub_02_04.php` | `/car-loan/installment` |
| 자동차대출 › 리스차 | `/default/sub_02/sub_02_05.php` | `/car-loan/lease` |
| 부동산담보대출 › 부동산담보대출 | `/default/sub_03/sub_03_01.php` | `/estate-loan/mortgage` |
| 부동산담보대출 › 전월세보증대출 | `/default/sub_03/sub_03_02.php` | `/estate-loan/deposit` |
| 빠른상담신청 | `/default/sub_04/sub_04_01.php` | `/consult` |
| 고객센터 › 공지사항 | `/default/sub_05/sub_05_01.php` (board 5) | `/support/notice` |
| 고객센터 › 자주하는 질문 | `/default/sub_05/sub_05_02.php` (board 12) | `/support/faq` |
| 고객센터 › 고객상담 Q&A | `/default/sub_05/sub_05_03.php` (board 8) | `/support/qna` |
| 고객센터 › 대출진행현황 | `/default/sub_05/sub_05_04.php` (board 9) | `/support/progress` |
| 고객센터 › 업무제휴 | `/default/sub_05/sub_05_05.php` (board 10) | `/support/partnership` |
| 고객센터 › 자유게시판 | `/default/sub_05/sub_05_06.php` (board 11) | `/support/free` |
| 게시글 상세 / 글쓰기 | `?com_board_basic=read_form&com_board_idx=N` / `write_form` | `/support/<board>/<no>` / `/support/<board>/write` |

## 폴더 구조

```
app/
  layout.tsx            루트 레이아웃 (Header + Footer)
  page.tsx              홈
  company/              회사소개
  car-loan/[product]/   자동차대출 5종 (데이터: lib/loans.ts)
  estate-loan/[product]/부동산담보대출 2종
  consult/              빠른상담신청 폼
  support/[board]/      게시판 목록 / [no] 상세 / write 글쓰기
components/
  Placeholder.tsx       이미지 자리 표시 컴포넌트
  layout/               Header, Footer, SubPageLayout, Sidebar, TopBanners, ChatQuickIcon
  forms/                SmsQuickForm(사이드바 SMS 상담), ConsultForm(빠른상담신청)
  home/                 RollingBanner(4.5초 롤링), RightBanners, BoardPreview
  loan/                 LoanConditions(조건표 + 대출신청하기 버튼)
  board/                BoardList / BoardRead / BoardWrite
lib/
  menu.ts               사이트맵 (원본 이미지맵 링크 → 경로)
  loans.ts              대출 조건표 데이터 (원문 그대로)
  boards.ts             게시판 정의 + 샘플 데이터
```

## 재현한 인터랙션

- 상단/좌측 메뉴 링크, 로고 → 홈, 푸터 로고 → 홈
- SMS 빠른상담: 성명→전화(숫자만, 3칸)→내용 순 빈값 검사 alert & focus, 2000byte 제한
- 메인 롤링 배너: 4.5초 자동 순환, 번호 버튼 클릭 시 즉시 전환, 배너 클릭 시 상품 페이지
- 자동차시세 3사 링크 새 창, 초간편 빠른신청 배너 → `/consult`
- 채팅상담 아이콘 → `상담이 가능한 시간이 아닙니다.` alert (원본 OFF 상태)
- 대출 상품 페이지 "대출신청하기" → `/consult`
- 빠른상담신청 폼: 신청인/연락처 검증 alert (원문 메시지), 확인/취소
- 게시판: 목록·페이징·검색·글쓰기·상세·댓글·삭제(비밀번호)·답글 (데모 alert, 실제 서버 연동은 TODO)

## TODO (실서비스 전환 시)

- `Placeholder` → 실제 이미지(`next/image`)로 교체
- SMS/상담 폼/게시판 글쓰기 → API Route 또는 Server Action 으로 연동
- 원본 문구 오타(중도상환수수로, 당일지금)와 전월세보증대출 조건표(부동산담보대출 복사본) 내용 검토
