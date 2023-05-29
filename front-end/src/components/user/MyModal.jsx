import { Dialog, DialogTitle, IconButton, Slide } from '@mui/material';
import * as React from 'react';
import SignInSignUpForms from './SignInSignUpForms';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyModal = ({ showModal, handleCloseModal, body }) => {
  const handleClose = () => handleCloseModal(false);

  return (
    <div className="my-modal">
      <Dialog
        open={showModal}
        fullWidth={true}
        maxWidth={'md'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <SignInSignUpForms handleClose={handleClose}/>
      </Dialog>
    </div>
  );
};

export default MyModal;
