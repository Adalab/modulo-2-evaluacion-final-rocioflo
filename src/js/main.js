'use strict';

//global variables
const input = document.querySelector('.js_input');
const submitBtn = document.querySelector('.js_submit_Btn');
const resetBtn = document.querySelector('.js_reset_Btn');
const resultsList = document.querySelector('.js_results_list');
const favoritesList = document.querySelector('.js_favorites_list');

//petition to server

let animes = [];

function handleInput(ev) {
  ev.preventDefault();
  const userInput = input.value.toLowerCase();

  fetch(`https://api.jikan.moe/v4/anime?q=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      console.log(animes);
      renderAnime();
    });
}

//image painter
function renderAnime() {
  for (const item of animes) {
    if (
      item.images.jpg.image_url ===
      `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
    ) {
      resultsList.innerHTML += `<li class="list-item js_list_item">${item.title} <img class="anime-image" src="https://via.placeholder.com/225x200/ffffff/666666/?text=sin%20imagen%20%20:("></li>`;
    } else {
      resultsList.innerHTML += `<li class="list-item js_list_item">${item.title} <img class="anime-image" src="${item.images.jpg.image_url}"></li>`;
    }
  }
}

console.log(animes);
submitBtn.addEventListener('click', handleInput);

//favs
let animeFavs = [];

function addFavs() {
  const listItem = document.querySelector('.js_list_item');

  listItem.addEventListener('click', (handleImageClick) =>
    listItem.classList.add('red-background')
  );
}
