import axios from 'axios';
import config from '../util/config';

export function postPaper(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/paper/submit`, data)
    .then((res) => {
      cb(null);
      console.log('success', res);
    })
    .catch((err) => {
      cb(err);
      console.log('error in axios', err);
    });
}
