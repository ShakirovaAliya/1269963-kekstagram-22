const PHOTO_COUNT = 25;
const PHOTO_RANDOM_COUNT = 10;
let imgFilter = document.querySelector('.img-filters');
let filterButtonDefault = imgFilter.querySelector('#filter-default');
let filterButtonRandom = imgFilter.querySelector('#filter-random');
let filterButtonDiscussed = imgFilter.querySelector('#filter-discussed');

const changeFilters = (checkedFilter, otherFilter1, otherFilter2) => {
  if (!checkedFilter.classList.contains('img-filters__button--active')) {
    checkedFilter.classList.add('img-filters__button--active');
    otherFilter1.classList.remove('img-filters__button--active');
    otherFilter2.classList.remove('img-filters__button--active');
  } else {
    checkedFilter.classList.remove('img-filters__button--active');
  }
}

export { imgFilter, filterButtonDefault, PHOTO_COUNT, PHOTO_RANDOM_COUNT, filterButtonRandom, filterButtonDiscussed, changeFilters }
