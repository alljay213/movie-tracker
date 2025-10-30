// 1) in-memory array
let movies = [];

// 2) save to localStorage
function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

// 3) render ONE movie object to the page (used by add + load)
function renderMovie(movieObj) {
  const movieList = document.getElementById("movie-list");

  // make <li>
  const newListItem = document.createElement("li");
  newListItem.textContent = `${movieObj.title} - ${movieObj.year} - ${movieObj.genre} - ${movieObj.rating}`;

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  newListItem.appendChild(deleteButton);

  // when deleting: remove from DOM + from array + save
  deleteButton.addEventListener("click", function () {
    movieList.removeChild(newListItem);

    // remove from movies array
    movies = movies.filter(
      (m) =>
        !(
          m.title === movieObj.title &&
          m.genre === movieObj.genre &&
          m.year === movieObj.year &&
          m.rating === movieObj.rating
        )
    );
    saveMovies();
  });

  movieList.appendChild(newListItem);
}

// 4) load from localStorage on page load
function loadMovies() {
  const stored = localStorage.getItem("movies");
  if (stored) {
    movies = JSON.parse(stored);
    movies.forEach(renderMovie);
  }
}

// run load on startup
loadMovies();

// 5) addMovie runs when you click the button
function addMovie() {
  const movieTitle = document.getElementById("movie-title");
  const movieGenre = document.getElementById("movie-genre");
  const movieRating = document.getElementById("movie-rating");
  const movieYear = document.getElementById("movie-year");
  const movieImage = document.getElementById("movie-image");
  const movieList = document.getElementById("movie-list");

  // build the object that we will store
  const movieObj = {
    title: movieTitle.value,
    genre: movieGenre.value,
    year: movieYear.value,
    rating: movieRating.value,
    // image: skipping for now (file inputs can't be restored easily)
  };

  console.log(
    "button works " +
      `${movieObj.title} - ${movieObj.year} - ${movieObj.genre} - ${movieObj.rating}`
  );

  // 5a) RENDER to page immediately
  const newListItem = document.createElement("li");
  newListItem.textContent = `${movieObj.title} - ${movieObj.year} - ${movieObj.genre} - ${movieObj.rating}`;

  // 5b) IMAGE PREVIEW (only for THIS session)
  const files = movieImage.files;
  if (files && files.length) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        const img = document.createElement("img"); // <-- fixed typo
        img.src = url;
        img.alt = movieObj.title;
        img.width = 100;
        img.onload = () => URL.revokeObjectURL(url);
        // put image before text
        newListItem.insertBefore(img, newListItem.firstChild);
      } else {
        const badge = document.createElement("em");
        badge.textContent = ` [attached: ${file.name}]`;
        newListItem.appendChild(badge);
      }
    });
  }

  // 5c) delete button (for the new item we just made)
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  newListItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    movieList.removeChild(newListItem);

    // also remove from localStorage array
    movies = movies.filter(
      (m) =>
        !(
          m.title === movieObj.title &&
          m.genre === movieObj.genre &&
          m.year === movieObj.year &&
          m.rating === movieObj.rating
        )
    );
    saveMovies();
  });

  // attach to ul
  movieList.appendChild(newListItem);

  // 5d) NOW actually save it to localStorage
  movies.push(movieObj); // <--- this was missing
  saveMovies(); // <--- this was missing

  // 5e) clear inputs
  movieTitle.value = "";
  movieGenre.value = "";
  movieYear.value = "";
  movieRating.value = "";
  movieImage.value = "";
}

// 6) wire button
document.getElementById("add-movie-btn").addEventListener("click", addMovie);
