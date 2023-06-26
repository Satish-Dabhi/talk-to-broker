import basicInfoSchema from '../../formsDefinitions/basicInfo/schema.json';
import basicInfoUiSchema from '../../formsDefinitions/basicInfo/uiSchema.json';
import computationOfSalesPropertySchema from '../../formsDefinitions/computationOfSalesProperty/schema.json';
import computationOfSalesPropertyUiSchema from '../../formsDefinitions/computationOfSalesProperty/uiSchema.json';
import constructionSizeDetailSchema from '../../formsDefinitions/constructionSizeDetail/schema.json';
import constructionSizeDetailUiSchema from '../../formsDefinitions/constructionSizeDetail/uiSchema.json';
import newPropertyDetailSchema from '../../formsDefinitions/newPropertyDetail/schema.json';
import newPropertyDetailUiSchema from '../../formsDefinitions/newPropertyDetail/uiSchema.json';
import floorPriceCalculationAndParkingDetailsSchema from '../../formsDefinitions/floorPriceCalculationAndParkingDetails/schema.json';
import floorPriceCalculationAndParkingDetailsUiSchema from '../../formsDefinitions/floorPriceCalculationAndParkingDetails/uiSchema.json';
import maintenanceChargesDetailsSchema from '../../formsDefinitions/maintenanceChargesDetails/schema.json';
import maintenanceChargesDetailsUiSchema from '../../formsDefinitions/maintenanceChargesDetails/uiSchema.json';
import morePropertyDetailsSchema from '../../formsDefinitions/morePropertyDetails/schema.json';
import morePropertyDetailsUiSchema from '../../formsDefinitions/morePropertyDetails/uiSchema.json';
import oldPropertyDetailSchema from '../../formsDefinitions/oldPropertyDetail/schema.json';
import oldPropertyDetailUiSchema from '../../formsDefinitions/oldPropertyDetail/uiSchema.json';
import propertySellDetailSchema from '../../formsDefinitions/propertySellDetail/schema.json';
import propertySellDetailUiSchema from '../../formsDefinitions/propertySellDetail/uiSchema.json';
import propertySizeBifurcationDetailSchema from '../../formsDefinitions/propertySizeBifurcationDetail/schema.json';
import propertySizeBifurcationDetailUiSchema from '../../formsDefinitions/propertySizeBifurcationDetail/uiSchema.json';
import propertyImagesSchema from '../../formsDefinitions/propertyImages/schema.json';
import propertyImagesUiSchema from '../../formsDefinitions/propertyImages/uiSchema.json';
import * as constant from './constant';

export function getActiveForm(activeForm, propertyType) {
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
