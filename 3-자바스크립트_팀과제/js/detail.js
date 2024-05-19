import { ApiFetch } from "./movie.js"
import { currentLanguage } from "./language.js";
import { handleAddReviews, loadReviews, handleClose, modalOk } from "./review.js"
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');


const $reviewsForm = document.querySelector("#review-form");
$reviewsForm.addEventListener('submit', handleAddReviews);
const $close = document.querySelectorAll('.close');
const $modalOk = document.querySelector('#modal-ok');

$close.forEach(e => {
    e.addEventListener('click', handleClose)
});

$modalOk.addEventListener('click', modalOk);


// detail.js

// API 데이터 관련 
// 영화 상세 데이터를 가져오는 함수
const fetchMovieDetails = async (movieId) => {
    const url = `/3/movie/${movieId}?append_to_response=credits,release_dates`;
    try {
        const movieDetails = await ApiFetch(url);
        let certificationData = { certification: 'No Information' };

        // 영화 등급 정보가 존재하는 경우에만 가져옴
        if (movieDetails.certification !== undefined) {
            certificationData = await getMovieCertifications(movieId);
            // 관람 등급 정보를 movieDetails 객체에 할당
            movieDetails.certification = certificationData.certification;
        }

        return movieDetails;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}


// 영화 관람 등급 정보 가져오는 함수
// 기존 코드에서 전부 코드 자체를 수정함 (함수화 하여 언어전환 기능에서 재사용하기 위함 - 김병준)

// getMovieCertifications 함수의 첫 번째 조건문과 이어지는 변수 초기화로, fetch를 보낼 때 캐시 메모리에 저장해서 API를 재사용하기 위해 작성함. 이 코드가 없으면 fetch가 2의 배수로 실행되는 에러가 발생함.
let cachedCertifications = null;

// 영화의 관람 등급 정보를 비동기적으로 가져옴. movieId 인자는 영화의 ID값. 
const getMovieCertifications = async (movieId) => {
    // cachedCertifications에 값이 저장되어 있다면 fetch 요청을 하지 않고 캐시된 값을 반환함.
    if (cachedCertifications) {
        return cachedCertifications;
    }

    try {
        // 로컬스토리지에 저장된 현재 언어정보를 변수에 할당함. (예: 'en-US')
        const currentLanguage = localStorage.getItem('currentLanguage');
        // TMDB API에서 영상물 등급 정보를 요청하는 URL을 기본 구성함.
        const url = `/3/movie/${movieId}/release_dates?language=${currentLanguage}`;
        // API를 호출함.  ApiFetch는 movie.js에서 베이스 URL을 포함하고 있고, 매개변수로는 바로 위에서 지정한 url을 붙여서 만듦.
        const movieCertifications = await ApiFetch(url);
        // API 응답을 받은 results 배열을 다시 변수에 할당함. (재사용)
        const certificationResults = movieCertifications.results;

        // 영상물 등급 정보를 변수에 할당하기 위해 변수를 만들고 기본값으로 'No Information' 스트링을 할당함.
        let certification = 'No Information';

        // 영상물 등급 정보 fetch로 응답받은 배열의 길이가 0보다 길면 (데이터가 있으면) 아래 조건문을 실행함.
        if (certificationResults && certificationResults.length > 0) {
            // 배열에서 'US'가 iso_3166_1 코드로 갖는 데이터를 찾아 변수에 할당함.
            const usReleaseData = certificationResults.find(result => result.iso_3166_1 === 'US');
            // usReleaseData가 존재하고, release_dates 배열에 데이터가 0보다 길면 (데이터가 있으면) 아래 조건문을 실행함.
            if (usReleaseData && usReleaseData.release_dates.length > 0) {
                // 첫 번째 release_dates의 certification(영상물 등급 정보) 값을 변수에 재할당함.
                certification = usReleaseData.release_dates[0].certification;
            }
        }

        // 이렇게 구한 certification(영상물 등급 정보)의 값을 cachedCertifications 변수에 객체로 할당함.
        cachedCertifications = { certification };
        return cachedCertifications;
    } catch (error) {
        console.error('Error fetching movie certifications:', error);
    }
};



// 영화 상세 데이터를 가져와서 화면에 표시하는 함수
const displayMovieDetails = (movieDetails, movieCertifications) => {
    // detail_main 요소 선택
    const detailMain = document.querySelector('.detail_main');

    //영화 감독 정보 추출
    const directors = movieDetails.credits.crew.filter(member => member.job === "Director");
    const directorNames = directors.map(director => director.name).join(', ');

    // 출연 배우 정보 추출
    const actors = movieDetails.credits.cast.slice(0, 10);
    const actorNames = actors.map(actor => actor.name).join(', ');

    // 영상물 등급 언어변경 기능
    // TMDB 영상물 등급 한국 기준으로 치환하여 객체로 저장.
    const certificationKR = {
        "M": "청소년 관람 불가",
        "B": "청소년 관람 불가",
        "R": "청소년 관람 불가",
        "N-13": "15세 이상 관람가",
        "12": "12세 이상 관람가",
        "12+": "12세 이상 관람가",
        "12A": "12세 이상 관람가",
        "PG-13": "12세 이상 관람가",
        "M/12": "12세 이상 관람가",
        "11": "12세 이상 관람가",
        "PG": "12세 이상 관람가",
        "TP": "전체 관람가",
        "G": "전체 관람가",
    };

    // 영화 등급 정보를 화면에 출력하는 코드
    // 최초 값은 빈 스트링으로 지정. 빈 스트링으로 할당하지 않아도 되지만 앞으로 값이 채워질 것임을 시멘틱하게 알림.
    let certificationHTML = '';
    // movieCertifications 변수는 영상물 등급 정보 API Fetch의 결과임. 이 객체에서 certification이라는 영상물 등급 정보가 존재하면서, 그 값이 'no information'이 아니면 아래의 조건문을 실행함.
    if (movieCertifications && movieCertifications.certification && movieCertifications.certification !== 'No Information') {
        // 로컬스토리지에 저장한 현재 언어 정보를 변수에 할당 (재사용 목적)
        let currentLanguage = localStorage.getItem('currentLanguage');
        // 현재 언어 정보가 영어일 때 TMDB에서 가져온 미국 기준 영상물 등급 정보를 detail 페이지에 출력함.
        if (currentLanguage === 'en-US') {
            certificationHTML = `
                <hr class="certification_hr">
                <h5 class="detail_certifications">${movieCertifications.certification}</h5>
            `;
            // 그러나 현재 언어 정보가 한국어일 때는 직접 한국어로 치환시켜 저장한 객체 certificationKR 에서 일치하는 프로퍼티를 찾아 값을 반환함.
        } else if (currentLanguage === 'ko-KR') {
            const certificationKey = movieCertifications.certification;
            // 치환된 영상물 등급 정보를 다시 변수에 담아서 아래 템플릿 리터럴에서 출력시킴.
            const certificationValue = certificationKR[certificationKey];
            if (certificationValue) {
                certificationHTML = `
                    <hr class="certification_hr">
                    <h5 class="detail_certifications">${certificationValue}</h5>
                `;
            }
        }
    }

    // detail_main 요소의 innerHTML을 채워 넣음
    const showMovieList = (movieDetails) => {
        let currentLanguage = localStorage.getItem('currentLanguage');
        detailMain.innerHTML = `
            <div class="img_container">
              <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" 
                  alt="${movieDetails.title}" class="detail_img">
                <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" 
                    alt="${movieDetails.title}" class="detail_main_img">
                </div>
            <div class="content_container">
                <div class="detail_box1">
                    <h2 class="detail_title">${movieDetails.title}</h2>
                    <button class="detail_heart_btn" id="${movieDetails.id}">
                        <img class="heartEmpty" src="assets/icon/heartEmpty.svg"></img>
                        <img class="heartRed" src="assets/icon/heartRed.svg"></img>
                    </button>
                </div>
                <div class="detail_box2">
                    <div class="detail_scores">
                        <i class="fa fa-star" id="scores"></i>
                        <h5>${movieDetails.vote_average}</h5>
                    </div>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_year">${movieDetails.release_date.substring(
            0,
            4
        )}</h5>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_runtime">${movieDetails.runtime}${currentLanguage === 'ko-KR' ? '분' : ' minutes'}</h5>
                    ${certificationHTML}
                    <hr class="detail_box1_hr">
                    <h5 class="detail_genres">${movieDetails.genres.map(genre => genre.name).join(', ')}</h5>
                </div>
                <hr class="detail_box3_hr">
                <div class="detail_box3">
                    <div class="detail_director">
                        <h4 class="director_title">${currentLanguage === 'ko-KR' ? '감독' : 'Director'}</h4>
                        <h5 class="director_name">${directorNames}</h5>
                    </div>
                    <div class="detail_actors">
                        <h4 class="actors_title">${currentLanguage === 'ko-KR' ? '출연' : 'Actors'}</h4>
                        <h5 class="actors_name">${actorNames}</h5>
                    </div>
                    <div class="detail_contents">
                        <h4 class="plot_title">${currentLanguage === 'ko-KR' ? '소개' : 'Introduction'}</h4>
                        <h5 class="detail_plot">${movieDetails.overview}</h5>
                    </div>
                </div>
                <hr class="detail_box3_hr">
            </div>
        `;
    }

    showMovieList(movieDetails);

    // 박솔 추가 이벤트
    if (hearts.includes(movieDetails.id.toString())) {
        document.querySelector(".detail_heart_btn").classList.add("clicked");
    }
};

// 찜 버튼 클릭 이벤트
const HEART_LS = "hearts";
if (localStorage.getItem("hearts") === null) {
    localStorage.setItem("hearts", "[]");
}
let hearts = JSON.parse(localStorage.getItem("hearts"));
function clickHeart(event) {
    const heartBtn = document.querySelector(".detail_heart_btn");
    const thisId = event.target.parentNode.id;

    // 중복값 방지 조건문
    if (!hearts.includes(thisId.toString())) {
        // 찜하지 않은 상태에서 클릭 시 등록 이벤트
        hearts.push(thisId);
        localStorage.setItem(HEART_LS, JSON.stringify(hearts));
        alert(localStorage.getItem('currentLanguage') === 'ko-KR' ? "찜한 목록에 저장되었습니다." : "You saved it in a list of dimensions.");
        heartBtn.classList.add("clicked");
    } else {
        // 찜한 상태에서 다시 클릭 시 취소 이벤트
        const thisIdx = hearts.indexOf(thisId);
        hearts.splice(thisIdx, 1);
        localStorage.setItem(HEART_LS, JSON.stringify(hearts));
        alert(localStorage.getItem('currentLanguage') === 'ko-KR' ? "찜한 목록에서 삭제되었습니다." : "You have deleted it from the list of dimensions.");
        heartBtn.classList.remove("clicked");
    }
}

(function init() {
    loadReviews();

    // 한영전환 버튼 클릭 시 언어전환하여 화면에 새로운 영화 카드를 채워넣는 코드
    // 한영전환 버튼에 이벤트 리스너를 클릭으로 닮.
    document.getElementById('lang_change_btn_detail').addEventListener('click', async () => {
        // 한영전환 버튼 클릭 시 로컬스토리지에서 currentLanguage라는 변수의 값을 현재 언어와 반대로 재할당함.(토글)
        // 현재 한글이면 영어로 전환해야 하고, 영어면 한글로 전환해야 하기 때문.
        (localStorage.getItem("currentLanguage")) === 'en-US' ? localStorage.setItem("currentLanguage", 'ko-KR') : localStorage.setItem("currentLanguage", 'en-US');

        // cachedCertifications은 영상물 등급 정보를 저장하는 캐시로 코드 위에서 선언했었는데 이를 초기화함을 null을 할당하여 시멘틱하게 알림.
        cachedCertifications = null;

        // 이 아래는 바뀐 언어정보를 포함해서 fetch를 새롭게 요청하고 화면에 채워넣는 로직임.
        // ApiFetch 함수를 movie.js에서 기본 구성하고 있기에 재사용하여야 바람직하나 쿼리스트링 이해 부족으로 새롭게 fetch를 함. 학습 후 추후 개선 예정.
        const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,release_dates&language=${localStorage.getItem("currentLanguage")}&api_key=21ccf5793f9e51cfba0198fa23b3d541`;
        const movieDetails = await fetch(url);
        const result = await movieDetails.json();
        // 영화 overview(요약)이 비어있는지 확인하는 로직. 대부분 영화는 overview가 있기에 기본값으로 true를 명시.
        let isOverView = true;
        // overview가 빈 스트링일 경우 isOverView의 값을 false로 재할당함.
        if (result.overview === '') {
            isOverView = false
        }
        // 그리고 isOverView가 false일 경우 한국어를 지원하지 않는다는 alert창을 띄움.
        // TMDB API는 영어는 지원하더라도 한국어를 지원하지 않는 경우가 많고 그 반대는 없기 때문에 영어로 알림을 띄움.
        if (!isOverView) {
            alert('The movie does not support Korean.')
        } else {
            // overview에 내용이 있는 경우 HTML을 채우는 함수를 실행함.
            const movieCertifications = await getMovieCertifications(movieId);
            displayMovieDetails(result, movieCertifications);
        }
    }
    )

    // // URL에서 영화 ID 가져오기
    // const urlParams = new URLSearchParams(window.location.search);
    // const movieId = urlParams.get('id');

    // TMDB API를 사용하여 영화 상세 데이터 가져오기
    Promise.all([
        fetchMovieDetails(movieId),
        getMovieCertifications(movieId) // 관람 등급 정보도 가져오기
    ])
        .then(([movieDetails, movieCertifications]) => {
            // 영화 상세 데이터를 화면에 표시하기
            displayMovieDetails(movieDetails, movieCertifications);
            // detail.html 언어변경 기능
            const reviewInput = document.getElementById('review');
            const reviewTitle = document.getElementById('review-title');
            const submitReviewBtn = document.getElementById('submit-review');
            const reviewPageTitle = document.getElementById('review-page-title');
            if (currentLanguage === 'ko-KR') {
                reviewInput.placeholder = '감상평을 적어주세요!';
                reviewTitle.textContent = '감상평';
                submitReviewBtn.textContent = '등록';
                reviewPageTitle.textContent = '상세페이지';
            } else if (currentLanguage === 'en-US') {
                reviewInput.placeholder = 'Write down your review!';
                reviewTitle.textContent = 'Review';
                submitReviewBtn.textContent = 'submit';
                reviewPageTitle.textContent = 'Review Page';
            }
            // 찜하기 버튼 클릭 기능
            // 기존 솔님 코드 변경 (사유 : detail 페이지에서 한영전환 시 찜하기 버튼 작동하지 않음 - 김병준)
            // document.querySelector(".detail_heart_btn").addEventListener("click", clickHeart);

            // 기존 코드에서는 언어전환 버튼을 눌러 언어 변경을 했을 때 페이지가 새로 로드되면서 찜하기 하트 버튼에 대한 이벤트 리스너가 새로 연결되지 않아 언어변경 이후 이벤트 리스너가 작동하지 않았음.
            // 바꾼 코드는 언어 변경 버튼을 눌러 페이지가 로드될 때 계속 이벤트 리스너가 끊어지는 하트에 이벤트 리스너를 다는 것보다 버튼의 상위 요소인 .detail_main에 이벤트 리스너를 닮.
            document.querySelector('.detail_main').addEventListener('click', function (event) {
                // 클릭된 요소가 detail_heart_btn(하트버튼)이 맞는지 확인함. closest까지 검사하는 이유는 버튼에 하트 이미지가 자식요소로 들어가 있어서 하트 안쪽을 클릭하면 버튼 클릭으로 인식이 안 되기 때문.
                if (event.target.classList.contains('detail_heart_btn') || event.target.closest('.detail_heart_btn')) {
                    clickHeart(event);
                }
            });


        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });

    //처음 모달 사용시 위로 올라가는 오류 해결 코드
    document.body.style.overflow = 'hidden';
    document.body.style.overflow = 'auto';
})();
