import axios from 'axios';
import font from '../constants/fonts';
import colors from '../constants/colors';

const baseURL = 'https://sparelo-production.herokuapp.com/';
// const baseURL = 'http://192.168.10.6:3000/';
const ownerId = '64656e68bec729d8efdbb90a';

const apiInstance = axios.create({
  baseURL,
});

// const phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,13})([+(\d]{1})/gm;
let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;
// const phoneNumberRegex = new RegExp(
//   /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim,
// );

const headerTitleStyle = {
  fontFamily: font.fontFamilies({type: 'Inter'}).regular,
  color: colors.primary,
  fontSize: font.sizes.subtitle,
};

const constants = {
  apiInstance,
  baseURL,
  ownerId,
  phoneNumberRegex,
  headerTitleStyle,
};

export default constants;
