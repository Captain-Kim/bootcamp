// index.html의 영화 카드를 언어 정보만 바꾼 채로 새롭게 그리기 위해 import함.
import { movieListAPI } from "./movie.js";

// 언어변경 버튼 선택자 지정
const changeLangBtn = document.getElementById('lang_change_btn');

// 웹 브라우저 기본 설정 언어를 로컬스토리지에 저장 (일반적으로 한국어 사용자면 'ko-KR'일 것이고, 영어권 사용자면 'en-US'일 것.)
if (!localStorage.getItem("currentLanguage")) {
    localStorage.setItem("currentLanguage", navigator.language);
}

// 로컬 스토리지에 저장된 언어를 변수에 할당. export하는 이유는 이 언어정보 변수를 다른 js 모듈에서도 계속 활용할 것이기 때문.
export let currentLanguage = localStorage.getItem("currentLanguage");

// 언어변경 버튼이 존재하는지 조건식에 넣음. heart.html 작성하신 팀원께서 버튼을 빼니, 없는 버튼에서 이벤트 리스너를 만들려 하니 페이지가 참조 오류로 먹통이 되는 에러가 발생했기 때문. 따라서 버튼이 존재 해야만 이벤트 리스너를 동작시킴.
if (changeLangBtn !== null) {
    // 언어변경 버튼에 클릭 이벤트리스너 추가하여 비동기 함수를 실행시킴.
    changeLangBtn.addEventListener('click', async () => {
        // 버튼 클릭 시 현재 언어와 반대로 값을 재할당함. 이 스크립트에서 브라우저 기본 언어 설정을 쿼리스트링에 담아 movie.js에 전달했기 때문에 index.html은 무조건 기본 언어설정으로 출력됨.
        // 한국어 사용자면 한국어 API가 출력됐을 것이기에 언어 변경은 en-US로의 변경을 의미하고, 영어는 또 반대를 의미하는 것이므로 현재 브라우저 기본 언어 설정과 반대 값으로 재할당.
        currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US';
        // 로컬스토리지에 저장된 isViewedNow라는 변수의 값을 불러와 변수에 할당함. 이 변수는 index.html에서 '인기순', '높은 평점순' 중 사용자가 무엇을 보고 있는지 저장하는 것이고 event.js에서 정의한 것.
        // '높은 평점순'을 보고 있을 때 언어 변경 버튼을 누르면 페이지가 초기화 되면서 초기 상태인 '인기순'으로 넘어가는 현상이 있어 이를 변수에 할당함.
        const viewedMenu = localStorage.getItem('isViewedNow');

        // 언어 변경 버튼을 눌러 재할당 된 언어 정보를 다시 로컬스토리지에 재할당함.
        localStorage.setItem('currentLanguage', currentLanguage); // 변경시킨 언어를 로컬 스토리지에 재할당함

        // movie.js에서 선언한 함수 movieListAPI(fetch를 받아 화면을 그리는 함수)를 다시 실행하여 언어 정보가 바뀐 API를 다시 화면에 그림.
        // 현재 보고 있는 메뉴 정보도 로컬스토리지에서 꺼내와 url에 매개변수로 전달함.
        const url = `/3/movie/${viewedMenu}`;
        await movieListAPI(url);
    }
    )
}