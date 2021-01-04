import axios from 'axios';
import config from '../util/config';

export function register(data, cb) {
  console.log('calling axios register');
  axios
    .post(`${config.BASE_API_URL}/user/register`, data)
    .then((res) => {
      console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function login(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/user/login`, data)
    .then((res) => {
      console.log('result from axios ', res);
      cb(null, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
