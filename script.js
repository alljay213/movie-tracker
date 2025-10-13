function addMovie() {
  const movieTitle = document.getElementById("movie-title");
  const movieGenre = document.getElementById("movie-genre");
  const movieRating = document.getElementById("movie-rating");
  const movieList = document.getElementById("movie-list");

  const movieInfo =
    movieTitle.value +
    " - " +
    movieGenre.value +
    " - " +
    movieRating.value +
    "\n";

  console.log("button works " + movieInfo);

  // Clear input fields
  movieTitle.value = "";
  movieGenre.value = "";
  movieRating.value = "";

  // Append new movie to the list
  const newListItem = document.createElement("li");
  newListItem.textContent = movieInfo;
  movieList.appendChild(newListItem);
}

document.getElementById("add-movie-btn").addEventListener("click", addMovie);
