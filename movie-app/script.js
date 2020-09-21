const APIKEY = "04c35731a5ee918f014970082a0088b1";
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// fetch some movies on page load 
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);

    showMovies(respData);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.results.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRating(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${movie.overview}
            </div>
        `;
        main.appendChild(movieEl);
    });

    return movies;
}
function getClassByRating(vote) {
    if(vote >= 7.5) {
        return "green";
    }
    else if(vote >= 5) {
        return "orange";
    }
    else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
