import { Grid, ImageList, ImageListItem } from '@mui/material';
import React from 'react';

const PropertyDetail = ({ property }) => {
    console.log("property", property);
    return (
        <Grid container className="mt-5">
            <Grid item xs={4}>
                <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
                    {/* {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=161&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))} */}
                </ImageList>            
            </Grid>
            <Grid item xs={8} id="ttb-form">
                <div>
                    <h2>Property Details</h2>
                    <div>
                        <strong>Basic Leisure Amenities:</strong> {property?.basicLeasureAmenities}
                    </div>
                    <div>
                        <strong>Maintenance Charges:</strong> {property?.maintenanceCharges}
                    </div>
                    <div>
                        <strong>Transfer Fees:</strong> {property?.transferFees}
                    </div>
                    <div>
                        <strong>Leisure Amenities:</strong>
                        <ul>
                            {/* {property?.leasureAmenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))} */}
                        </ul>
                    </div>
                    <div>
                        <strong>Decided Sales Value of Property:</strong> {property?.decidedSalesValueOfProperty}
                    </div>
                    <div>
                        <strong>Registration Fee Percentage:</strong> {property?.registrationFeePercentage}
                    </div>
                    <div>
                        <strong>Registration Fees:</strong> {property?.registrationFees}
                    </div>
                    <div>
                        <strong>Stamps Duty Fee Percentage:</strong> {property?.stampsDutyFeePercentage}
                    </div>
                    <div>
                        <strong>Stamps Duty Fees:</strong> {property?.stampsDutyFees}
                    </div>
                    <div>
                        <strong>Gross Amount:</strong> {property?.grossAmount}
                    </div>
                    <div>
                        <strong>GST Details:</strong>
                        <ul>
                            <li>
                                Decided GST Sales Value: {property?.GSTDetails.decidedGSTSalesValue}
                            </li>
                            <li>
                                GST Percentage: {property?.GSTDetails.GSTPercentage}
                            </li>
                            <li>
                                GST Tax: {property?.GSTDetails.GSTTax}
                            </li>
                            <li>
                                MGVCL: {property?.GSTDetails.MGVCL}
                            </li>
                            <li>
                                Advocate Fees: {property?.GSTDetails.advocateFees}
                            </li>
                            <li>
                                Others Fees: {property?.GSTDetails.othersFees}
                            </li>
                        </ul>
                    </div>
                    {/* Display other property details here */}
                </div>
            </Grid>
        </Grid>

    );
};

export default PropertyDetail;
