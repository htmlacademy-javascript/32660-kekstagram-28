import {createPhotos} from './data.js';
import {renderPictures} from './thumbnail.js';
import {openPictureModal, closePictureModal} from './picture-modal.js';

const photos = createPhotos();
const picturesContainer = document.querySelector('.pictures');
const bigPictureModalCloseElement = document.querySelector('.big-picture__cancel');

picturesContainer.addEventListener('click', openPictureModal);
bigPictureModalCloseElement.addEventListener('click', closePictureModal);

renderPictures(photos);

export {photos};
