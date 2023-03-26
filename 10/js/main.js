import {createPhotos} from './data.js';
import {renderPictures} from './thumbnail.js';
import './form.js';
import './scale.js';
import './effect.js';

const photos = createPhotos();

renderPictures(photos);
