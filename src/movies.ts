const movieDataBase = "http://localhost:3000/Movies"

const pUsername = document.querySelector(".username") as HTMLParagraphElement
    if (pUsername) {
        const storedUsername = sessionStorage.getItem("username")
        pUsername.textContent = storedUsername ? storedUsername : " "
    }
interface Movie {
    id: number
    movieimage: string
    movietitle: string
    yearofrelease: string
    price:string
    instock:string
}

class AllMovieFunctions {
    private currentMovieId: number | null = null
    public async displayMovie(): Promise<void> {
            let response = await fetch(movieDataBase)
            let Movies: Movie[] = await response.json()

            const MovieListDiv = document.querySelector(".movie-cards")
            if (MovieListDiv) {
                Movies.forEach((movie: Movie) => {
                    const movieElement = document.createElement("div")
                    movieElement.classList.add("movie")

                    // For movie image
                    const imageElement = document.createElement("img")
                    imageElement.src = movie.movieimage
                    movieElement.appendChild(imageElement)

                    // Add movie title
                    const titleElement = document.createElement("p")
                    titleElement.textContent = `Title: ${movie.movietitle}`
                    movieElement.appendChild(titleElement)

                    // Add movie year
                    const yearElement = document.createElement("p")
                    yearElement.textContent = `Year of Release: ${movie.yearofrelease}`
                    movieElement.appendChild(yearElement)

                    // Add movie price
                    const priceElement = document.createElement("p")
                    priceElement.textContent = `Price: ${movie.price}KSh/=`
                    movieElement.appendChild(priceElement)

                    // Add movie quantity instock
                    const instockElement = document.createElement("p")
                    instockElement.textContent = `In Stock: ${movie.instock}`
                    movieElement.appendChild(instockElement)


                    //Add a rent or buy button
                    const buybtnElement = document.createElement("button")
                    buybtnElement.textContent = "Buy"
                    buybtnElement.id = `buy-${movie.id}`
                    movieElement.classList.add("buybtn")
                    movieElement.appendChild(buybtnElement)

                    //Add a update button
                    const updateElement = document.createElement("button")
                    updateElement.textContent = "Update"
                    updateElement.id = `update-${movie.id}`
                    movieElement.classList.add("updatebtn")
                    movieElement.appendChild(updateElement)
                    

                    //Add a delete button
                    const delbtnElement = document.createElement("button")
                    delbtnElement.textContent = "Delete"
                    delbtnElement.id = `delete-${movie.id}`
                    movieElement.classList.add("delbtn")
                    movieElement.appendChild(delbtnElement)
                    
                    // Event listener for update button
                    updateElement.addEventListener("click", () => {
                         this.updateMovie(movie.id)
                        });

                    // Event listener for delete button
                    delbtnElement.addEventListener("click",  () => {
                            this.deleteMovie(movie.id)
                        });

                    MovieListDiv.appendChild(movieElement)

                    // console.log(movieElement)

                })
                
            }
    }
    public async addMovieContent() {
        const sugmovieimage = document.getElementById("movie-image")! as HTMLInputElement
        const sugmoviename = document.getElementById("movie-name")! as HTMLInputElement
        const sugmovieyear = document.getElementById("movie-year")! as HTMLInputElement
        const sugmovieprice = document.getElementById("movie-price")! as HTMLInputElement
        const sugmovieinstock = document.getElementById("movie-instock")! as HTMLInputElement
        const sugmoviebtn = document.getElementById("movie-suggestion")! as HTMLButtonElement
        const sugerrormessage = document.querySelector(".sugerrormessage")! as HTMLElement
    
        sugmoviebtn.addEventListener('click', async (e) => {
            e.preventDefault()
    
            if (!sugmovieimage.value || !sugmoviename.value || !sugmovieyear.value || !sugmovieprice.value || !sugmovieinstock.value) {
                sugerrormessage.innerHTML = `<p>Fill in all the boxes</p>`
                sugerrormessage.style.display = "block"
                sugerrormessage.style.backgroundColor = "red"
            } else if (this.currentMovieId === null) {
                    await this.AddMovie(sugmovieimage.value, sugmoviename.value, sugmovieyear.value, sugmovieprice.value, sugmovieinstock.value)
                } else {
                    await this.updateMovie(this.currentMovieId)
                }
                sugerrormessage.innerHTML = `<p>Movie suggestion submitted successfully</p>`
                sugerrormessage.style.display = "block"
                sugerrormessage.style.backgroundColor = "green"
                sugmovieimage.value = ""
                sugmoviename.value = ""
                sugmovieyear.value = ""
                sugmovieprice.value = ""
                sugmovieinstock.value =""
                this.currentMovieId = null
            })
        }
    //for creating new movie
    public async AddMovie(movieimage: string, movietitle: string, yearofrelease: string, price:string, instock:string) {
        const newMovie = {movieimage: movieimage, movietitle: movietitle, yearofrelease: yearofrelease, price:price, instock:instock}
    
        const response = await fetch(movieDataBase, {
            method: 'POST',
            body: JSON.stringify(newMovie)
            })
    
        if (response) {
            console.log('Movie added successfully')
            } else {
                    console.error('Failed to add movie')
                }
        }

    // for deleting a movie
    public async  deleteMovie(id: number): Promise<void>{
        const response = await fetch(`${movieDataBase}/${id}`, {
            method: "DELETE",
        })
        // Remove the movie element from the UI
        const movieElement = document.getElementById(`delete-${id}`)
        if (movieElement) {
            movieElement.parentElement?.removeChild(movieElement)
        }
    }

    public async updateMovie(id: number): Promise<void> {
            const response = await fetch(`${movieDataBase}/${id}`)
            
            const movieData: Movie = await response.json()
    
            // Populate the form fields with the movie details
            const sugMovieImage = document.getElementById("movie-image")! as HTMLInputElement
            const sugMovieName = document.getElementById("movie-name")! as HTMLInputElement
            const sugMovieYear = document.getElementById("movie-year")! as HTMLInputElement
            const sugMoviePrice = document.getElementById("movie-price")! as HTMLInputElement
            const sugmovieinstock = document.getElementById("movie-instock")! as HTMLInputElement

            const sugErrorMessage = document.querySelector(".sugerrormessage")! as HTMLElement
    
            sugMovieImage.value = movieData.movieimage
            sugMovieName.value = movieData.movietitle
            sugMovieYear.value = movieData.yearofrelease
            sugMoviePrice.value = movieData.price
            sugmovieinstock.value = movieData.instock
    
            const sugMovieBtn = document.getElementById("movie-suggestion")! as HTMLButtonElement
            // sugMovieBtn.textContent = "Update"
            this.currentMovieId = id
            sugMovieBtn.addEventListener("click", async (e) => {
                e.preventDefault()
    
                const updatedMovie: Movie = {
                    id,
                    movieimage: sugMovieImage.value,
                    movietitle: sugMovieName.value,
                    yearofrelease: sugMovieYear.value,
                    price: sugMoviePrice.value,
                    instock: sugmovieinstock.value
                }
    
                const updateResponse = await fetch(`${movieDataBase}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(updatedMovie),
                })
    
                if (updateResponse) {
                    sugErrorMessage.innerHTML = "<p>Movie suggestion updated successfully</p>"
                    sugErrorMessage.style.display = "block"
                    sugErrorMessage.style.backgroundColor = "green"
                    this.displayMovie()
                } else {
                    sugErrorMessage.innerHTML = "<p>Failed to update movie</p>"
                    sugErrorMessage.style.display = "block"
                    sugErrorMessage.style.backgroundColor = "red"
                }
            }, { once: true }) // Ensure the event listener is added only once
    }   }
    

const allMovieFunctions = new AllMovieFunctions()
allMovieFunctions.displayMovie()
allMovieFunctions.addMovieContent()