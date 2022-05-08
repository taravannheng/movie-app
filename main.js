const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&sort_by=popularity.desc';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.querySelector('main');
const form = document.querySelector('form');
const searchBox = document.getElementById('search-box');

getMovies(API_URL);

form.addEventListener('submit', (e) => {
    let searchTerm = searchBox.value;

    e.preventDefault();
    searchBox.value = ''; //clear search box

    searchTerm = searchTerm.replace(/ /g, '+');

    getMovies(SEARCH_API_URL + searchTerm);
});

async function getMovies(url) {
    const promise = await fetch(url);
    const data = await promise.json();

    showMovies(data.results);
    console.log(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';    //clear main

    movies.forEach(movie => {
        let {poster_path, title, vote_average, overview} = movie;
        const movieElement = document.createElement('div');

        if (overview === '') {
            overview = 'No data';
        }
        
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <div class="movie-poster">
            <img src="${POSTER_URL + poster_path}" alt="${title}">
            </div>
            <div class="movie-info">
                <h1 class="movie-title">${title}</h1>
                <span class="movie-rating ${getRatingClass(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="movie-overview">
                <h2>Overview</h2>
                <p>${overview}</p>
            </div>
        `;

        main.appendChild(movieElement);
    });
}

function getRatingClass(vote_average) {
    if (vote_average >= 8) {
        return 'high';
    } else if (vote_average >= 5) {
        return 'medium';
    } else {
        return 'low';
    }
}