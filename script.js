let movies = [];

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function loadMovies() {
  const stored = localStorage.getItem("movies");
  if (stored) {
    movies = JSON.parse(stored);
    movies.forEach(renderMovie);
  }
}

loadMovies();

function addMovie() {
  const movieTitle = document.getElementById("movie-title");
  const movieGenre = document.getElementById("movie-genre");
  const movieRating = document.getElementById("movie-rating");
  const movieYear = document.getElementById("movie-year");
  const movieImage = document.getElementById("movie-image");

  const movieList = document.getElementById("movie-list");

  const movieInfo = `${movieTitle.value} - ${movieYear.value} - ${movieGenre.value} - ${movieRating.value}`;

  console.log("button works " + movieInfo);

  // Create new list item
  const newListItem = document.createElement("li");
  newListItem.textContent = movieInfo;

  // File object for image upload
  const files = movieImage.files;

  if (files && files.length) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        const img = document.createEleme;
        nt("img");
        img.src = url;
        img.alt = movieTitle.value;
        img.width = 100; // Set a fixed width for the image
        img.onload = () => {
          URL.revokeObjectURL(url); // Free up memory
          newListItem.insertBefore(img, newListItem.firstChild); // Insert image at the start of the list item
        };
      } else {
        const badge = document.createElement("em");
        badge.textContent = ` [attached: ${file.name}]`;
        newListItem.appendChild(badge);
      }
    });
  }

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  newListItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    movieList.removeChild(newListItem);
  });

  // Append new list item to movie list
  movieList.appendChild(newListItem);

  // Clear input fields
  movieTitle.value = "";
  movieGenre.value = "";
  movieYear.value = "";
  movieRating.value = "";
  movieImage.value = "";
}

document.getElementById("add-movie-btn").addEventListener("click", addMovie);
