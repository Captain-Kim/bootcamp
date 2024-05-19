import { movieListAPI } from "./movie.js"

let scrollHeight;
let $searchInput = document.getElementById("search_input");

// 이 코드를 작성한 이유는 사용자가 '높은 평점순(top_rated)'를 보고 있을 때 언어 변경 버튼을 누르면 html이 초기화 되면서 초기 페이지인 '인기순(popular)'로 화면이 초기화 되기 때문에
// 이를 유지시키기 위해 fetch하는 url에서 베이스 url 중 top_rated, popular 부분을 로컬 스토리지에 저장된 값을 기준으로 쿼리스트링에 교체하여 fetch하기 위함.
// 로컬 스토리지에 isViewedNow라는 변수를 생성하고 기본 값으로 'popular'를 할당함.
localStorage.setItem('isViewedNow', 'popular');
// setViewedMenu라는 함수를 만들고 임의의 매개변수 menu를 만들어 사용자가 현재 보고 있는 메뉴(인기순, 높은 평점순 중)를 로컬스토리지에 값으로 할당할 준비를 함.
let setViewedMenu = (menu) => {
    localStorage.setItem('isViewedNow', menu);
}

// isViewedNow라는 변수를 만들고 로컬스토리지에서 isViewedNow의 값을 할당함.
export let isViewedNow = localStorage.getItem("isViewedNow");

export const handleMenuSelect = (e) => {
    const targetBtn = e.target.closest('.menu_btn');
    if (targetBtn && !targetBtn.classList.contains('chk')) {
        const $chk = document.querySelector(".chk");
        if (targetBtn.id === "popular") {
            // 사용자가 popular를 보고 있을 경우 위에서 선언한 setViewedMenu 함수에 매개변수로 전달해서 로컬스토리지의 isViewedNow 값으로 "popular"를 할당함.
            setViewedMenu("popular");
            movieListAPI();
        } else if (targetBtn.id === "top_rated") {
            // 사용자가 top_rated를 보고 있을 경우 로컬스토리지에 top_rated로 할당함.
            setViewedMenu("top_rated");
            movieListAPI(`/3/movie/top_rated?&page=1`);
        }
        if ($chk) {
            $chk.classList.remove("chk");
        }
        targetBtn.classList.add('chk');
    }
}


export const handleScrollSave = (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    sessionStorage.setItem("scrollY", scrollHeight);
}
export const handleScrollTop = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export const handleScrollTo = () => {
    $searchInput.focus();
    const scrollY = parseInt(sessionStorage.getItem("scrollY"));
    if (scrollY && scrollY > 0) {
        window.scrollTo(0, scrollY);
    }
}
