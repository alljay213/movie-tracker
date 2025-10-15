function addMovie() {
  const movieTitle = document.getElementById("movie-title");
  const movieGenre = document.getElementById("movie-genre");
  const movieRating = document.getElementById("movie-rating");
  const movieYear = document.getElementById("movie-year");
  const movieImage = document.getElementById("movie-image");

  const movieList = document.getElementById("movie-list");

  const movieInfo = `${movieImage.value} - ${movieTitle.value} - ${movieYear.value} - ${movieGenre.value} - ${movieRating.value}`;

  console.log("button works " + movieInfo);

  // Create new list item
  const newListItem = document.createElement("li");
  newListItem.textContent = movieInfo;

  // Append new list item to movie list
  movieList.appendChild(newListItem);

  // File object for image upload
  const files = movieImage.files;

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  newListItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    movieList.removeChild(newListItem);
  });

  // Clear input fields
  movieTitle.value = "";
  movieGenre.value = "";
  movieYear.value = "";
  movieRating.value = "";
  movieImage.value = "";
}

document.getElementById("add-movie-btn").addEventListener("click", addMovie);
