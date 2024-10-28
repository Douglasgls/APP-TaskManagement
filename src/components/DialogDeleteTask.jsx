import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import api from '../axiosConfig'
import { useState } from 'react';
import AlertNotify from './alertNotify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, onClose, id, handleSubmitList }) {

  const [notify, setNotify] = useState(false);

  const [alertConfig, setAlertConfig] = useState({
    message: '',
    severity: '',
  });


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await api.delete('/todos/' + id);
      if(data.status === 200) {
        handleSubmitList();
        onClose();
        setAlertConfig({
          message: 'Task deleted successfully',
          severity: 'success',
        });
        setNotify(true);
      }
    } catch (error) {
      setAlertConfig({
        message: error.response.data.detail || 'Error deleting task',
        severity: 'error',
      });
      setNotify(true);
    }
  };


  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        hideBackdrop={true}
        sx={
          { 
            '& .MuiPaper-root': {
              borderRadius: '20px',
            },
            '& .MuiDialogContent-root': {
              padding: '12px',
            },
            '& .MuiDialogActions-root': {
              padding: '12px',
            },
            '& .MuiDialogTitle-root': {
              padding: '12px',
            },
            '& .MuiTypography-root': {
              fontWeight: 'bold',
            },
            '& .MuiButton-root': {
              borderRadius: '16px',
            },
          }
        }
      >
        <DialogTitle>Confirm Deletion of Task {id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>

      <AlertNotify open={notify} handleClose={() => setNotify(false)} config={alertConfig} />
    </React.Fragment>
  );
}