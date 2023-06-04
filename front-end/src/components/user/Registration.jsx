import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import verticalImage from '../../assets/images/banner-images/vertical-building.jpg';
import registrationSchema from '../../formsDefinitions/userRegistration/schema.json';
import registrationUiSchema from '../../formsDefinitions/userRegistration/uiSchema.json';
import EnrollForm from './EnrollForm';
import './style.css';

function Registration() {
    return (
        <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
            <Grid container spacing={4}>
                <Grid item xs={5}>
                    <img src={verticalImage} alt="vertical-building" width={'100%'} height={'100%'} />
                </Grid>
                <Grid item xs={7}>
                    <Box sx={{ width: '100%' }} className="p-5">
                        <EnrollForm schema={registrationSchema} uiSchema={registrationUiSchema} form="registration" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Registration;