import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropertiesDataTable from './dashboard/PropertiesDataTable';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { useState } from 'react';
import { sendToWhatsApp } from '../services/utils';
import { APP_URL } from '../services/utils/constant';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from '../redux/common/snackBarSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const ShareProperties = ({ open, setOpen, properties, smallScreen, selectedBuyer }) => {

    const [selectedProperties, setSelectedProperties] = useState([]);
    const dispatch = useDispatch();


    const handleClose = () => {
        setOpen(false);
    };

    const handleMailShare = () => {
        console.log("mail share", selectedBuyer);
    }

    const handleWhatsaAppShare = () => {
        if (selectedProperties && selectedProperties.length > 0) {
            const contactNumber = selectedBuyer.contactNumber;
            let message = '';
            selectedProperties.map((item, index) => {
                message = message + `Property ${index + 1}) ${APP_URL}/property-details/${item}, `;
            })
            message = `Visit below properties ::  ` + message;
            sendToWhatsApp(contactNumber, message);
        } else {
            dispatch(
                updateSnackBar({
                    open: true,
                    message: 'Please select at least 1 property',
                    severity: 'error',
                })
            );
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={"xl"}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Select Properties You want to share with client
                </BootstrapDialogTitle>
                <PropertiesDataTable data={properties} smallScreen={smallScreen} checkboxSelection={true} selectedProperties={setSelectedProperties} />
                <DialogActions>
                    <Button variant="contained" color="success" startIcon={<WhatsAppIcon />} onClick={handleWhatsaAppShare}>
                        SHARE
                    </Button>
                    <Button variant="contained" startIcon={<EmailTwoToneIcon />} onClick={handleMailShare}>
                        SHARE
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default ShareProperties;
