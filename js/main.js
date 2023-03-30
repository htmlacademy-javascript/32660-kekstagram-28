import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {renderPictures} from './thumbnail.js';
import {setUserFormSubmit, closeFormUploadImage} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import './scale.js';
import './effect.js';


try {
  const photos = await getData();
  renderPictures(photos);
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

