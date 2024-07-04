## [내일배움캠프 React 5기] 플러스주차 Next.js 개인 프로젝트
- 과제 일정 : 2024. 07. 01. ~ 2024. 07. 06.

## 기술 스택
- Next.js
- Tailwind CSS
- TanStack Query
- TypeScript

## 필수 구현 사항
- [ ✅ ] Next.js 14 버전
- [ ✅ ] TypeScript 사용
- [ ✅ ] App router 기반
- [ ✅ ] Tailwind CSS 사용
- [ ✅ ] 정적 메타 데이터 생성
- [ ✅ ] 공통 layout 컴포넌트를 통한 앱 전역 스타일 적용
- [ ✅ ] 클라이언트 컴포넌트로 포켓몬 리스트 렌더링 페이지 구현
- [ ✅ ] 포켓몬 리스트 페이지에서 api 직접 호출 X, api handler로 api 로직 구현 후 호출
- [ ✅ ] 서버 컴포넌트로 포켓몬 디테일 렌더링 페이지 구현
- [ ✅ ] 포켓몬 디테일 페이지에서 api 직접 호출 X, api handler로 api 로직 구현 후 호출
- [ ✅ ] 포켓몬 디테일 페이지 -> 포켓몬 리스트 페이지 페이지 이동 로직 구현
- [ ✅ ] 이미지 렌더링 시 Image 컴포넌트 사용
- [ ✅ ] TypeScript : 포켓몬 데이터 타입, 컴포넌트 간 props에 대한 타입 등 앱 전반에서 적절한 타입 명시

## 추가 구현 사항
- [ ✅ ] TanStack Query를 통한 데이터 캐싱
- [ ✅ ] dynamic metadata 구현

## 자체 구현 사항
- [ ✅ ] debounced 검색 기능 구현

## 트러블 슈팅
### 클라이언트 컴포넌트와 서버 컴포넌트에 대한 이해 부족
- TanStack Query를 활용하여 데이터를 캐싱하는 과정에서, TanStack Query가 클라이언트 컴포넌트에서만 사용이 가능함을 사용 중 알았고, 이를 별도 컴포넌트로 제작하여 서버 컴포넌트인 디테일 페이지에서 import 하는 방식으로 최초 구현하였으나, 이런 방식은 결국 클라이언트 컴포넌트가 된다는 점에 대해서 이해하지 못하여 어려움이 있었음.
- TanStack Query를 서버 컴포넌트에서 사용하기 위한 기본 세팅이 어려워 시간이 다소 소요되었음.
### TypeScript 사용 미숙
- TypeScript를 배운지 얼마 되지 않아 익숙하지 않았고, 코드를 작성하고 발생한 에러가 대부분 타입 명시와 관련된 에러였고, 에러 메세지를 보고 수정하는 과정에서 시간이 다소 소요되었음.

## 느낀 점
- React.js를 배우면서도 Next.js에 대한 학습욕이 있었는데, 배우고 보니 이는 서버 컴포넌트의 보안성 때문이었고, 더 재미있는 기능을 구현해보고 싶음.
- 지금 본인이 작성한 페이지의 렌더링 방식이 어떤 방식인지 심도있게 고민해보는 시간을 가졌고, 이는 지금까지의 과정 중 없었던 사고의 과정으로, 프론트 엔드 개발자에 더 다가가는 느낌이 들었고 추가 학습에 대한 욕구가 생김.

## 시연

### 포켓몬 리스트 페이지
![CleanShot 2024-07-04 at 01 06 31](https://github.com/Captain-Kim/NBC-HW-Nextj.js-Pokemon_DEX-0705-/assets/160568904/afefcf03-c554-4330-8bbe-ac86b4ff01ca)

### 포켓몬 디테일 페이지
![CleanShot 2024-07-04 at 01 09 12](https://github.com/Captain-Kim/NBC-HW-Nextj.js-Pokemon_DEX-0705-/assets/160568904/edde85f4-5722-48c8-8763-98029a5c71dd)

### 검색창
![CleanShot 2024-07-04 at 01 10 38](https://github.com/Captain-Kim/NBC-HW-Nextj.js-Pokemon_DEX-0705-/assets/160568904/3c2eac21-93ca-4091-9f24-7601c00c65ba)

## 구현 과정
[블로그 링크](https://infistudy.tistory.com/366)
