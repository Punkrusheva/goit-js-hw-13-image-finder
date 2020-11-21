import './css/styles.css';
import ApiService from './js/apiService';
import photoCard from './templates/photo-card.hbs';
import getRefs from './js/get-refs';

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import LoadMoreBtn from './js/components/load-more-btn';

const debounce = require('lodash.debounce');
const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

refs.inputEl.addEventListener('input', debounce(onInputSearch, 1000));

loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

import * as basicLightbox from 'basiclightbox';
/*refs.photoCard.onclick = () => {

  basicLightbox.create(`
		<img width="1400" height="900" src="https://placehold.it/1400x900">
	`).show()
};*/

function onInputSearch(e) {
  e.preventDefault();
  apiService.searchQuery = refs.inputEl.value.trim();

  
  if (apiService.searchQuery !== '') {
    //apiService.searchQuery = searchQuery;
    console.log(apiService.searchQuery);
    apiService.fetchPhotos()
        .then(refs.listEl.innerHTML = '')
        //.then(refs.photoCard.innerHTML = '')
        //.then(e => renderPhotoCard(e.hits))
            .catch(onFetchError)
            .finally(() => { refs.inputEl.value === '' })
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearListEl();
  fetchPhotos();
};

function fetchPhotos() {
  loadMoreBtn.disable();
  apiService.fetchPhotos()
    .then(photos => {
    renderPhotoCard(photos.hits);
    loadMoreBtn.enable();
  });
}

/*function appendPhotosMarkup(photos) {
  refs.listEl.insertAdjacentHTML('beforeend', photoCard(photos));
}*/

function clearListEl() {
  refs.listEl.innerHTML = '';
}

function renderPhotoCard(photos) {
  if (photos.length !== 0) {
    console.log(photos);
    photos.map((photo) => {
      const newPhoto = document.createElement("li");
      newPhoto.innerHTML = photoCard(photo);
      refs.listEl.appendChild(newPhoto)/*.onclick = () => {

  basicLightbox.create(`
		<img width="50%" height="auto" src="${photo.largeImageURL}">
	`).show()
};*/
    });
    
    } else click()
   }

function onFetchError(error) {
            clickError();
        }

function click() {
  error({
    text:
      "Error, no result found!!",
    delay: 700
  });
    }

function clickError() {
  error({
    text:
      "Error!!",
    delay: 700
  });
    }