import axios from 'axios';

const baseURL = 'https://slideverywhere-api.xav1er.com';

const request = axios.create({
  baseURL,
});

// @ts-ignore
request.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI3MGY0YTNiMy04YmZiLTRiYjMtYmQ4Ni1jOWZjMDRjMzE4NmMiLCJpYXQiOjE2NjUyMzA0MTB9.9fSSlaYwWfcnZELXUtV2hUa0uDPo9vNXqKeaudvMbkA`,
  };
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, 'network error');
  },
);

export { request, baseURL };
