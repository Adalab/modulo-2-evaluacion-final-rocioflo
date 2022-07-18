'use strict';

//global variables
const input = document.querySelector('.js_input');
const submitBtn = document.querySelector('.js_submit_Btn');
const resetBtn = document.querySelector('.js_reset_Btn');
const resultsList = document.querySelector('.js_results_list');
const favoritesList = document.querySelector('.js_favorites_list');
const apiURL = 'https://api.jikan.moe/v4/anime?q=';
const noImage =
  'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const placeholderImage =
  'https://via.placeholder.com/225x200/ffffff/666666/?text=sin%20imagen%20%20:(';

//petition to server

let animes = [];

function handleInput(ev) {
  ev.preventDefault();
  animes = [];
  resultsList.innerHTML = 'Cargando...';
  const userInput = input.value.toLowerCase();

  fetch(`${apiURL}${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      console.log(animes);
      renderAnime();
    });
}

//image painter
function renderAnime() {
  resultsList.innerHTML = '';
  for (const item of animes) {
    if (item.images.jpg.image_url === noImage) {
      resultsList.innerHTML += `
        <li id="${item.mal_id}" class="list-item js_list_item">
          ${item.title} 
          <img class="anime-image" src="${placeholderImage}">
        </li>`;
    } else {
      resultsList.innerHTML += `
      <li id="${item.mal_id}" class="list-item js_list_item">
        ${item.title} 
        <img class="anime-image" src="${item.images.jpg.image_url}">
      </li>`;
    }
  }
  listenerAnimes();
}

console.log(animes);
submitBtn.addEventListener('click', handleInput);

//favs
let animeFavs = [];

function handleClick(event) {
  const animeId = parseInt(event.currentTarget.id);
  const favFound = animes.find((anime) => anime.mal_id === animeId);
  const animeIndexFound = animeFavs.findIndex(
    (anime) => anime.mal_id === animeId
  );

  console.log(animeIndexFound);
  console.log(animeFavs);

  if (animeIndexFound === -1) {
    animeFavs.push(favFound);
  } else {
    animeFavs.splice(animeIndexFound, 1);
  }

  favStorage();
  renderFavorites();
}

function renderFavorites() {
  favoritesList.innerHTML = '';
  for (const favAnime of animeFavs) {
    favoritesList.innerHTML += `
  <li id="${favAnime.mal_id}" class="list-item js_list_item">
    ${favAnime.title} 
    <img class="anime-image" src="${favAnime.images.jpg.image_url}">
  </li>`;
  }
}

function listenerAnimes() {
  const animeList = document.querySelectorAll('.js_list_item');

  for (const li of animeList) {
    li.addEventListener('click', handleClick);
  }
}

// local storage

function favStorage() {
  localStorage.setItem('Anime favorites', JSON.stringify(animeFavs));
}
