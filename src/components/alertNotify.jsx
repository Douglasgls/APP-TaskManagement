import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertNotify = ({ open, handleClose, config }) => {
   
    return (
        <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert
                onClose={handleClose}
                severity={config.severity}
                variant="standard"
                sx={{ width: '100%' }}
            >
                {config.message}
            </Alert>
            </Snackbar>
        </div>
    );
};

export default AlertNotify;