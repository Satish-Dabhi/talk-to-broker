import basicInfoSchema from '../../formsDefinitions/property/basicInfo/schema.json';
import basicInfoUiSchema from '../../formsDefinitions/property/basicInfo/uiSchema.json';
import computationOfSalesPropertySchema from '../../formsDefinitions/property/computationOfSalesProperty/schema.json';
import computationOfSalesPropertyUiSchema from '../../formsDefinitions/property/computationOfSalesProperty/uiSchema.json';
import constructionSizeDetailSchema from '../../formsDefinitions/property/constructionSizeDetail/schema.json';
import constructionSizeDetailUiSchema from '../../formsDefinitions/property/constructionSizeDetail/uiSchema.json';
import newPropertyDetailSchema from '../../formsDefinitions/property/newPropertyDetail/schema.json';
import newPropertyDetailUiSchema from '../../formsDefinitions/property/newPropertyDetail/uiSchema.json';
import floorPriceCalculationAndParkingDetailsSchema from '../../formsDefinitions/property/floorPriceCalculationAndParkingDetails/schema.json';
import floorPriceCalculationAndParkingDetailsUiSchema from '../../formsDefinitions/property/floorPriceCalculationAndParkingDetails/uiSchema.json';
import maintenanceChargesDetailsSchema from '../../formsDefinitions/property/maintenanceChargesDetails/schema.json';
import maintenanceChargesDetailsUiSchema from '../../formsDefinitions/property/maintenanceChargesDetails/uiSchema.json';
import morePropertyDetailsSchema from '../../formsDefinitions/property/morePropertyDetails/schema.json';
import morePropertyDetailsUiSchema from '../../formsDefinitions/property/morePropertyDetails/uiSchema.json';
import oldPropertyDetailSchema from '../../formsDefinitions/property/oldPropertyDetail/schema.json';
import oldPropertyDetailUiSchema from '../../formsDefinitions/property/oldPropertyDetail/uiSchema.json';
import propertySellDetailSchema from '../../formsDefinitions/property/propertySellDetail/schema.json';
import propertySellDetailUiSchema from '../../formsDefinitions/property/propertySellDetail/uiSchema.json';
import propertySizeBifurcationDetailSchema from '../../formsDefinitions/property/propertySizeBifurcationDetail/schema.json';
import propertySizeBifurcationDetailUiSchema from '../../formsDefinitions/property/propertySizeBifurcationDetail/uiSchema.json';
import propertyImagesSchema from '../../formsDefinitions/property/propertyImages/schema.json';
import propertyImagesUiSchema from '../../formsDefinitions/property/propertyImages/uiSchema.json';
import basicDetailsSchema from '../../formsDefinitions/buyerInquiry/basicDetails/schema.json';
import basicDetailsUiSchema from '../../formsDefinitions/buyerInquiry/basicDetails/uiSchema.json';
import propertyRequirementsSchema from '../../formsDefinitions/buyerInquiry/propertyRequirements/schema.json';
import propertyRequirementsUiSchema from '../../formsDefinitions/buyerInquiry/propertyRequirements/uiSchema.json';
import preferredLocationSchema from '../../formsDefinitions/buyerInquiry/preferredLocation/schema.json';
import preferredLocationUiSchema from '../../formsDefinitions/buyerInquiry/preferredLocation/uiSchema.json';
import * as constant from './constant';

export function getActivePropertyForm(activeForm, propertyType) {
  switch (activeForm) {
    case 0:
      return {
        schema: basicInfoSchema,
        uiSchema: basicInfoUiSchema,
      };
    case 1:
      if (propertyType === constant.DEVELOPER_PROPERTY) {
        return {
          schema: newPropertyDetailSchema,
          uiSchema: newPropertyDetailUiSchema,
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
        schema: propertySizeBifurcationDetailSchema,
        uiSchema: propertySizeBifurcationDetailUiSchema,
      };
    case 4:
      return {
        schema: propertySellDetailSchema,
        uiSchema: propertySellDetailUiSchema,
      };
    case 5:
      return {
        schema: floorPriceCalculationAndParkingDetailsSchema,
        uiSchema: floorPriceCalculationAndParkingDetailsUiSchema,
      };
    case 6:
      return {
        schema: morePropertyDetailsSchema,
        uiSchema: morePropertyDetailsUiSchema,
      };
    case 7:
      return {
        schema: computationOfSalesPropertySchema,
        uiSchema: computationOfSalesPropertyUiSchema,
      };
    case 8:
      return {
        schema: maintenanceChargesDetailsSchema,
        uiSchema: maintenanceChargesDetailsUiSchema,
      };
    case 9:
      return {
        schema: propertyImagesSchema,
        uiSchema: propertyImagesUiSchema,
      };
    default:
      return {
        schema: basicInfoSchema,
        uiSchema: basicInfoUiSchema,
      };
  }
}

export function getActiveBuyerInquiryForm(activeForm) {
  switch (activeForm) {
    case 0:
      return {
        schema: basicDetailsSchema,
        uiSchema: basicDetailsUiSchema,
      };
    case 1:
      return {
        schema: propertyRequirementsSchema,
        uiSchema: propertyRequirementsUiSchema,
      };
    case 2:
      return {
        schema: preferredLocationSchema,
        uiSchema: preferredLocationUiSchema,
      };
    default:
      return {
        schema: basicDetailsSchema,
        uiSchema: basicDetailsUiSchema,
      };
  }
}
