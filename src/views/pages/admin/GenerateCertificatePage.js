import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


// material-ui
import { useTheme } from "@mui/material/styles";

import {
    Stack,
    Box,
    ButtonGroup,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// project imports
import { generateCertificatesAction, getAllEtudiantsAction, setEtudiantsAction } from "store/backOpsAction";
import { useRef } from "react";
import AuthCardWrapperForm from "../authentication/AuthCardWrapperForm";
import dayjs from "dayjs";
import { useState } from "react";
import { Formik } from "formik";
import { clearMessage } from "store/apiMessage";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AnimateButton from "ui-component/extended/AnimateButton";
import { LoadingButton } from "@mui/lab";
import useScriptRef from "hooks/useScriptRef";
import Toast from "ui-component/ui-error/toast";


const EtudiantsPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const filiere = useSelector((state) => state.backops.filiere);
  const etudiants = useSelector((state) => state.backops.etudiants);
  const scriptedRef = useScriptRef();
  const message = useSelector((state) => state.message.message);

  const [loading, setloading] = useState(false);

  const [date, setDate] = useState(dayjs('1999-08-18T21:11:54'));

  const handleChangeDate = (newDate) => {
    setDate(newDate)
};

  return (
    <>
    {message && <Toast message={JSON.parse(message)} severity="info" />}
      <Grid container spacing={3}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapperForm>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  container
                  direction={matchDownSM ? "column-reverse" : "row"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Typography
                        color={theme.palette.secondary.main}
                        gutterBottom
                        variant={matchDownSM ? "h3" : "h2"}
                      >
                       Générer les certificats
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                








              <Formik
                initialValues={{
                    students: [],
                    filiere: '',
                    signers: [],
                    positions: [],
                    date: '',
                    local: '',
                    titre_diplome: '',
                    ministere: '',
                    presidence: '',
                    etablissement: '',
                    template: '',
                }}
              
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            dispatch(clearMessage())
                            values.date = date["$d"].toLocaleDateString('fr-FR');
                            values.filiere = filiere.abbr;
                            values.template = "certif_8";

                            let students = [];
                            let student = {};
                            etudiants.forEach((etudiant) => {
                                student = {
                                    fullName : etudiant.user.nom + ' ' + etudiant.user.prenom,
                                    cne: etudiant.cne,
                                    cin: etudiant.user.cin,
                                    mention: "Bien",
                                    annee_univ: "2022-2023",
                                }
                                students.push(student);
                            });

                            console.log(students);

                            let signers = [];
                            let signer = {};
                            values.signers.forEach((signer, index) => {
                                signer = {
                                    fullName : signer,
                                    position: values.positions[index],
                                }
                                signers.push(signer);
                            });

                            console.log(signers);

                            let data = {
                                students: students,
                                filiere: values.filiere,
                                signers: signers,
                                date: values.date,
                                local: values.local,
                                titre_diplome: values.titre_diplome,
                                ministere: values.ministere,
                                presidence: values.presidence,
                                etablissement: values.etablissement,
                                template: values.template,
                            }

                            if (values.etablissement != "") { 
                                data["etablissement"] = values.etablissement;
                            }

                            console.log(data)
                            setloading(true);
                            dispatch(generateCertificatesAction(data)).
                                then((res) => {
                                    setloading(false);
                                    setStatus({ success: true });
                                }).catch((err) => {
                                    setloading(false);
                                    setStatus({ success: false });
                                })
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                        }
                    }
                }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>                    
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                        <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Titre du diplôme"
                                    margin="normal"
                                    name="titre_diplome"
                                    type="text"
                                    value={values.titre_diplome}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ministere"
                                    margin="normal"
                                    name="ministere"
                                    value={values.ministere}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Présidence"
                                    margin="normal"
                                    name="presidence"
                                    type="text"
                                    value={values.presidence}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Etablissement"
                                    margin="normal"
                                    name="etablissement"
                                    value={values.etablissement}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Template"
                                    margin="normal"
                                    name="template"
                                    value={values.template}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Signataire"
                                    margin="normal"
                                    name="signers[0]"
                                    type="text"
                                    value={values.signers[0]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    margin="normal"
                                    name="positions[0]"
                                    type="text"
                                    value={values.positions[0]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Signataire"
                                    margin="normal"
                                    name="signers[1]"
                                    type="text"
                                    value={values.signers[1]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    margin="normal"
                                    name="positions[1]"
                                    type="text"
                                    value={values.positions[1]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/DD/YYYY"
                                        name="date"
                                        value={date}
                                        onChange={handleChangeDate}
                                        renderInput={(params) => <TextField fullWidth  {...params} sx={{ ...theme.typography.customInput }} />}

                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Local"
                                    margin="normal"
                                    name="local"
                                    value={values.local}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>


                        </Grid>

                        
                        {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                loading={loading}
                                disabled={loading}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Sauvegarder
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </form>
                    )}
            </Formik>









              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </AuthCardWrapperForm>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EtudiantsPage;
