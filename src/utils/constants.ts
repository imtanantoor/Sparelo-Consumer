import axios from 'axios';

const baseURL = 'https://sparelo-production.herokuapp.com/';
// const baseURL = 'http://192.168.10.6:3000/';
const ownerId = '64656e68bec729d8efdbb90a';

const apiInstance = axios.create({
  baseURL,
});

const phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,12})([+(\d]{1})/gm;
// const phoneNumberRegex = new RegExp(
//   /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim,
// );

const constants = {
  apiInstance,
  baseURL,
  ownerId,
  phoneNumberRegex,
};

export default constants;
