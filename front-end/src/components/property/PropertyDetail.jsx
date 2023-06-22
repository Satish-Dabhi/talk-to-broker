import React from 'react';

const PropertyDetail = ({ property }) => {
    return (
        <div>
            <h2>Property Details</h2>
            <div>
                <strong>Basic Leisure Amenities:</strong> {property.basicLeasureAmenities}
            </div>
            <div>
                <strong>Maintenance Charges:</strong> {property.maintenanceCharges}
            </div>
            <div>
                <strong>Transfer Fees:</strong> {property.transferFees}
            </div>
            <div>
                <strong>Leisure Amenities:</strong>
                <ul>
                    {/* {property.leasureAmenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                    ))} */}
                </ul>
            </div>
            <div>
                <strong>Decided Sales Value of Property:</strong> {property.decidedSalesValueOfProperty}
            </div>
            <div>
                <strong>Registration Fee Percentage:</strong> {property.registrationFeePercentage}
            </div>
            <div>
                <strong>Registration Fees:</strong> {property.registrationFees}
            </div>
            <div>
                <strong>Stamps Duty Fee Percentage:</strong> {property.stampsDutyFeePercentage}
            </div>
            <div>
                <strong>Stamps Duty Fees:</strong> {property.stampsDutyFees}
            </div>
            <div>
                <strong>Gross Amount:</strong> {property.grossAmount}
            </div>
            <div>
                <strong>GST Details:</strong>
                <ul>
                    <li>
                        Decided GST Sales Value: {property.GSTDetails.decidedGSTSalesValue}
                    </li>
                    <li>
                        GST Percentage: {property.GSTDetails.GSTPercentage}
                    </li>
                    <li>
                        GST Tax: {property.GSTDetails.GSTTax}
                    </li>
                    <li>
                        MGVCL: {property.GSTDetails.MGVCL}
                    </li>
                    <li>
                        Advocate Fees: {property.GSTDetails.advocateFees}
                    </li>
                    <li>
                        Others Fees: {property.GSTDetails.othersFees}
                    </li>
                </ul>
            </div>
            {/* Display other property details here */}
        </div>
    );
};

export default PropertyDetail;
