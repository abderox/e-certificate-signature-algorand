import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setDirectSignAction } from 'store/backOpsAction';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: "40%",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
    borderRadius: '10px',
  boxShadow: 24,
  px: 4,
  py: 4,
};

const VerificationModal = (props) => {

    const dispatch = useDispatch();
    const { open, handleClose, handleOpen, message, handleConfirm, handleCheck, checkMessage, isChecked, setIsChecked } = props;

    const handleCheckChange = (event) => {
        setIsChecked(event.target.checked);
    };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 3 }}>
                <Typography id="transition-modal-title" variant="h5" component="h2">
                    {message}
                </Typography>
            </Box>
            {
                (checkMessage) && (
                    <FormControlLabel control={<Checkbox checked={isChecked} onChange={(e) => handleCheckChange(e)} />} label={checkMessage} />
                )
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 3, justifyContent:'space-between' }}>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleConfirm} variant={'contained'}>Oui</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


export default VerificationModal