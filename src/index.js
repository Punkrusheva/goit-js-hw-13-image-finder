import './css/styles1.css';
import ApiService from './js/apiService';
import photoCard from './templates/photo-card.hbs';
import getRefs from './js/get-refs';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import LoadMoreBtn from './js/components/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const debounce = require('lodash.debounce');
const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

refs.inputEl.addEventListener('input', debounce(onInputSearch, 1000));

loadMoreBtn.refs.button.addEventListener('click', onMorePhotosButtonLoad);

function onInputSearch(e) {
  e.preventDefault();
  apiService.searchQuery = refs.inputEl.value.trim();
  if (apiService.searchQuery !== '') {
   // console.log(apiService.searchQuery);
    loadMoreBtn.show();
    apiService.resetPage();
    clearListEl();
    onMorePhotosButtonLoad();
  } else {
    clearListEl();
    loadMoreBtn.hide();
  }
};

function onMorePhotosButtonLoad() {
  loadMoreBtn.disable();
  apiService.fetchPhotos()
    .then(photos => {
        renderPhotoCard(photos.hits);
      if (photos.hits.length !== 12) {  
      loadMoreBtn.hide();
      } if (photos.hits.length === 0) {
        console.log('пусто!');
        loadMoreBtn.hide();
        click();
        return;
      }
      else { loadMoreBtn.enable(); }
    })
    .catch(error => console.log(error)) 
}

function clearListEl() {
  refs.listEl.innerHTML = '';
}

function renderPhotoCard(photos) {
  if (photos.length !== 0) {
    //console.log(photos);
    photos.map((photo) => {
      const newPhoto = document.createElement("li");
      newPhoto.innerHTML = photoCard(photo);
      refs.listEl.appendChild(newPhoto).classList.add('gallery-item');
      refs.listEl.appendChild(newPhoto).onclick = () => {basicLightbox.create(`<img width="auto" height="auto" src="${photo.largeImageURL}">`).show()};
    });
    } else click()
   }

function onFetchError(error) {
  clickError();
  console.log(error);
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