import * as constant from './constant';
import agriculturalPropertyIcon from '../../assets/images/agricultural-property.png';
import commercialPropertyIcon from '../../assets/images/commercial-property.jpg';
import industrialPropertyIcon from '../../assets/images/industrial-property.jpg';
import residentialPropertyIcon from '../../assets/images/residential-property.png';

export function setSessionStorageObject(key, value) {
  sessionStorage.setItem(key, value);
}

export function getSessionStorageObject(key) {
  return sessionStorage.getItem(key);
}

export function getSum(...numbers) {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function findPercentageValue(value, percentage) {
  return (value * percentage) / 100;
}

export function allDefined(...args) {
  return args.every((arg) => arg !== undefined);
}

export function convertToTitleCase(string) {
  return string
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSchemaFieldTitle(propertyName) {
  const newPropertyName = propertyName.replace(/\./g, '');
  const wordsArray = newPropertyName.split(/(?=[A-Z])/);
  const updatedString = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return updatedString;
}

export function isWithinFiveMinutes(time, differenceToCheck) {
  const currentTime = new Date();
  const compareTime = new Date(time);

  const differenceInMilliseconds = currentTime - compareTime;
  const differenceInMinutes = Math.abs(differenceInMilliseconds / (1000 * 60));

  return differenceInMinutes <= differenceToCheck;
}

export function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export const ADD_PROPERTY_FORMS = [
  {
    label: constant.STEP1_FORM_NAME,
  },
  {
    label: constant.STEP2_FORM_NAME,
  },
  {
    label: constant.STEP3_FORM_NAME,
  },
  {
    label: constant.STEP4_FORM_NAME,
  },
  {
    label: constant.STEP5_FORM_NAME,
  },
  {
    label: constant.STEP6_FORM_NAME,
  },
  {
    label: constant.STEP7_FORM_NAME,
  },
  {
    label: constant.STEP8_FORM_NAME,
  },
  {
    label: constant.STEP9_FORM_NAME,
  },
];

export const getCardImageByPropertyType = (propertyType) => {
  switch (propertyType) {
    case 'residential':
      return residentialPropertyIcon;
    case 'commercial':
      return commercialPropertyIcon;
    case 'industrial':
      return industrialPropertyIcon;
    case 'agricultural':
      return agriculturalPropertyIcon;
    default:
      return residentialPropertyIcon;
  }
};
