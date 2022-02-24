const ENDPOINT_URL = "http://localhost:8000/api/v1/titles/";
const BEST_MOVIES = "?sort_by=-votes&page_size=7";

// generate best movie info 
function getInfoBestMovie(category) {
    fetch(`${ENDPOINT_URL}${category}`)
    .then(response => response.json())
    .then(moviesData => {
        // console.log(moviesData.results[0]);
        let results = moviesData.results[0];
        let bestUrl = results.url;
    
        fetch(bestUrl)
        .then(responseBest => responseBest.json())
        .then(bestData => {
            console.log(bestData);
            const bestTitle = document.querySelector(".title-best-h2");
            bestTitle.innerText = bestData.original_title;
    
            const bestResume = document.querySelector(".resume-best-movie p");
            bestResume.innerHTML = `<span>RESUME: </span><br>${bestData.long_description}`;
    
            const bestImg = document.querySelector(".cover-best-movie img");
            bestImg.src = bestData.image_url;
        })
    })
}
getInfoBestMovie(BEST_MOVIES);















// let best_movies_list = [];


// function fetchBestMoviesCategory(url_category) {
//     fetch(`${ENDPOINT_URL}${url_category}`)
//         .then(response => response.json())
//         .then(moviesData => {
//             // console.log(moviesData);
//             moviesData.results.forEach(movie => {
//                 fetchMoviesData(movie)
//             })
//         })
// }

// function fetchMoviesData(movie) {
//     let objectMovieFull = {};
//     let url = movie.url;

//     fetch(url)
//         .then(response => response.json())
//         .then(movieData => {
//             // console.log(movieData);

//             objectMovieFull.imgUrl = movieData.image_url;
//             objectMovieFull.titleMovie = movieData.original_title;
//             objectMovieFull.genres = movieData.genres;
//             objectMovieFull.releaseDate = movieData.date_published;
//             objectMovieFull.rated = movieData.rated;
//             objectMovieFull.imdbScore = movieData.imdb_score;
//             objectMovieFull.directors = movieData.directors;
//             objectMovieFull.actors = movieData.actors;
//             objectMovieFull.duration = movieData.duration;
//             objectMovieFull.countries = movieData.countries;
//             objectMovieFull.worldwideGrossIncome = movieData.worldwide_gross_income;
//             objectMovieFull.description = movieData.long_description;

            
//             best_movies_list.push(objectMovieFull)
//             // console.log(best_movies_list);

//             return best_movies_list;
//         })
// }




// fetchBestMoviesCategory(BEST_MOVIES);

// function getInfoUrl(url_category) {

//     let result = fetch(`${ENDPOINT_URL}${url_category}`)
//                 .then(response => response.json())
//                 .then(moviesData => {
//                     console.log(moviesData.results);
//                 })
//     return result
// }

// let test = getInfoUrl(BEST_MOVIES)
// console.log(`test: ${test}`);