const RANDOM_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;

const sortRandomPictures = () => Math.random() - 0.5;

const sortDiscussedPictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = (pictures) => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return pictures.slice(0).sort(sortRandomPictures).slice(0, RANDOM_COUNT);
    case Filter.DISCUSSED:
      return pictures.slice(0).sort(sortDiscussedPictures);
    default:
      return pictures;
  }
};

const setOnFilterClick = (cb) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterContainer.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter) {
      return;
    }
    filterContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;

    cb();
  });
};

export {getFilteredPictures, setOnFilterClick};
