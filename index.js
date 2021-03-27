const API_BASE = "https://api.jikan.moe/v3";
const SEARCH_BTN = document.getElementById("search-btn");
const DOM_RESULT= document.getElementById("results");
const SEARCH_INPUT = document.getElementById("search-input");

SEARCH_BTN.addEventListener("click", searchAnime);

async function searchAnime(){

    DOM_RESULT.innerHTML = `<div class="text-center spinner-border" 
    role="status"><span class="visually-hidden">Loading...</span></div>`;

    if(SEARCH_INPUT.value.length == 0) return;

    const SEARCH_ARGS = await SEARCH_INPUT.value.replace(/ /g, "%20");
    const SEARCH = await (await fetch(API_BASE+`/search/anime?q=${SEARCH_ARGS}&page=1`)).json();
    const RESULTS = await SEARCH.results;
    RESULTS.length = 16;

    DOM_RESULT.innerHTML = await RESULTS.map(anime => {
        return (`<div id="${anime.id}" class="result border bg-light">
        <img src="${anime.image_url}">
        <div id ="result-text">
          <h6 class="title" id="${anime.id}">${anime.title}</h6>
          <i class="far fa-star"> </i> ${anime.score}<br/>
          <p>${anime.synopsis}</p>
        </div>
      </div>`)
    }).join("");
}
