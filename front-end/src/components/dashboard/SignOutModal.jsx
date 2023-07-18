import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { removeLocalStorageObject } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

const SignOutModal = ({ open, setOpen, setSelectedTab }) => {
  let navigate = useNavigate();

  const handleClose = () => {
    setSelectedTab(0);
    setOpen(false);
  };

  const handleSignOut = () => {
    setOpen(false);
    removeLocalStorageObject('token');
    navigate(`/`);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to sign out</DialogTitle>
        <DialogActions>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignOutModal;
