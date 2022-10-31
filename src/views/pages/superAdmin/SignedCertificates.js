import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCertificatsByFiliereAction, getSignedCertificatsByFiliereAction } from "store/backOpsAction";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  ButtonGroup,
  Checkbox,
  Accordion,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useState } from "react";
import styled from "@emotion/styled";
import InfoListItem from "ui-component/list/InfoListItem";
import VerificationModal from "ui-component/modal/VerificationModal";

import ApprovalIcon from '@mui/icons-material/Approval';
import { signCertificate, signCertificateAction } from "store/walletAction";
import { useNavigate } from "react-router";
import { Clear } from "@mui/icons-material";
import CustomAlert from "ui-component/ui-error/alert";
import { BASE_URL_API } from "utils/global-constants";

const reactPdf = require('react-pdf/dist/esm/entry.webpack5');
const { Document, Page } = reactPdf;


const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

const DocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
    box-shadow: 0px 0px 0px #d3d3d3,
        0px 0px 0px #ededed;
  }
`;

const SignedCertificates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(true);
  const [certificats, setCertificats] = React.useState([]);

  const certificatsInfos = useSelector((state) => state.backops.certificats);
  const walletInfos = useSelector((state) => state.wallet);
  const filiere = useSelector((state) => state.backops.filiere);

  const [expanded, setExpanded] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchString, setSearchString] = React.useState(null);


  const url = BASE_URL_API + '/process/get-certificate?hash=';


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };
  
  const handleSearch = () => {
    dispatch(getSignedCertificatsByFiliereAction(filiere.abbr, searchString));
  }

  React.useEffect(() => {
    dispatch(getSignedCertificatsByFiliereAction(filiere.abbr, searchString));
  }, []);

  
  React.useEffect(() => {
    console.log("certificats: ", certificats);
    setCertificats(certificatsInfos);
    setLoading(false);
  }, [certificatsInfos]);

  function handleLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
        <Grid container justifyContent="center" alignItems="center" direction={"row"}>
            <Grid item xs={12} key={2} sx={{ p: { xs: 1, sm: 2 }, mb: 0 }}>
                <CustomAlert
                    isOpen={true} 
                    severity="info" 
                    content="Vous trouverez ici la liste des certificats signés." 
                    color={"primary"} 
                    style={{backgroundColor: "rgba(255, 214, 201, 0.7)"}}
                    />
              </Grid>
              <Grid item xs={8} sm={8} md={10} lg={10} sx={{ p: { xs: 1, sm: 2 }, mb: 0 }}>
                  <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                      <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Search"
                          inputProps={{ 'aria-label': 'search' }}
                          onChange={handleSearchChange}
                      />
                      <IconButton color="primary" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                          <SearchIcon />
                      </IconButton>
                  </Paper>
              </Grid>
              <Grid item xs={4} sm={4} md={2} lg={2} sx={{ p: { xs: 1, sm: 2 }, mb: 0 }}>
                <Button 
                  variant={'contained'}
                  onClick={() => navigate('/certificats')} 
                  sx={{ p: '10px' }} 
                  style={{width: "100%"}} 
                  startIcon={<Clear />}
                  >
                    Non Signés
                </Button>
              </Grid>
            </Grid>
      {
      (!isLoading) ? (
        certificats.map((certificat, index) => {
        return (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            key={certificat.Etudiant.id}
            sx={{ mt: { xs: 1, sm: 2 }, mb: 0, px: 2 }}
          >
            <Grid item xs={12}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "100%",
                overflow: "hidden",
                boxShadow: "-1px 3px 7px #d3d3d3"
            }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexShrink: 0,
                      flexDirection: "row$",
                    }}
                  >
                    <Typography
                      sx={{
                        flexShrink: 0,
                        color: "text.secondary",
                        width: "40%",
                        fontWeight: "bold",
                        overflow: "hidden",
                      }}
                    >
                      {certificat.Etudiant.User.nom +
                        " " +
                        certificat.Etudiant.User.prenom}
                    </Typography>
                    {
                        (expanded !== `panel${index}`) ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "50%",
                                    flexShrink: 0,
                                    flexDirection: "row$",
                                }}
                                >
                                <Typography
                                    sx={{
                                    flexShrink: 0,
                                    color: "text.secondary",
                                    width: "50%",
                                    overflow: "hidden",
                                    }}
                                >
                                    <strong>CNE </strong>
                                    {certificat.Etudiant.cne}
                                </Typography>
                                <Typography
                                    sx={{
                                        flexShrink: 0,
                                    color: "text.secondary",
                                    width: "50%",
                                    overflow: "hidden",
                                    }}
                                    >
                                    <strong>Apogée </strong>
                                    {certificat.Etudiant.code_apogee}
                                </Typography>
                            </Box>
                        ) : null
                    }
                    
                  </Box>
                  {/* <Typography sx={{ color: 'text.secondary' }}>
                                            {certificat.Filiere.nom}
                                        </Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                    {/* <Typography>{certificat.Etudiant.User.email}</Typography> */}
                    <Box sx={{ display: 'flex', flexDirection: {xs:'column', md: 'row'}, width: "100%" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "100%", md: "50%"} }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "100%", md: "100%"} }}>
                                <DocumentWrapper>
                                    <Document file={url + certificat.fileName} onLoadSuccess={handleLoadSuccess} options={options} >
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                </DocumentWrapper>
                                {/* <p>Page {pageNumber} de {numPages}</p> */}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "100%", md: "100%"} }}>
                                {/* {certificat.txnHash} */}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: "100%", md: "50%"} }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <InfoListItem primary="Nom complet" secondary={certificat.Etudiant.User.nom + " " + certificat.Etudiant.User.prenom} />
                                <Divider variant="inset" component="li" />
                                <InfoListItem primary="CNE" secondary={certificat.Etudiant.cne} />
                                <Divider variant="inset" component="li" />
                                <InfoListItem primary="Code Apogée" secondary={certificat.Etudiant.code_apogee} />
                                <Divider variant="inset" component="li" />
                                <InfoListItem primary="CIN" secondary={certificat.Etudiant.User.cin} />
                                <Divider variant="inset" component="li" />
                                <InfoListItem primary="Date de naissance" secondary={certificat.Etudiant.date_naissance} />
                                <Divider variant="inset" component="li" />
                                <InfoListItem primary="Date d'inscription" secondary={certificat.Etudiant.date_inscription} />
                                <Divider variant="inset" component="li" />
                            </List>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', 
                            flexDirection: 'column', 
                            width: '120%', 
                            placeItems: 'center', 
                            backgroundColor: 'rgba(255, 214, 201, 0.7)', 
                            marginLeft: "-10%", 
                            marginBottom: "-17px", 
                            marginTop: "12px",
                            paddingTop: "5px",
                            paddingBottom: "5px"}}>
                        {certificat.txnHash ? (
                            <Button
                                component="a"
                                color="primary"
                                sx={{ mt: 0, }}
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                    window.open(
                                        `https://testnet.algoexplorer.io/tx/${certificat.txnHash}`
                                    );
                                }}
                            >
                                Afficher Transaction
                            </Button>
                        ) : null}
                    </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        );
      })
        ) : (
            null
        )
        }
    </div>
  );
};

export default SignedCertificates;
