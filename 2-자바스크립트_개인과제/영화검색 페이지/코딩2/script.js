const options = {
    method: 'GET', // HTTP 요청 메서드. GET 요청을 날림.
    headers: { // HTTP 요청 헤더를 지정하는 객체.
        accept: 'application/json', // accept 헤더에 json 파일로 받아오라고 말함.
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzhlYWZkZjBlMjA3NGVhMjBjYzQ4YWQ4OTdkOTNiMCIsInN1YiI6IjY2MjYyNTc3MjU4ODIzMDE3ZDkyYWMyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvbVqzpDWzP2q2o0zUPPI46p6l9xcHP84V4FVLj983k'
    } // Authorization API 인증 토큰 입력함.
};

fetch('https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1', options) // fetch 요청으로 api에 get 요청 보냄. option에 설정한 정보(객체)를 함께 전송해서 위 옵션대로 요청이 수행됨.
    .then(response => response.json()) // 받아온 api를 json 파일로 파싱하기
    .then(response => { // 이 코드 블럭 내에서 코드 작성 가능.
        // 이 부분에 실제로 데이터를 처리하고 화면에 표시하는 로직을 넣으면 됨. 보통 DOM 조작, 데이터 처리 등을 함.
        // json으로 가져온 데이터를 화면에 표시하거나 조작하려면 이 then 메서드에서 콜백 함수로 작성해야 함.

        const cardContainer = document.getElementById('cardSection');
        // HTML에서 id가 'cardSection'인 요소를 찾음(카드가 들어갈 곳의 상위 컨테이너 id)
        // 위 코드가 길어서 cardContainer라는 변수에 할당함.

        function showScreen(val = '') { // showScreen이라는 함수를 정의함. 매개변수로 val을 지정하고, =''를 기본값으로 지정하면 "선택적으로 매개변수를 사용한다"는 의미임.
            // 즉 아래 함수 내용을 보면 검색어가 val에 전달이 되면 showScreen(검색어)로 전달이 되고 아니면 빈 스트링 값이 default 상태로도 사용할 수 있음.
            // cardContainer.innerHTML = ''; // 밑에 innerHTML로 +=는 append. =으로 쓸 거면 밀고 하는 거라 이 줄이 필요 없음.
            // showScreen 함수가 실행되면, 즉 이 함수는 페이지에 HTML 문서에 영화 카드를 채워 넣는 함수이기 때문에 시작하자마자 HTML 문서를 비우고 시작함.
            // 비우고 시작하는 이유는 검색어에 특정 키워드를 넣으면 그 카드만 보여줘야 하는데 이 때 다른 카드를 선택적으로 지우든지
            // 아니면 싹 다 밀고 검색어에 걸리는 카드만 띄워주는 방법이 있겠는데 후자 방식을 선택함.
            const cardHTML = response.results.map(item => {
                // response.results라는 배열을 map 메서드를 사용해서 순회할 것임. 그리고 이 함수 코드가 길어서 cardHTML이라는 변수를 만들어서 할당함.
                if (item.name.includes(val)) {
                    // if문을 사용해서 input에 넣은 값이 response.results의 name 프로퍼티의 값에 포함이 되는지 확인함.
                    // 일치하는 경우 아래의 템플릿 리터럴로 HTML로 카드를 채워넣는 것으로 return함.
                    return `<div class="movie_cards" id="${item.id}" display="block">

                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
        <p class="movie_name">${item.name}</p>
        <p class="movie_overview">${item.overview}</p>
        <p class="movie_vote">평점 : ${item.vote_average}</p>
        </div>`;
                }
            }
            ).join('') // map을 돌리니 input에 x2씩 빈 스택이 쌓이는 문제 콘솔에서 발견, join으로 콤마를 지우고 x2 문제는 해결. 그래도 +1씩은 쌓임. 이 문제 해결해야 할 듯.
            cardContainer.innerHTML = cardHTML; // += 이든 = 이든 innerHTML이 다 밀고 넣는 건데 append 개념으로 차이가 나는 이유는?
        }

        showScreen();

        // 검색기능

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchButton');

        searchBtn.addEventListener('click', (event) => {
            event.preventDefault(); // 무엇을 막고 없으면 왜 작동을 안 하는지?
            // event 객체는 함수 선언 시 매개변수로 지정하지 않아도 사용할 수 있음. event라고 정확히 키워드를 써줘야 함.
            // 코드블럭 내에 참조할 event 객체가 없다면 전역에 있는 event를 참조한다.
            // 취소선이 그어지는 경우 마우스 호버해봐서 내용을 살펴보도록 하자.
            // var Event와 같이 나오면 자바스크립트 내장 객체를 전역에서 참조한다는 의미이다. var는 내가 선언한 적이 없고 앞으로도 없을 거임. (윈도우 객체)
            // 그런데 내가 event를 전역에서 선언하지 않았더라도 JS 내장된 prototype 객체에서 참조한다.

            // 콜백함수 매개변수 안에 event로 매개변수를 지정하지 않으면 serachBtn의 "click" 이벤트를 특정한 것이 아니라 마크업이 복잡해지면 엉뚱한 것을 참조할 수 있음.

            // preventDefault는 a 태그, submit 등 다양하게 붙으면서 기본 동작을 막음. 현재 마크업에서는 form에 달았음.

            // form 태그를 사용하면 안에 button 태그를 넣고 속성을 submit으로 지정하지 않아도 submit으로 '암묵적으로 '지정된다. 그런데 submit의 기본 속성이 서버에 제출하고
            // 페이지를 리로드한다. 그래서 현재 여기서 preventDefault는 submit 동작을 막기 때문에 페이지 새로고침이 안 되는 것. preventDefault를 지우면 새로고침이 바로 됨.
            const val = searchInput.value;
            console.log(val);
            showScreen(val);
        })

        // 카드 클릭 id 출력 이벤트

        const movieCards = document.getElementsByClassName('movie_cards'); // 카드가 들어갈 곳을 HTML 문서 내에서 클래스로 지목
        // const asdf = document.querySelectorAll('.movie_cards');

        // Nodelist는 forEach만 가능. map 메서드는 불가능. map 메서드를 돌리려면 Array.from으로 변환 필요.
        // querySelectorAll로 셀렉터를 사용하면 Nodelist로 나오고, getElementsByClassName을 사용하면 HTMLCollection으로 나옴.
        // 둘 다 유사배열객체임. 그러나 하는 역할이 다른 것. HTMLCollection은 동적이고 Nodelist는 스냅샷으로 정적임. 그 역할의 차이.
        // 둘 다 Array.from을 사용해주는 게 낫다. 안 써도 에러가 안 나는 케이스가 있지만 그냥 쓰도록 하자.

        Array.from(movieCards).forEach(card => { // movieCards는 배열이 아님. HTMLCollection이므로 배열과 유사한 객체임. (유사배열객체)
            // Array.from(HTMLCollection을 지목한 변수명).forEach(매개변수명 => {})은 객체를 배열로 변환한 후에 forEach() 반복문을 수행함.
            card.addEventListener('submit', (event) => { // form 태그 내부에 button을 달았는데 내가 button의 속성을 직접 지정해주진 않았지만 자동으로 submit으로 인식됨. 이 경우 'click'이벤트는 아니고 'submit' 이벤트로 지정해야 함.
                const clickedMovieCard = event.currentTarget.id; // event.currentTarget은 이벤트가 발생한 요소를 가리킴.
                alert(`클릭한 영화의 아이디는 ${clickedMovieCard}입니다.`);
            }); // addEventListener는 페이지에 무리를 주기 때문에 최대한 사용하지 않는 것이 좋겠으나 지금 내 코드는 forEach로 20번을 돌리기 때문에 더 좋지 않을 것. 최적화 할 수 있는 방법에 대해서 고민해보기.
            // Body 같은 상위 태그에 달아서 하나로 줄이는 방법(?) 무한 스크롤같이 API를 계속 받아오는 사이트 등에서는 무리가 클 것으로 예상됨.
        });

    })

    .catch(err => console.error(err));

// 더 해볼 것

// 무한 스크롤
// 20번째 인덱스가 화면에 출력됐을 때 api 2페이지로 바꿔서 get 요청을 날려라
// 검색 후 초기화 버튼
// addEventListener를 최대한 적게 사용하도록 최적화 하기.
// 빈 input을 submit 하면 콘솔에 빈 값이 +1씩 계속 찍히는 문제 원인 파악하고 좋지 않은 점 파악하기. 그리고 개선하기.