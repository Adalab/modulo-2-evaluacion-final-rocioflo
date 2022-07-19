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
const favStored = JSON.parse(localStorage.getItem('Anime favorites') || '[]');

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
      renderAnime();
    });
}

//image painter
function renderAnime() {
  resultsList.innerHTML = '';
  for (const item of animes) {
    const favCorrelation = animeFavs.find((fav) => fav.mal_id === item.mal_id);

    let isFav = '';

    if (favCorrelation) {
      isFav = 'fav-res-background font-fav';
    }

    if (item.images.jpg.image_url === noImage) {
      resultsList.innerHTML += `
        <li id="${item.mal_id}" class="list-item ${isFav} js_list_item">
          ${item.title} 
          <img class="anime-image" src="${placeholderImage}">
        </li>`;
    } else {
      resultsList.innerHTML += `
      <li id="${item.mal_id}" class="list-item ${isFav} js_list_item">
        ${item.title} 
        <img class="anime-image" src="${item.images.jpg.image_url}">
      </li>`;
    }
  }
  listenerAnimes();
}

submitBtn.addEventListener('click', handleInput);

//favs
let animeFavs = [];

function handleClick(event) {
  const animeId = parseInt(event.currentTarget.id);

  const favFound = animes.find((anime) => anime.mal_id === animeId);
  const animeIndexFound = animeFavs.findIndex(
    (anime) => anime.mal_id === animeId
  );

  if (animeIndexFound === -1) {
    animeFavs.push(favFound);
  } else {
    animeFavs.splice(animeIndexFound, 1);
  }

  renderFavorites();
  favStorage();
}

function renderFavorites() {
  favoritesList.innerHTML = '';

  for (const favAnime of animeFavs) {
    if (favAnime.images.jpg.image_url === noImage) {
      favoritesList.innerHTML += `
        <li id="${favAnime.mal_id}" 
        class="fav-list-item js_fav_list_item"></i>
        ${favAnime.title} 
        <i class="icon-heart fa-solid fa-heart"></i>
        <i class="icon-cancel fa-solid fa-heart-circle-xmark"></i>
        <img class="anime-image" 
        src="${placeholderImage}">
        </li>`;
    } else {
      favoritesList.innerHTML += `
        <li id="${favAnime.mal_id}" 
        class="fav-list-item js_fav_list_item"></i>
        ${favAnime.title} 
        <i class="icon-heart fa-solid fa-heart"></i>
        <i class="icon-cancel fa-solid fa-heart-circle-xmark"></i>
        <img class="anime-image" 
        src="${favAnime.images.jpg.image_url}">
        </li>`;
    }
  }
  renderAnime();
  listenerFavAnimes();
}

function listenerAnimes() {
  const animeList = document.querySelectorAll('.js_list_item');

  for (const li of animeList) {
    li.addEventListener('click', handleClick);
  }
}

function listenerFavAnimes() {
  const animeFavList = document.querySelectorAll('.js_fav_list_item');
  for (const li of animeFavList) {
    li.addEventListener('click', handleClick);
  }
}

// local storage

function favStorage() {
  localStorage.setItem('Anime favorites', JSON.stringify(animeFavs));
}

function favDisplay() {
  animeFavs = favStored;

  if (favStored && favStored !== '') {
    for (const favAnime of favStored) {
      if (favAnime.images.jpg.image_url === noImage) {
        favoritesList.innerHTML += `
          <li id="${favAnime.mal_id}" 
          class="fav-list-item js_fav_list_item"></i>
          ${favAnime.title} 
          <i class="icon-heart fa-solid fa-heart"></i>
          <i class="icon-cancel fa-solid fa-heart-circle-xmark"></i>
          <img class="anime-image" 
          src="${placeholderImage}">
          </li>`;
      } else {
        favoritesList.innerHTML += `
          <li id="${favAnime.mal_id}" 
          class="fav-list-item js_fav_list_item"></i>
          ${favAnime.title} 
          <i class="icon-heart fa-solid fa-heart"></i>
          <i class="icon-cancel fa-solid fa-heart-circle-xmark"></i>
          <img class="anime-image" 
          src="${favAnime.images.jpg.image_url}">
          </li>`;
      }
    }
  } else {
    renderFavorites();
  }
  listenerFavAnimes();
}

favDisplay();

// reset button

function handleResetClick() {
  resultsList.innerHTML = '';
  input.value = '';
}

resetBtn.addEventListener('click', handleResetClick);

// reset favs button

const resetFavsBtn = document.querySelector('.js_reset_favs_btn');

function handleResetFavsClick() {
  animeFavs = [];
  favoritesList.innerHTML = '';
  localStorage.removeItem('Anime favorites');
  renderAnime();
}

resetFavsBtn.addEventListener('click', handleResetFavsClick);
