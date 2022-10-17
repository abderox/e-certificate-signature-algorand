import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'store/apiMessage';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({message,severity}) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const toastMessage = useSelector((state) => state.message);

    useEffect(() => {
        console.log("isLoggedIn: ", toastMessage);
        if(toastMessage?.message !== null){
            setOpen(true);
        }
    }, [toastMessage]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>

    );
}

