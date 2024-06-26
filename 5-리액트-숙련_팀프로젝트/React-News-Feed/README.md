# React New Speed 팀 프로젝트

- 배포 URL : 준비중입니다.

## 팀원 구성

<div align="center" dir="auto">
<table>
<thead>
<tr>
<th align="center"><strong>김병준</strong></th>
<th align="center"><strong>김재훈</strong></th>
<th align="center"><strong>한효림</strong></th>
<th align="center"><strong>김휘진</strong></th>
<th align="center"><strong>김동신</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/Captain-Kim"><img src="https://avatars.githubusercontent.com/u/160568904?v=4" height="150" width="150" style="max-width: 100%;"> <br> @Captain-Kim</a></td>
<td align="center"><a href="https://github.com/hoondolla"><img src="https://avatars.githubusercontent.com/u/162412793?v=4" height="150" width="150" style="max-width: 100%;"> <br> @hoondolla</a></td>
<td align="center"><a href="https://github.com/hyorimhan"><img src="https://avatars.githubusercontent.com/u/151856914?v=4" height="150" width="150" style="max-width: 100%;"> <br> @hyorimhan</a></td>
<td align="center"><a href="https://github.com/hwijinkim22"><img src="https://avatars.githubusercontent.com/u/160462935?v=4" height="150" width="150" style="max-width: 100%;"> <br> @hwijinkim22</a></td>
<td align="center"><a href="https://github.com/KimDongSin"><img src="https://avatars.githubusercontent.com/u/81426391?v=4" height="150" width="150" style="max-width: 100%;"> <br> @KimDongSin</a></td>
</tr>
</tbody>
</table>
</div>

## 1. 개발환경

![vite](https://img.shields.io/badge/vite-5.2.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)<br />
![yarn](https://img.shields.io/badge/yarn-1.22.22-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)<br />
![supabase](https://img.shields.io/badge/@supabase/supabase--js-2.43.4-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) <br />
![quill](https://img.shields.io/badge/quill-2.0.2-1D1D1D?style=for-the-badge&logo=quill&logoColor=white)<br />
![react](https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)<br />
![react-dom](https://img.shields.io/badge/react--dom-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)<br />
![react-quill](https://img.shields.io/badge/react--quill-2.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)<br />
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.23.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)<br />
![styled-components](https://img.shields.io/badge/styled--components-6.1.11-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)<br />
![uuid](https://img.shields.io/badge/uuid-9.0.1-1B1B1D?style=for-the-badge&logo=uuid&logoColor=white)<br />

## 2. 프로젝트 구조

```
src
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ FetchData.jsx
 ┃ ┣ HomeFeed.jsx
 ┃ ┣ HomeHeader.jsx
 ┃ ┣ HomeInput.jsx
 ┃ ┣ ImgUpload.jsx
 ┃ ┣ Modal.jsx
 ┃ ┣ SignUp.jsx
 ┃ ┣ Test.jsx
 ┃ ┗ useOutsideClick.jsx
 ┣ image
 ┃ ┣ homeimage.png
 ┃ ┗ inputimage.png
 ┣ pages
 ┃ ┣ CommitDetail.jsx
 ┃ ┣ DetailPage.jsx
 ┃ ┣ Home.jsx
 ┃ ┣ LoginPage.jsx
 ┃ ┣ MyPage.jsx
 ┃ ┗ SignUpPage.jsx
 ┣ shared
 ┃ ┗ Router.jsx
 ┣ App.css
 ┣ App.jsx
 ┣ Globalstyles.js
 ┣ index.css
 ┣ main.jsx
 ┗ supabaseClient.js
```

## 3. 역할 분담

### 🍉김병준

- UI
  - 준비중입니다.
- 기능
  - 준비중입니다.

<br />

### 🍇김재훈

- UI
  - 페이지 : 메인페이지
  - 공통 컴포넌트 : 헤더, 푸터
- 기능
  #### 헤더
  - 페이지의 배율을 높였을 때 버튼이 사라짐 (윈도우 기준 ctrl + 휠) (줌 레벨을 백분율로 계산하여 zoomLevel 의 \* 값이 150 이상이라면 버튼들이 숨김 처리 됩니다.)
  - HOME 이미지 및 각 버튼 클릭 시 페이지 이동
  #### 피드 (게시글 렌더링, 검색, 상세페이지 이동)
  - 퀼 에디터로 쓴 게시글들을 dangerouslySetInnerHTML 로 불러와 피드에 렌더링
  - 돋보기 그림 토글 -> 인풋창에 posts (슈퍼베이스 게시글 데이터)의 내용, 제목, 닉네임 검색 가능
  - 게시글 클릭 시 게시글의 id 를 가진 상세 페이지로 이동
  - 피드 갯수는 10개로 제한, 더보기 버튼 클릭 시 나머지 게시글도 노출 -> 닫기 버튼으로 바뀌며 클릭 시 원상복구 (토글)
  #### 푸터
  - About us, Contact, Privacy Policy 클릭 시 팀 노션으로 이동

<br />

### 🥔한효림

- UI
  - 페이지 : 마이 페이지
- 기능
  - 버튼 클릭시 모달창 띄워 받아 닉네임 수정 & 업데이트
  - 모달창은 모달창 외부 화면 클릭시 닫히도록 만듦
  - 사용자가 작성한 게시글을 불러오고, 오래된 순으로 자동 정렬
  - 작성한 게시글이 없으면 새 글 작성을 유도하는 박스 표시
  - 닉네임 왼쪽 이미지 클릭시 input type="file"과 연결해 이미지를 업로드, 업데이트

<br />

### 🧄김휘진

- UI
  - 페이지 : 로그인, 회원가입 페이지
- 기능
  - supabase signUp() 메서드를 이용한 회원정보 등록
  - supabase signIn() 메서드를 통한 로그인 및 로그인 상태 관리
  - supabase 메서드를 활용하여 회원가입 절차 진행 시에 이미 등록된 정보와 동일한 값을 입력할 경우, 중복 경고 문구 출력 
  - 로그인 상태에 따른 조건부 헤더 부분 버튼
  - ex) 로그인 상태 시, 헤더 부분에 로그아웃, 글쓰기 버튼을 출력 / 로그아웃 상태 시, 로그인 버튼을 출력

<br />

### 🥕김동신

- UI
  - 기존 헤더 수정, 상세페이지 퍼블리싱
- 기능
  - X

<br />
