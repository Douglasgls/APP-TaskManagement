import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import api from '../axiosConfig'
import { Stack } from '@mui/material';
import { useState } from "react";
import AlertNotify from "./alertNotify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlideUpdate({ open, onClose,id, getData, handleSubmitList }) {

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [state, setState] = React.useState('');

  const [notify, setNotify] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    message: "",
    severity: "",
  })

  React.useEffect(() => {
    if (getData) {
      setTitle(getData.title || '');
      setDescription(getData.description || '');
      setState(getData.state || '');
    }
  }, [getData]);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await api.patch('/todos/' + id, { title, description, state }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      if(data.status === 200) {
        setAlertConfig({
          message: 'Task updated successfully',
          severity: 'error',
        })
        setNotify(true);
        handleSubmitList();
        onClose();
      }
    } catch (error) {
      setAlertConfig({
        message: error.response.data.message || 'Error updating task',
        severity: 'error',
      })
      setNotify(true);
    }
  }

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
      <DialogTitle>{"Update Task"}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormControl>
            <Stack sx={{ width: '500px', gap: 3 }}>
                <TextField id="Title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />

                <TextField id="Description" value={description} multiline rows={2} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" />
                
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
        <Button onClick={onClose}>Disagree</Button>
        <Button onClick={handleSubmit}>Agree</Button>
    </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}