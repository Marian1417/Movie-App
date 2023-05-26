import "./style.css";

const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

const key = "626ff0f7";
const baseUrl = "http://www.omdbapi.com/";

const displayErrorMessage = (message) => {
  result.innerHTML = `<h3 class="msg">${message}</h3>`;
};

const searchMovies = async (searchTerm) => {
  if (!searchTerm) {
    displayErrorMessage("Please enter a search term");
    return;
  }

  searchBtn.disabled = true;
  movieNameRef.disabled = true;

  const url = `${baseUrl}?s=${searchTerm}&apikey=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      displayErrorMessage(data.Error);
    } else {
      const movies = data.Search;
      const movieDetails = [];

      for (let i = 0; i < movies.length; i++) {
        const movieUrl = `${baseUrl}?i=${movies[i].imdbID}&apikey=${key}`;
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();

        if (movieData.Response === "True") {
          movieDetails.push(movieData);
        }
      }

      if (movieDetails.length === 0) {
        displayErrorMessage("No results found");
      } else {
        result.innerHTML = movieDetails
          .map(
            (movie) => `
            <div class="info">
              <img src=${movie.Poster} class="poster">
              <div>
                <h2>${movie.Title}</h2>
                <div class="details">
                  <span>${movie.Rated}</span>
                  <span>${movie.Year}</span>
                </div> 
                <div class="genre">
                  <div>${movie.Genre.split(",").join()}</div>
                </div>
                <h3>Plot</h3>
                <p>${movie.Plot}</p>
                <h3>Cast</h3>
                <p>${movie.Actors}</p>
              </div>
            </div>
          `
          )
          .join("");
      }
    }
  } catch (error) {
    displayErrorMessage("An error occurred. Please try again later.");
  } finally {
    searchBtn.disabled = false;
    movieNameRef.disabled = false;
  }
};

searchBtn.addEventListener("click", () => {
  const searchTerm = movieNameRef.value;
  searchMovies(searchTerm);
});

movieNameRef.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    const searchTerm = movieNameRef.value;
    searchMovies(searchTerm);
  }
});
