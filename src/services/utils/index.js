import * as constant from "./constant";

export function setSessionStorageObject(key,value){
    sessionStorage.setItem(key, value);
}

export function getSessionStorageObject(key){
    return sessionStorage.getItem(key);
}

export const stepperSteps = [
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
        label: constant.STEP3_FORM_NAME,
        description: constant.STEP3_FORM_DESCRIPTION,
    },
];


