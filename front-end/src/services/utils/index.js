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

export function removeSessionStorageObject(key) {
  sessionStorage.removeItem(key)
}

export function setLocalStorageObject(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorageObject(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorageObject(key) {
  return localStorage.removeItem(key);
}

export function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
};

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

export function sendToWhatsApp(number, message) {
  // const phoneNumber = 7572802581; // Replace with the recipient's phone number (including country code)
  // const message = 'Hello from my website! Visit: https://www.example.com'; // Custom message with hyperlink
  
  // Encode the message to be sent in the URL
  const encodedMessage = encodeURIComponent(message);

  // Generate the WhatsApp API URL
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

  // Open WhatsApp Web in a new tab
  window.open(whatsappUrl, '_blank');
}


export const ADD_PROPERTY_FORMS = [
  {
    label: constant.STEP1_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP2_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP3_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP4_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP5_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP6_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP7_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP8_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP9_PROPERTY_FORM_NAME,
  },
  {
    label: constant.STEP10_PROPERTY_FORM_NAME,
  },
];

export const ADD_BUYER_INQUIRY_FORMS = [
  {
    label: constant.STEP1_BUYER_INQUIRY_FORM_NAME,
  },
  {
    label: constant.STEP2_BUYER_INQUIRY_FORM_NAME,
  },
  {
    label: constant.STEP3_BUYER_INQUIRY_FORM_NAME,
  }
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
