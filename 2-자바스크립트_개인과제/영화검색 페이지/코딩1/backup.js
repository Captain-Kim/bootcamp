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
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.error(err));

// 필수

// title(제목)
// overview(내용 요약)
// poster_path(포스터 이미지 경로)
// vote_average(평점)
