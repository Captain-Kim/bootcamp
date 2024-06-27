// 영화정보 api

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzhlYWZkZjBlMjA3NGVhMjBjYzQ4YWQ4OTdkOTNiMCIsInN1YiI6IjY2MjYyNTc3MjU4ODIzMDE3ZDkyYWMyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvbVqzpDWzP2q2o0zUPPI46p6l9xcHP84V4FVLj983k",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  //   .then((response) => console.log(response))
  .then((response) => {
    console.log(response.results[0].title);
    const images = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzhlYWZkZjBlMjA3NGVhMjBjYzQ4YWQ4OTdkOTNiMCIsInN1YiI6IjY2MjYyNTc3MjU4ODIzMDE3ZDkyYWMyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VvbVqzpDWzP2q2o0zUPPI46p6l9xcHP84V4FVLj983k",
      },
    };

    fetch("https://api.themoviedb.org/3/configuration", options)
      .then((response) => response.json())
      .then((data) => {
        // 이미지 api
        console.log(data);
        const imageBaseUrl = data.images.base_url;
        const imagePosterSize = data.images.poster_sizes[4];
        const imageUrl = imageBaseUrl + imagePosterSize;
        document.getElementById("movie-poster").src =
          imageUrl + response.results[0].backdrop_path;

        // let myArray = [];

        // response.results.forEach((e) => {
        //   let abcd = {
        //     title: e.title,
        //     overview: e.overview,
        //     poster_path: e.poster_path,
        //     vote_average: e.vote_average,
        //     id: e.id,
        //   };

        //   myArray.push(abcd);
        // });

        // map 메서드를 사용하여 각 배열 요소에 대해 카드를 생성하고 템플릿 문자열을 반환합니다.
        let temp_html_array = response.results.map((item) => {
          // let abcd = {
          //   title: item.title,
          //   overview: item.overview,
          //   poster_path: item.poster_path,
          //   vote_average: item.vote_average,
          //   id: item.id,
          // };
          return `<div class="movie-card" id="${item.id}">
        <img src="${imageUrl}${item.poster_path}" id="movie-poster" />
        <p class="movie-title">${item.title}</p>
        <p class="movie-overview">${item.overview}</p>
        <p class="movie-vote">rating: ${item.vote_average}</p>
      </div>`;
        });

        // 반환된 템플릿 문자열들을 조합하여 최종 결과를 얻습니다.
        let temp_html = temp_html_array.join("");

        // DOM에 카드를 추가합니다.
        document.getElementById("card-section").innerHTML = temp_html;
        // 카드 클릭 ID 출력
        // 각 카드에 대해 이벤트 리스너를 추가합니다.

        // myArray.forEach((item) => {
        //   const card = document.getElementById(item.id);
        //   card.addEventListener("click", () => {
        //     alert(`영화의 ID는 ${item.id}입니다`);
        //   });
        // });

        const cards = document.getElementById("card-section");
        console.log(cards);
        cards.addEventListener("click", (event) => {
          const clickEvent = event.target.closest(".movie-card");
          if (clickEvent !== null) {
            alert(clickEvent.id);
          }
        });

        // console.log(myArray);
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
