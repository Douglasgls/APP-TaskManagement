import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import api from '../axiosConfig';

const DashboardLayoutAccount = ({ open, handleClose }) => {
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    id: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await api.get('users/get_me');
      if (response.status === 200) {
        setUser(response.data.me);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (open) {
      handleSubmit();
    }
  }, [open]);

  console.log(user);
  console.log("AAAAAAAAAAA");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardLayoutAccount;
