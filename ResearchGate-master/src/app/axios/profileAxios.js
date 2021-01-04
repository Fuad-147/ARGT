import axios from 'axios';
import config from '../util/config';

export function fetchProfile(data, cb) {
  axios
    .get(`${config.BASE_API_URL}/user/get/profile/${data}`)
    .then((res) => {
      //console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      //console.log(err);
    });
}

export function fetchFollowing(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/user/get/follow`, data)
    .then((res) => {
      console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      console.log(err);
    });
}

export function follow(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/user/follow`, data)
    .then((res) => {
      console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      console.log(err);
    });
}

export function unfollow(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/user/unfollow`, data)
    .then((res) => {
      console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      console.log(err);
    });
}

export function updateProfile(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/user/update`, data)
    .then((res) => {
      console.log(res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      console.log(err);
    });
}

export function getPeople(data, search, cb) {
  axios
    .get(`${config.BASE_API_URL}/user/search/${search}/${data}`)
    .then((res) => {
      console.log(res.data);

      // sends an object so wrap it in an array
      if (search === 'email') cb(null, [res.data]);
      else cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      //console.log(err);
    });
}

export function getSuggestion(email, limit, cb) {
  axios
    .get(`${config.BASE_API_URL}/user/suggestion/${email}/${limit}`)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, null);
      //console.log(err);
    });
}
