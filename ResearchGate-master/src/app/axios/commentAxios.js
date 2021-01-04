import axios from 'axios';
import config from '../util/config';

export function sendComment(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/comment/add`, data)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
}

export function sendReply(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/comment/reply`, data)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
}

export function fetchComments(data, cb) {
  axios
    .get(`${config.BASE_API_URL}/comment/get/${data}`)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
    });
}
