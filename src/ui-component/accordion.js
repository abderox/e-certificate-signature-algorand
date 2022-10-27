import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
const reactPdf = require('react-pdf/dist/esm/entry.webpack5')
import useMediaQuery from '@mui/material/useMediaQuery';
const { Document, Page } = reactPdf;



const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};


const styleModal = {
    background: 'rgba(99, 99, 99, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
}


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ panel, data }) {

    const [expanded, setExpanded] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(min-width:600px)');
    const url = 'http://192.168.137.139:7000/api/process/get-certificate?hash=' + data.fileName;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        /* From https://css.glass */
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        webkitBackdropFilter: 'blur(5px)',
        width: matches ? 1300 : 550,
        height: matches ? 920 : 420,
        boxShadow: 24,
        p: 4,
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
                <AccordionSummary aria-controls={`${panel}d-content`} id={`${panel}d-header`} >

                    <Typography sx={{ fontWeight: 'medium', width: '50%', flexShrink: 0 }} variant="h4" component="h4">{`Diplôme ${data.title.toUpperCase()}`}</Typography>
                    <Typography sx={{ fontWeight: 'medium' }}>{`Obtenu le :  ${data.date_obtained}`}</Typography>

                </AccordionSummary>
                <AccordionDetails>

                    <Box sx={{ display: 'flex' , flexDirection:matches ?'row' : 'column' , justifyContent :'center' , alignItems : 'center' }}>
                        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} options={options} >
                            <Page pageNumber={pageNumber} height={150} onClick={handleOpen} />
                        </Document>
                        <a href={url} style={{ position: 'absolute', textDecoration: 'none' , left :'20%', top :matches? '22%' : '15%'}} download>
                            <Button sx={{ mt: 1 }}>
                                <img src="https://img.icons8.com/flat-round/36/000000/downloading-updates--v1.png" alt="download" />
                            </Button></a>

                        <Box sx={{ margin: 2 }}>
                            <Typography sx={{ fontWeight: 'medium' }} variant="h5" component="h5">
                                <span style={{ fontSize: '14pt', color: 'gray' }}>  Filière :</span>
                                {data.filiere}
                                <span style={{ fontSize: '14pt', color: 'black' }}> ({data.abbr_filiere})</span>
                            </Typography>
                            <Divider />
                            <Typography sx={{ fontWeight: 'medium', mt: 1 }} variant="h5" component="h5">
                                <span style={{ fontSize: '14pt', color: 'gray' }}>Description filière :</span> {data.desc_filiere}
                            </Typography>
                            <Divider />
                            <Typography sx={{ fontWeight: 'medium', mt: 1 }} variant="h5" component="h5">
                                <span style={{ fontSize: '14pt', color: 'gray' }}>  Durée formation : </span>  <span style={{ fontSize: '12pt', color: 'black' }}> {data.duree}</span>  {data.duree > 1 ? 'ans' : 'an'}
                            </Typography>
                        </Box>
                        <Modal
                            style={styleModal}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <Document file={url} onLoadSuccess={onDocumentLoadSuccess} options={options} >
                                    <Page pageNumber={pageNumber} height={matches ? 900 : 400} />
                                </Document>

                            </Box>
                        </Modal>

                    </Box>
                    <Typography sx={{ fontWeight: 'medium', ml: 2 }}>
                        <span style={{ fontSize: '9pt', color: 'gray' }}> Cliquer sur l'image pour agrandir </span>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}