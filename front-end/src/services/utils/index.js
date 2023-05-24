import * as constant from "./constant";

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
    return args.every(arg => arg !== undefined);
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
    }
];


