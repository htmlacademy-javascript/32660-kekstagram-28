import {createPhotos} from './data.js';
import {renderPictures} from './thumbnail.js';
import './form.js';

const photos = createPhotos();

renderPictures(photos);
