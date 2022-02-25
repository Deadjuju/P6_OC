const numberMovies = 7;

const ENDPOINT_URL = "http://localhost:8000/api/v1/titles/";
const BEST_MOVIES = [`?sort_by=-votes&page_size=${numberMovies}`, "bests"];
const BEST_HORROR = [`?&sort_by=-votes&page_size=${numberMovies}&genre=horror`, "horrors"];
const BEST_ANIMATION = [`?&sort_by=-votes&page_size=${numberMovies}&genre=animation`, "animations"];
const BEST_MUSICAL = [`?&sort_by=-votes&page_size=${numberMovies}&genre=musical`, "musicals"];

// generate best movie info 
function getInfoBestMovie(category) {
    fetch(`${ENDPOINT_URL}${category[0]}`)
    .then(response => response.json())
    .then(moviesData => {
        // console.log(moviesData.results[0]);
        let results = moviesData.results[0];
        let bestUrl = results.url;
    
        fetch(bestUrl)
        .then(responseBest => responseBest.json())
        .then(bestData => {
            // console.log(bestData);
            const bestTitle = document.querySelector(".title-best-h2");
            bestTitle.innerText = bestData.original_title;
    
            const bestResume = document.querySelector(".resume-best-movie p");
            bestResume.innerHTML = `<span>RESUME: </span><br>${bestData.long_description}`;
    
            const bestImg = document.querySelector(".cover-best-movie img");
            bestImg.src = bestData.image_url;

            const bestButton = document.querySelector(".best-button")
            bestButton.setAttribute("id", `${bestData.id}`);
        })
    })
}
getInfoBestMovie(BEST_MOVIES);


// Create Carousels
function createCarouselCards(categories) {

    const bestTrack = document.querySelector(`.${categories[1]}-track`);
    fetch(`${ENDPOINT_URL}${categories[0]}`)
    .then(response => response.json())
    .then(moviesData => {
        results = moviesData.results;
        // console.log(results);
        let indice = 1
        results.forEach(element => {
            // console.log(element);
    
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add(`${categories[1]}-card${indice}`);
            
            // Add classes for modal
            card.classList.add("modal-btn");
            card.classList.add("modal-trigger");

            card.setAttribute("id", `${element.id}`);
            card.style.backgroundImage = 'url("' + element.image_url + '")';
    
            cardContainer.appendChild(card);
            bestTrack.appendChild(cardContainer);
    
            indice ++
    
        });
    })
}

function createCarousel(categories) {
    createCarouselCards(categories);

    const prev = document.querySelector(`.${categories[1]}-prev`);
    const next = document.querySelector(`.${categories[1]}-next`);
    const carousel = document.querySelector(`.${categories[1]}-carousel-container`);
    const track = document.querySelector(`.${categories[1]}-track`);

    let width = carousel.offsetWidth;
    let index = 0;

    window.addEventListener("resize", function () {
      width = carousel.offsetWidth;
    });
    
    next.addEventListener("click", function (e) {
      e.preventDefault();
      index = index + 1;
      prev.classList.add("show");
      track.style.transform = "translateX(" + index * -width + "px)";
      if (track.offsetWidth - index * width < index * width) {
        next.classList.add("hide");
      }
    });
    prev.addEventListener("click", function () {
      index = index - 1;
      next.classList.remove("hide");
      if (index === 0) {
        prev.classList.remove("show");
      }
      track.style.transform = "translateX(" + index * -width + "px)";
    });
}

let bestCarousel = createCarousel(BEST_MOVIES);
let horrorCarousel = createCarousel(BEST_HORROR);
let animationCarousel = createCarousel(BEST_ANIMATION);
let musicalCarousel = createCarousel(BEST_MUSICAL);



// Generate Modals

const modalContainer = document.querySelector(".modal-container");

document.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(e.target.className);

  let idMovie = e.target.id;
  if (e.target.className.includes("modal-trigger")) {
    console.log(`Id Movie: ${idMovie}`);

    toggleModal();

    console.log(`Id Movie: ${idMovie}`);
    // alert(`click! sur ${idMovie}`);
    fetchMovieId(idMovie);
  }
})

function toggleModal(){
    modalContainer.classList.toggle("active")
}

function fetchMovieId(id) {
    fetch(`${ENDPOINT_URL}${id}`)
    .then(response => response.json())
    .then(movieData => {
        console.log(movieData);
        let title = movieData.original_title
        console.log(title);
        console.log(`click! sur ${id}: ${title}`);

        createSingleCard(movieData)
    })
}

function createSingleCard(data) {
    let imgModalMovie = document.querySelector("#modalImg");
    imgModalMovie.src = data.image_url;
    let titleModalMovie = document.querySelector("#modalTitle");
    titleModalMovie.innerText = data.original_title.toUpperCase();
    let directorsModalMovie = document.querySelector("#modalDirectors");
    directorsModalMovie.innerText = data.directors;
    let countriesModalMovie = document.querySelector("#modalCountries");
    countriesModalMovie.innerText = data.countries;
    let actorsModalMovie = document.querySelector("#modalActors");
    actorsModalMovie.innerHTML = `Actors: <br>${data.actors}`;
    let ratedModalMovie = document.querySelector("#modalRated");
    ratedModalMovie.innerText = `Rated: ${data.rated}`;
    let releaseDateModalMovie = document.querySelector("#modalReleaseDate");
    releaseDateModalMovie.innerText = `Release Date: ${data.date_published}`;
    let durationDateModalMovie = document.querySelector("#modalDuration");
    durationDateModalMovie.innerText = `Duration: ${data.duration} minutes`;
    let worldwideGrossIncomeModalMovie = document.querySelector("#modalWorldwideGrossIncome");
    worldwideGrossIncomeModalMovie.innerText = `Box office result: ${data.worldwide_gross_income} ${data.budget_currency}`;
    let resumeModalMovie = document.querySelector("#modalResume");
    resumeModalMovie.innerHTML = `Resume:<br>${data.long_description}`;
}



