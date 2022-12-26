const APIKEY = "78b5d622"
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const movieContent = document.getElementById("movie-content")
const wlContent = document.getElementById("wl-content")
let watchList = localStorage.getItem("movieIds") ? JSON.parse(localStorage.getItem("movieIds")) : []

document.addEventListener("click", function(e) {
    if(e.target.dataset.add) {
        handleAddMovie(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveMovie(e.target.dataset.remove)
    } else if (e.target.id === "search-btn") {
        e.preventDefault()
        handleSearchBtnClick()
    }
})

function handleAddMovie(movieId) {
    watchList.unshift(movieId)
    localStorage.setItem("movieIds", JSON.stringify(watchList))
}

function handleRemoveMovie(movieId) {
    watchList = watchList.filter(id => id !== movieId )
    localStorage.setItem("movieIds", JSON.stringify(watchList)) 
    renderWatchList()  
}

async function handleSearchBtnClick() {
    movieContent.innerHTML = ``
    if (searchInput.value) {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=${APIKEY}`)
        const data = await response.json()
        if (data.Search) {
            const movieIds = data.Search.map(movie => movie.imdbID)
            renderSearchMovie(movieIds)
        } else {
            movieContent.innerHTML = `<h4 class="bold msg-title">Unable to find what you’re looking for. Please try another search.</h4>`
        }
    } else {
        movieContent.innerHTML = `<h4 class="bold msg-title">Unable to find what you’re looking for. Please try another search.</h4>`
    }
}

async function renderSearchMovie(movieIds) {
    movieContent.innerHTML = await getAllMovieHtml(movieIds, "add")
}

async function renderWatchList() {
    if (!watchList.length) {
        wlContent.innerHTML = `<h4 class="bold msg-title">Your watchlist is looking a little empty...</h4>
                               <p>Let's add some movies!</p>`
    } else {
        wlContent.innerHTML = await getAllMovieHtml(watchList, "remove")
    }
}  

async function getAllMovieHtml(movieIds, iconType) {
    let movieContentHtml = `` 
    for (let movieId of movieIds) {
        const movieResponse = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${APIKEY}`)
        const movie = await movieResponse.json()
        movieContentHtml += getSingleMovieHtml(movie, iconType)
    }
    return movieContentHtml
}

function getSingleMovieHtml(movie, iconType) {
    let movieActionHtml = ``
    if (iconType === "add") {
        movieActionHtml = `<button class="add-btn" data-add=${movie.imdbID}></button>
                           <p class="small-text">Watchlist</p>`
    } else {
        movieActionHtml = `<button class="remove-btn" data-remove=${movie.imdbID}></button>
                           <p class="small-text">Remove</p>`
    }

    let plotHtml = ``
    if (movie.Plot.length <= 132) {
        plotHtml = `<p class="movie-desc">${movie.Plot}</p>`
    } else {
        plotHtml = `<p class="movie-desc">${movie.Plot.substr(0, 132)}... <span class="read-more small-text">Read more</span></p>`
    }

    const movieHtml = `<div class="movie-item">
                        <img class="movie-profile" src=${movie.Poster} alt=${movie.Title}>
                        <div class="movie-detail">
                            <div class="movie-head">
                                <h4 class="movie-title semi-bold">${movie.Title}</h4>
                                <img class="star-icon" src="./images/star_icon.png" alt="star-icon">
                                <p class="movie-rating small-text">${movie.imdbRating}</p>
                            </div>
                            <div class="movie-info">
                                <p class="movie-length small-text">${movie.Runtime}</p>
                                <p class="movie-genre small-text">${movie.Genre}</p>
                                <div class="movie-action">
                                    ${movieActionHtml}
                                </div>
                            </div>
                            ${plotHtml}
                        </div>
                    </div>`
    return movieHtml
}
                

renderWatchList()

