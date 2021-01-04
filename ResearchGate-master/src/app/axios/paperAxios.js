import axios from 'axios';
import config from '../util/config';

export function fetchPaper(topic, offset, cb) {
  const topics = topic.split(' ');
  let data = '';

  for (let i = 0; i < topics.length; i++) {
    if (topics[i].length) {
      if (i > 0) data += '+';
      data = data + topics[i];
    }
  }

  axios
    .get(
      `https://api.crossref.org/works?query=${data}&rows=10&offset=${offset}&select=DOI,title,publisher,author,references-count`,
    )
    .then((res) => {
      cb(null, res.data.message.items);
    })
    .catch((err) => {
      cb(err, []);
    });
}

export function getPaperFromdb(data, cb) {
  axios
    .get(`${config.BASE_API_URL}/paper/get/${data}`)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, {});
    });
}

export function getNewsFeed(username, limit, pageNo, cb) {
  axios
    .get(
      `${config.BASE_API_URL}/paper/get/newest/${username}/${limit}/${pageNo}`,
    )
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, []);
    });
}

export function deletePaper(data, cb) {
  axios
    .post(`${config.BASE_API_URL}/paper/delete`, data)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      cb(err, {});
    });
}
