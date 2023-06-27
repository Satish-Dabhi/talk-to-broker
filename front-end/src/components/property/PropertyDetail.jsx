import { Grid, ImageList, ImageListItem } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const PropertyDetail = ({ property }) => {
    console.log("property", property);
    const [propertyImages, setPropertyImages] = useState([]);
    const [propertyDetail, setPropertyDetail] = useState();

    useEffect(() => {
        setPropertyDetail(property);
        if (propertyDetail?.images) {
            const arrayValue = JSON.parse(propertyDetail?.images);
            arrayValue.length > 0 && setPropertyImages(arrayValue);
        }
    }, [property]);

    console.log("propertyImages", propertyImages);

    return (
        <Grid container className="mt-5">
            <Grid item xs={6}>
                <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                    {propertyImages.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={index}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid item xs={6} id="property-details" className='p-5'>
                <div>
                    <h2>Property Details</h2>
                    <div>
                        <strong>Basic Leisure Amenities:</strong> {propertyDetail?.basicLeasureAmenities}
                    </div>
                    <div>
                        <strong>Maintenance Charges:</strong> {propertyDetail?.maintenanceCharges}
                    </div>
                    <div>
                        <strong>Transfer Fees:</strong> {propertyDetail?.transferFees}
                    </div>
                    <div>
                        <strong>Leisure Amenities:</strong>
                        <ul>
                            {/* {propertyDetail?.leasureAmenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))} */}
                        </ul>
                    </div>
                    <div>
                        <strong>Decided Sales Value of Property:</strong> {propertyDetail?.decidedSalesValueOfProperty}
                    </div>
                    <div>
                        <strong>Registration Fee Percentage:</strong> {propertyDetail?.registrationFeePercentage}
                    </div>
                    <div>
                        <strong>Registration Fees:</strong> {propertyDetail?.registrationFees}
                    </div>
                    <div>
                        <strong>Stamps Duty Fee Percentage:</strong> {propertyDetail?.stampsDutyFeePercentage}
                    </div>
                    <div>
                        <strong>Stamps Duty Fees:</strong> {propertyDetail?.stampsDutyFees}
                    </div>
                    <div>
                        <strong>Gross Amount:</strong> {propertyDetail?.grossAmount}
                    </div>
                    <div>
                        <strong>GST Details:</strong>
                        <ul>
                            <li>
                                Decided GST Sales Value: {propertyDetail?.GSTDetails.decidedGSTSalesValue}
                            </li>
                            <li>
                                GST Percentage: {propertyDetail?.GSTDetails.GSTPercentage}
                            </li>
                            <li>
                                GST Tax: {propertyDetail?.GSTDetails.GSTTax}
                            </li>
                            <li>
                                MGVCL: {propertyDetail?.GSTDetails.MGVCL}
                            </li>
                            <li>
                                Advocate Fees: {propertyDetail?.GSTDetails.advocateFees}
                            </li>
                            <li>
                                Others Fees: {propertyDetail?.GSTDetails.othersFees}
                            </li>
                        </ul>
                    </div>
                    {/* Display other propertyDetail details here */}
                </div>
            </Grid>
        </Grid>

    );
};

export default PropertyDetail;
