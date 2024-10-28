import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { Box, TextField, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import api from '../axiosConfig'
import AlertNotify from "./alertNotify";
import { useState } from "react";
import { Coronavirus } from "@mui/icons-material";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AlertCreateTask({ open, onClose, handleSubmitList }) {
  
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [state, setState] = React.useState('');

 const [notify, setNotify] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    message: '',
    severity: '',
  });

  const handleChange = (event) => {  
      setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/todos', { title, description, state }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      setTitle('');
      setDescription('');
      setState('');
      handleSubmitList();
      onClose();
      alertConfig({
        message: 'Task created successfully',
        severity: 'success',
      });
      setNotify(true);
    } catch (error) {
      setAlertConfig({
        message: error.response.data.message || 'Error creating task',
        severity: 'error',
      })
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
        hideBackdrop={false}
        sx={
          { 
            '& .MuiPaper-root': {
              borderRadius: '20px',
            },
            '& .MuiDialogContent-root': {
              padding: '20px',
            },
            '& .MuiDialogActions-root': {
              padding: '20px',
            },
            '& .MuiDialogTitle-root': {
              padding: '20px',
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
      <DialogTitle>{"Create Task"}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormControl>
            <Stack sx={{ width: '550px', height: '300px', gap: 4 }}>
                <TextField id="Title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ width: '100%', marginTop: 2 }} />

                <TextField id="Description" value={description}  multiline rows={2} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" />
                
                <FormControl fullWidth>
                    <InputLabel id="Status">Status</InputLabel>
                    <Select
                      labelId="StatusID"
                      id="demo-simple-select"
                      label="Status"
                      onChange={handleChange}
                      value={state}
                    >
                    <MenuItem value='draft'>Draft</MenuItem>
                    <MenuItem value='todo'>Todo</MenuItem>
                    <MenuItem value='doing'>Doing</MenuItem>
                    <MenuItem value='done'>Done</MenuItem>
                    <MenuItem value='trash'>Trash</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            </FormControl>
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button  onClick={onClose}>Disagree</Button>
        <Button onClick={handleSubmit}>Agree</Button>
    </DialogActions>
      </Dialog>
      <AlertNotify open={notify} handleClose={setNotify} config={alertConfig} />
    </React.Fragment>
  );

}