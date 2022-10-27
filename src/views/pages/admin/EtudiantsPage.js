import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Button, ButtonGroup } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox } from '@mui/material';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';



// project imports
import { getAllEtudiantsAction, setEtudiantsAction } from 'store/backOpsAction';
import { useRef } from 'react';

const EtudiantsPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filiere = useSelector((state) => state.backops.filiere);
    const etudiants = useSelector((state) => state.backops.etudiants);

    const [expanded, setExpanded] = React.useState(false);
    const [searchString, setSearchString] = React.useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [checked, setChecked] = React.useState((etudiants) ? etudiants.map(e => false) : [false]);
    const [isValide, setIsValide] = React.useState(null);
    const [isCertified, setIsCertified] = React.useState(null);

    const [isGenerateCertificateActive, setIsGenerateCertificateActive] = React.useState(false);

    const [selectedEtudiants, setSelectedEtudiants] = React.useState([]);

    const handleChangeParendCheck = (event) => {
        setChecked(etudiants.map(e => event.target.checked));
    };

    const handleChangeChildCheck = (event, index) => {
        // console.log(index)
        setChecked(etudiants.map((e, i) => (i === index) ? event.target.checked : checked[i] ));
    };
    
    
    const handleSearchChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleSetIsValide = (e) => {
        const valide = e.target.value;
        // console.log(valide);
        (valide == "true") ? setIsValide(true) : ((valide == "false") ? setIsValide(false) : setIsValide(null));
    };

    const handleSetIsCertified = (e) => {
        const certified = e.target.value;
        console.log(certified);
        (certified == "true") ? setIsCertified(true) : ((certified == "false") ? setIsCertified(false) : setIsCertified(null));
    };
    
    const handleSearch = () => {
        dispatch(getAllEtudiantsAction({filiere: filiere.abbr, search: searchString, valide: isValide, certified: isCertified}));
        setChecked(etudiants.map(e => false));
    }

    // const handleSetIsValidd = () => {
    //     console.log("handleSetIsValidd");
    //     console.log(selectedEtudiants);
    // }

    const handleGenrateCertificateActive = () => {
        // console.log("handleGenrateCertificateActive");
        
        let duree = filiere.duree;
        let nbrAdmis = 0;
        let isAllAdmis = false;
        
        etudiants.map((e, i) => {
            let totalAdmis = 0;
            if (checked[i]) {
                console.log(i);
                e.AnneeUniversitaires.map((a, j) => {
                    if (a.isAdmis) {
                        totalAdmis += 1;
                    }
                });
            }
            // console.log(totalAdmis);
            if (totalAdmis == duree) {
                nbrAdmis += 1;
            }
        });

        if (nbrAdmis != 0 && nbrAdmis == selectedEtudiants.length) {
            isAllAdmis = true;
        }
        
        setIsGenerateCertificateActive(isAllAdmis);
    }

    const handleGenerateCertificate = () => {
        console.log("handleGenerateCertificate");

        console.log("filiere: ", filiere.abbr);
        console.log("etudiants----: ", selectedEtudiants);
        // dispatch(setEtudiantsAction(selectedEtudiants));
        navigate("/admin/generate-certificate", { replace: true });

    }
        
    useEffect(() => {
        dispatch(getAllEtudiantsAction({filiere: filiere.abbr, search: searchString, valide: isValide, certified: isCertified}));
        setChecked(etudiants.map(e => false));
    }, [isValide, isCertified]);
    
    useEffect(() => {
        checked.forEach((element, index) => {
            if (etudiants && etudiants[index]) {
                if (element) {
                    setSelectedEtudiants((prev) => prev.includes(etudiants[index]) ? prev : [...prev, etudiants[index]]);
                } else {
                    setSelectedEtudiants((prev) => prev.filter(e => e !== etudiants[index]));
                }
            }
        });
    }, [checked]);

    useEffect(() => {
        handleGenrateCertificateActive();
    }, [selectedEtudiants]);

    return (
    <>
            <Grid container spacing={3} >
                    <Grid container justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ m: { xs: 1, sm: 2 }, mb: 0 }}>
                            <Grid container justifyContent="center" alignItems="center" direction={"row"}>
                                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ p: { xs: 1, sm: 2 }, mb: 0 }}>
                                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search"
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={handleSearchChange}
                                            disabled={(etudiants && etudiants.length > 0) ? false : true}
                                        />
                                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3} lg={3} sx={{ p : { xs: 1, sm: 2 }, mb: 0 }} container justifyContent="end">

                                    {/* <Button color="error" variant="outlined" onClick={handleSetIsValidd}>test</Button> */}
                                    {/* <Button color={`${isValide ? "success" : "error"}`} variant={`${isValide ? "outlined" : ""}`} onClick={handleSetIsValide}>{isValide ? "Validé" : "Non validé"}</Button> */}
                                    {/* <Button color={`${isCertified ? "success" : "error"}`} variant={`${isCertified ? "outlined" : ""}`} onClick={handleSetIsCertified}>{isCertified ? "Certifié" : "Non certifié"}</Button> */}

                                    <ButtonGroup size="small" color="secondary" aria-label="certifiedButtonGroup" style={{backgroundColor: '#fff', width: "100%"}}>
                                        <Button value={"false"} variant={`${(isCertified == false) ? 'contained' : '' }`} onClick={handleSetIsCertified} sx={{ p: '10px' }} style={{width: "40%"}} disabled={((etudiants && etudiants.length > 0) || isCertified == false) ? false : true}>
                                            Non certifié
                                        </Button>
                                        <Button value={"null"} variant={`${(isCertified == null) ? 'contained' : '' }`} onClick={handleSetIsCertified} sx={{ p: '10px' }} style={{width: "40%"}}>
                                            Tous
                                        </Button>
                                        <Button value={"true"} variant={`${(isCertified == true) ? 'contained' : '' }`} onClick={handleSetIsCertified} sx={{ p: '10px' }} style={{width: "40%"}} disabled={((etudiants && etudiants.length > 0) || isCertified == true) ? false : true}>
                                            Certifié
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={6} sm={6} md={3} lg={3} sx={{ p : { xs: 1, sm: 2 }, mb: 0 }} container justifyContent="end">
                                    <ButtonGroup size="small" color="secondary" aria-label="valideButtonGroup" style={{backgroundColor: '#fff', width: "100%"}}>
                                        <Button value={"false"} variant={`${(isValide == false) ? 'contained' : '' }`} onClick={handleSetIsValide} sx={{ p: '10px' }} style={{width: "40%"}} disabled={((etudiants && etudiants.length > 0) || isValide == false) ? false : true}>
                                            Non validé
                                        </Button>
                                        <Button value={"null"} variant={`${(isValide == null) ? 'contained' : '' }`} onClick={handleSetIsValide} sx={{ p: '10px' }} style={{width: "40%"}}>
                                            Tous
                                        </Button>
                                        <Button value={"true"} variant={`${(isValide == true) ? 'contained' : '' }`} onClick={handleSetIsValide} sx={{ p: '10px' }} style={{width: "40%"}} disabled={((etudiants && etudiants.length > 0) || isValide == true) ? false : true}>
                                            Validé
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: { xs: 1, sm: 2 }, mb: 0 }}container justifyContent="end">
                                    <Button color={`${isGenerateCertificateActive ? "secondary" : "secondary"}`} 
                                            variant={`${isGenerateCertificateActive ? "contained" : "contained"}`} 
                                            disabled={!isGenerateCertificateActive}
                                            onClick={handleGenerateCertificate}>Générer Certificat</Button>
                                    {/* <Button color="error" variant="outlined" onClick={handleGenrateCertificateActive}>test generate</Button> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid width={1} item sx={{ m: { xs: 1, sm: 2 }, mb: 0 }}>

                        {
                            (etudiants && etudiants.length > 0) ? (
                                <Checkbox
                                    indeterminate={etudiants.reduce((p, c, i) => p || checked[i], false)}
                                    checked={etudiants.reduce((p, c, i) => p && checked[i], true)}
                                    onChange={handleChangeParendCheck}
                                />
                            ) : null
                        }

                            {
                                (etudiants && etudiants.length > 0) ? (
                                etudiants.map((etudiant, index) => {
                                    return (
                                        <Grid container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            key={etudiant._id}
                                            sx={{ m: { xs: 1, sm: 2 }, mb: 0 }}>
                                                <Grid item xs={1/2}>
                                                    <Checkbox checked={checked[index] ? checked[index] : false} onChange={(e) => handleChangeChildCheck(e, index)} />
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                                {etudiant.User.nom}
                                                            </Typography>
                                                            <Typography sx={{ color: 'text.secondary' }}>
                                                                {etudiant.User.prenom}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                {etudiant.User.email}
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Grid>
                                        </Grid>
                                    )
                                })
                                ) : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </>
       
    );
};

export default EtudiantsPage;
