"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const movieDataBase = "http://localhost:3000/Movies";
const pUsername = document.querySelector(".username");
if (pUsername) {
    const storedUsername = sessionStorage.getItem("username");
    pUsername.textContent = storedUsername ? storedUsername : " ";
}
class AllMovieFunctions {
    constructor() {
        this.currentMovieId = null;
    }
    displayMovie() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(movieDataBase);
            let Movies = yield response.json();
            const MovieListDiv = document.querySelector(".movie-cards");
            if (MovieListDiv) {
                Movies.forEach((movie) => {
                    const movieElement = document.createElement("div");
                    movieElement.classList.add("movie");
                    // For movie image
                    const imageElement = document.createElement("img");
                    imageElement.src = movie.movieimage;
                    movieElement.appendChild(imageElement);
                    // Add movie title
                    const titleElement = document.createElement("p");
                    titleElement.textContent = `Title: ${movie.movietitle}`;
                    movieElement.appendChild(titleElement);
                    // Add movie year
                    const yearElement = document.createElement("p");
                    yearElement.textContent = `Year of Release: ${movie.yearofrelease}`;
                    movieElement.appendChild(yearElement);
                    // Add movie price
                    const priceElement = document.createElement("p");
                    priceElement.textContent = `Price: ${movie.price}KSh/=`;
                    movieElement.appendChild(priceElement);
                    // Add movie quantity instock
                    const instockElement = document.createElement("p");
                    instockElement.textContent = `In Stock: ${movie.instock}`;
                    movieElement.appendChild(instockElement);
                    //Add a rent or buy button
                    const buybtnElement = document.createElement("button");
                    buybtnElement.textContent = "Buy";
                    buybtnElement.id = `buy-${movie.id}`;
                    movieElement.classList.add("buybtn");
                    movieElement.appendChild(buybtnElement);
                    //Add a update button
                    const updateElement = document.createElement("button");
                    updateElement.textContent = "Update";
                    updateElement.id = `update-${movie.id}`;
                    movieElement.classList.add("updatebtn");
                    movieElement.appendChild(updateElement);
                    //Add a delete button
                    const delbtnElement = document.createElement("button");
                    delbtnElement.textContent = "Delete";
                    delbtnElement.id = `delete-${movie.id}`;
                    movieElement.classList.add("delbtn");
                    movieElement.appendChild(delbtnElement);
                    // Event listener for update button
                    updateElement.addEventListener("click", () => {
                        this.updateMovie(movie.id);
                    });
                    // Event listener for delete button
                    delbtnElement.addEventListener("click", () => {
                        this.deleteMovie(movie.id);
                    });
                    MovieListDiv.appendChild(movieElement);
                    // console.log(movieElement)
                });
            }
        });
    }
    addMovieContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const sugmovieimage = document.getElementById("movie-image");
            const sugmoviename = document.getElementById("movie-name");
            const sugmovieyear = document.getElementById("movie-year");
            const sugmovieprice = document.getElementById("movie-price");
            const sugmovieinstock = document.getElementById("movie-instock");
            const sugmoviebtn = document.getElementById("movie-suggestion");
            const sugerrormessage = document.querySelector(".sugerrormessage");
            sugmoviebtn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                if (!sugmovieimage.value || !sugmoviename.value || !sugmovieyear.value || !sugmovieprice.value || !sugmovieinstock.value) {
                    sugerrormessage.innerHTML = `<p>Fill in all the boxes</p>`;
                    sugerrormessage.style.display = "block";
                    sugerrormessage.style.backgroundColor = "red";
                }
                else if (this.currentMovieId === null) {
                    yield this.AddMovie(sugmovieimage.value, sugmoviename.value, sugmovieyear.value, sugmovieprice.value, sugmovieinstock.value);
                }
                else {
                    yield this.updateMovie(this.currentMovieId);
                }
                sugerrormessage.innerHTML = `<p>Movie suggestion submitted successfully</p>`;
                sugerrormessage.style.display = "block";
                sugerrormessage.style.backgroundColor = "green";
                sugmovieimage.value = "";
                sugmoviename.value = "";
                sugmovieyear.value = "";
                sugmovieprice.value = "";
                sugmovieinstock.value = "";
                this.currentMovieId = null;
            }));
        });
    }
    //for creating new movie
    AddMovie(movieimage, movietitle, yearofrelease, price, instock) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovie = { movieimage: movieimage, movietitle: movietitle, yearofrelease: yearofrelease, price: price, instock: instock };
            const response = yield fetch(movieDataBase, {
                method: 'POST',
                body: JSON.stringify(newMovie)
            });
            if (response) {
                console.log('Movie added successfully');
            }
            else {
                console.error('Failed to add movie');
            }
        });
    }
    // for deleting a movie
    deleteMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield fetch(`${movieDataBase}/${id}`, {
                method: "DELETE",
            });
            // Remove the movie element from the UI
            const movieElement = document.getElementById(`delete-${id}`);
            if (movieElement) {
                (_a = movieElement.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(movieElement);
            }
        });
    }
    updateMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${movieDataBase}/${id}`);
            const movieData = yield response.json();
            // Populate the form fields with the movie details
            const sugMovieImage = document.getElementById("movie-image");
            const sugMovieName = document.getElementById("movie-name");
            const sugMovieYear = document.getElementById("movie-year");
            const sugMoviePrice = document.getElementById("movie-price");
            const sugmovieinstock = document.getElementById("movie-instock");
            const sugErrorMessage = document.querySelector(".sugerrormessage");
            sugMovieImage.value = movieData.movieimage;
            sugMovieName.value = movieData.movietitle;
            sugMovieYear.value = movieData.yearofrelease;
            sugMoviePrice.value = movieData.price;
            sugmovieinstock.value = movieData.instock;
            const sugMovieBtn = document.getElementById("movie-suggestion");
            // sugMovieBtn.textContent = "Update"
            this.currentMovieId = id;
            sugMovieBtn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const updatedMovie = {
                    id,
                    movieimage: sugMovieImage.value,
                    movietitle: sugMovieName.value,
                    yearofrelease: sugMovieYear.value,
                    price: sugMoviePrice.value,
                    instock: sugmovieinstock.value
                };
                const updateResponse = yield fetch(`${movieDataBase}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(updatedMovie),
                });
                if (updateResponse) {
                    sugErrorMessage.innerHTML = "<p>Movie suggestion updated successfully</p>";
                    sugErrorMessage.style.display = "block";
                    sugErrorMessage.style.backgroundColor = "green";
                    this.displayMovie();
                }
                else {
                    sugErrorMessage.innerHTML = "<p>Failed to update movie</p>";
                    sugErrorMessage.style.display = "block";
                    sugErrorMessage.style.backgroundColor = "red";
                }
            }), { once: true }); // Ensure the event listener is added only once
        });
    }
}
const allMovieFunctions = new AllMovieFunctions();
allMovieFunctions.displayMovie();
allMovieFunctions.addMovieContent();
