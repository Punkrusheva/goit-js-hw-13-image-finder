/*Есть файл apiService.js с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API */

const MY_KEY = '19150755-18ebc4fb910ab3d1add5e1d5a';
const API_URL = 'https://pixabay.com/api';


export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhotos() {
        
     const url = `${API_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`;
       
     return fetch(url)
         .then(response => response.json())
         .then((photos) => {
             this.incrementPage();
             return photos;
         })
        .catch(error => console.log(error))       
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
    this.searchQuery = newQuery;
  }
}