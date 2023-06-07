import axios from 'axios';

const baseURL = 'https://sparelo-production.herokuapp.com/';
// const baseURL = 'http://192.168.10.6:3000/';
const ownerId = '64656e68bec729d8efdbb90a';

const apiInstance = axios.create({
  baseURL,
});

const constants = {
  apiInstance,
  baseURL,
  ownerId,
};

export default constants;
