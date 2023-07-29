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
  return numbers.reduce((accumulator, currentValue) => {
    if (typeof currentValue === "number") {
      return accumulator + currentValue;
    } else if (!isNaN(Number(currentValue))) {
      return accumulator + Number(currentValue);
    } else {
      return accumulator;
    }
  }, 0);
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
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

export function convertLandArea(value, fromUnit, toUnit) {
  
  const conversions = {
    acres: {
      hector: 0.404686,
      square_feet: 43560,
      square_meters: 4046.86,
      square_yards: 4840,
      acres: 1,
      bigha: 0.4,
    },
    hector: {
      acres: 2.47105,
      square_feet: 107639.104,
      square_meters: 10000,
      square_yards: 11960.3,
      hector: 1,
      bigha: 0.4 / 0.404686,
    },
    square_feet: {
      acres: 0.0000229568,
      hector: 0.0000092903,
      square_meters: 0.092903,
      square_yards: 0.111111,
      square_feet: 1,
      bigha: 0.4 / 43560,
    },
    square_meters: {
      acres: 0.000247105,
      hector: 0.0001,
      square_feet: 10.7639,
      square_yards: 1.19599,
      square_meters: 1,
      bigha: 0.4 / 43560,
    },
    square_yards: {
      acres: 0.000206612,
      hector: 0.0000836127,
      square_feet: 9,
      square_meters: 0.836127,
      square_yards: 1,
      bigha: 0.4 / 4840,
    },
    bigha: {
      acres: 0.5,
      hector: 0.5 * 0.404686,
      square_feet: 0.5 * 43560,
      square_meters: 0.5 * 4046.86,
      square_yards: 0.5 * 4840,
      bigha: 1,
    }
  };

  if (!conversions[fromUnit] || !conversions[fromUnit][toUnit]) {
    throw new Error("Invalid conversion units.");
  }

  return value * conversions[fromUnit][toUnit];
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
