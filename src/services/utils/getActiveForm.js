import aboutPropertySchema from "../../formsDefinitions/aboutProperty/schema.json";
import aboutPropertyUiSchema from "../../formsDefinitions/aboutProperty/uiSchema.json";
import basicInfoSchema from "../../formsDefinitions/basicInfo/schema.json";
import basicInfoUiSchema from "../../formsDefinitions/basicInfo/uiSchema.json";
import developerPropertyDetailSchema from "../../formsDefinitions/developerPropertyDetail/schema.json";
import developerPropertyDetailUiSchema from "../../formsDefinitions/developerPropertyDetail/uiSchema.json";
import morePropertyDetailsSchema from "../../formsDefinitions/morePropertyDetails/schema.json";
import morePropertyDetailsUiSchema from "../../formsDefinitions/morePropertyDetails/uiSchema.json";
import oldPropertyDetailSchema from "../../formsDefinitions/oldPropertyDetail/schema.json";
import oldPropertyDetailUiSchema from "../../formsDefinitions/oldPropertyDetail/uiSchema.json";
import constructionSizeDetailSchema from "../../formsDefinitions/constructionSizeDetail/schema.json";
import constructionSizeDetailUiSchema from "../../formsDefinitions/constructionSizeDetail/uiSchema.json";
import * as constant from "./constant";

export function getActiveForm(activeForm, propertyType) {
    switch (activeForm) {
        case 0:
            return {
                schema: basicInfoSchema,
                uiSchema: basicInfoUiSchema,
            };
        case 1:
            if (propertyType == constant.DEVELOPER_PROPERTY) {
                return {
                    schema: developerPropertyDetailSchema,
                    uiSchema: developerPropertyDetailUiSchema,
                };
            } else {
                return {
                    schema: oldPropertyDetailSchema,
                    uiSchema: oldPropertyDetailUiSchema,
                };
            }
        case 2:
            return {
                schema: constructionSizeDetailSchema,
                uiSchema: constructionSizeDetailUiSchema,
            };
        case 3:
            return {
                schema: morePropertyDetailsSchema,
                uiSchema: morePropertyDetailsUiSchema,
            };
        default:
            return {
                schema: "dfsdf",
                uiSchema: "fsdfsd",
            };
    }
}
