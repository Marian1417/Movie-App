import "./style.css";

const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

//function
const getMovie = () => {
  const movieName = movieNameRef.value;
  const key = "626ff0f7";
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  //if input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie title</h3`;
  }
  //if input field is not empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        result.innerHTML = `
        <div class="info">
           <img src=${data.Poster} class="poster">
           <div>
               <h2>${data.Title}</h2>
               <div class="details">
              <span>${data.Rated}</span>
               <span>${data.Year}</span>
           </div> 
           <div class="genre">
             <div>${data.Genre.split(",").join()}</div>
           </div>
           <h3>Plot</h3>
           <p>${data.Plot}</p>
           <h3>Cast</h3>
           <p>${data.Actor}</p>
              
        
           
          
           
           
        </div>


        `;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
