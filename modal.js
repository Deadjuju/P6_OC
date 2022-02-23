const ENDPOINT_URL = "http://localhost:8000/api/v1/titles/";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalLink = document.querySelectorAll(".modalLink")

modalTriggers.forEach(trigger => trigger.addEventListener("click",(e) => {

    // display the modal
    toggleModal()

    let idMovie = e.originalTarget.id;
    console.log(`Id Movie: ${idMovie}`);
    // alert(`click! sur ${idMovie}`);
    fetchMovieId(idMovie);
    })
)

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
    resumeModalMovie.innerText = data.long_description;
}

function toggleModal(){
    modalContainer.classList.toggle("active")
}

