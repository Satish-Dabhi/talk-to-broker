import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, DialogTitle, Slide } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const MyModal = ({ showModal, handleCloseModal, body }) => {
    console.log("showModal", showModal);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(showModal)
    }, [showModal])

    const handleOpen = () => setOpen(true);
    const handleClose = () => handleCloseModal(false);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {body}
                </Box>
            </Modal> */}
            <Dialog
                open={showModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                {body}
            </Dialog>
        </div>
    );
}

export default MyModal;