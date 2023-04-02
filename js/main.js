import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {renderPictures} from './thumbnail.js';
import {getFilteredPictures, init} from './filter.js';
import {setUserFormSubmit, closeFormUploadImage} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import './scale.js';
import './effect.js';


try {
  const photos = await getData();
  const debounceRenderedPhotos = debounce(renderPictures);
  init(photos, debounceRenderedPhotos);
  renderPictures(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeFormUploadImage();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

