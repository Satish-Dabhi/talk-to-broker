const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    decidedSalesValueOfProperty: Number,
    registrationFeePercentage: Number,
    registrationFees: Number,
    stampsDutyFeePercentage: Number,
    stampsDutyFees: Number,
    grossAmount: Number,
    GSTDetails: {
        decidedGSTSalesValue: Number,
        GSTPercentage: Number,
        GSTTax: Number,
        MGVCL: Number,
        advocateFees: Number,
        othersFees: Number
    },
    mortgageDetails: {
        bankName: String,
        branchName: String,
        address: String,
        pinCode: Number,
        city: String,
        state: String,
        loanAmount: Number
    },
    allotedParkingDetails: {
        parkingType: String,
        parking: String,
        allotedVehicle: String
    },
    pricePriceValue: {
        projectedSellsPrice: Number,
        finalizedSellsValue: Number
    },
    propertySizeBifurcationDetail: {
        measurementUnits: String,
        kitchen: String,
        halls: String,
        bathRooms: String,
        bedRooms: String,
        balconies: String,
        plot: String,
        land: String
    },
    agriculturalSellPropertyDetails: {
        totalArea: Number,
        unitPrice: Number,
        totalValue: Number
    },
    constructionPropertyBalconyArea: Number,
    constructionPropertyTerraceArea: Number,
    constructionPropertyBuiltUp: Number,
    constructionPropertySuperBuiltUp: Number,
    addPropertyType: String,
    propertyType: String,
    subPropertyType: String,
    basicLeasureAmenities: String,
    maintenanceCharges: Number,
    transferFees: Number,
    leasureAmenities: [String],
    fixAmountMaintenanceDevelopmentCharges: Number,
    recurringMaintenance: {
        lumpsumAmount: Number,
        carpetSqFt: Number,
        totalValue: Number
    },
    fixMaintenanceCharges: Number,
    maintenanceLumpsumAmount: Number,
    maintenanceCarpetSqFt: Number,
    lumpsumMaintenanceCharges: Number,
    floorsPriceCalculation: {
        value: Number,
        floors: String,
        otherFloorSelection: String,
        otherFloors: String
    },
    developerPropertySellUnit: String,
    developerPropertyExtraArea: {
        priceRate: Number,
        extraArea: Number,
        totalExtraAreaValue: Number
    },
    developerPropertyPerSqFeetPrice: Number,
    developerPropertyArea: Number,
    developerPropertyBasicPrice: Number,
    developerPropertyFixBasicPrice: Number,
    bifurcationOfArea: {
        reraCarpet: Number,
        totalArea: Number,
        balcony: String,
        terrace: String,
        washArea: String
    },
    marketingDetail: {
        marketingPersonality: String,
        name: String,
        contactNumber: Number,
        email: String
    },
    landStructure: {
        measurementUnits: String,
        totalLandArea: String,
        usedArea: String,
        openSpace: String
    },
    constructionPropertyTotalCarpet: Number,
    totalSellPropertyValue: Number,
    dateOfEntry: Date,
    sellProperty: String,
    rentalProperty: String,
    label: String,
    buildingType: String,
    roomTypes: String,
    propertyOwnership: String,
    developerPropertyGroupName: String,
    developerPropertyProjectName: String,
    developerPropertySiteAddress: String,
    developerPropertyBlockNumber: Number,
    developerPropertyFPNumber: Number,
    developerPropertyRevenueSurveyNo: Number,
    developerPropertyPinCode: Number,
    developerPropertyCity: String,
    developerPropertyStateWithCode: String,
    developerPropertyContactNumber: Number,
    developerPropertyGSTIN: String,
    developerPropertyCGSTIN: String,
    developerPropertyRERA: String,
    developerPropertyTDS: String,
    measurementUnits: String,
    constructionPropertyType: String,
    developerPropertyAreaType: String,
    propertyStatus: String,
    aboutFurnishing: String,
    doorEntryFacing: String,
    propertyAge: String,
    propertyFlooring: String,
    gender: String,
    developerPropertyChargesType: String,
    maintenanceChargesType: String,
    anyOtherLeasureAmenity: String,
    oldPropertyName: String,
    oldPropertyOwnerName: String,
    oldPropertySocietyAddress: String,
    oldPropertyAreaName: String,
    oldPropertyLandmark: String,
    oldPropertyVillage: String,
    oldPropertyCity: String,
    oldPropertyRoomNo: Number,
    oldPropertyPinCode: Number,
    oldPropertyState: String,
    maintenancePeriod: String,
    developerPropertyProjectName: String
}, {
    versionKey: false,
});

const propertySchema = mongoose.model("property", schema);

module.exports = {
    propertySchema: propertySchema
};
