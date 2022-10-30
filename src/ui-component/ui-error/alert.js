import { Alert, Collapse, IconButton } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const CustomAlert = ({isOpen, severity, content, ...others}) => {

    const [open, setOpen] = useState(isOpen);

  return (
    <Collapse in={open}>
        <Alert
        severity={severity}
        action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
                setOpen(false);
            }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        }
        sx={{ mb: 2 }}
        {...others}
        >
            {content}
        </Alert>
    </Collapse>
  )
}

export default CustomAlert