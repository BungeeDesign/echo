import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:1255/',
  responseType: 'json',
});
