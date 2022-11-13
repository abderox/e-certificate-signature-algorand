import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from 'store/registerAction';
import { clearMessage, setMessage } from 'store/apiMessage';
import Toast from 'ui-component/ui-error/toast';
import LoadingButton from '@mui/lab/LoadingButton';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import {
    Box,
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
    useMediaQuery,
   

} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ImageOutlined } from '@mui/icons-material';


import { createEtablissment, uploadLogo } from 'api/backoperations/universite.service'
// ===========================|| FIREBASE - REGISTER ||=========================== //

const Etablissement = ({ ...others }) => {

    const dispatch = useDispatch();
    const messageErr = useSelector((state) => state.message);
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [loading, setloading] = useState(false);
    const [uploadlogo, setuploadlogo] = useState(null);
    const [extension, setextension] = useState("");




    const [date_creation, setdate_creation] = useState(dayjs('1996-08-18T21:11:54'));



    const handleChangeDateInsc = (newdate) => {
        setdate_creation(newdate)
    };




    const uploadImage = (event) => {
        event.preventDefault();
        setuploadlogo(event.target.files[0])
        setextension(event.target.files[0].name.split('.').pop())

    };



    useEffect(() => {
        dispatch(clearMessage())

    }, []);

    return (
        <>
            {messageErr && messageErr.message && <Toast message={JSON.parse(messageErr.message)} severity={messageErr.type} />}
            {loading && <Toast message={"traitement, veuillez patienter"} severity={"warning"} />}

            {/* {successRegistration && <Toast message={successRegistration} severity="success" />} */}
            <Grid container direction="column" justifyContent="center" spacing={2}>

                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >

                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    adresse: '',
                    telephone: '',
                    ville: 'MARRAKECH',
                    pays: 'Maroc',
                    nom: '',
                    abbr: '',
                    description: '',
                    email: '',
                    date_creation: '',
                    code_postal: '',
                    site_web: '',
                    logo: null,
                    universite: "UCA",
                }}

                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(40).required('Email is required'),
                    nom: Yup.string().max(100).required('Nom is required'),
                    abbr: Yup.string().max(10).required('Abbr is required'),
                    adresse: Yup.string().max(100).required('Adresse is required'),
                    telephone: Yup.string().max(13).required('Telephone is required'),
                    ville: Yup.string().max(20).required('Ville is required'),
                    description: Yup.string().max(255).required('Description is required'),
                    code_postal: Yup.string().max(255).required('Code postal is required')

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                    try {
                        if (scriptedRef.current) {
                            dispatch(clearMessage())



                            values.date_creation = date_creation["$d"].toLocaleDateString('fr-FR');
                            values.logo = extension ? values.abbr + '.' + extension : null;
                            values.logo = values.logo.toLowerCase()

                            const dataArray = new FormData();
                            dataArray.append("file", uploadlogo, values.logo);
                            


                            console.log(values)
                            setloading(true);



                            Promise.all([createEtablissment(values), values.logo ? uploadLogo(dataArray) : null])
                                .then((response) => {
                                    console.log(response)
                                    setloading(false);
                                    dispatch(setMessage({ type: 'success', message: response[0].data.message || "l'établissement est bien ajouté !" }))
                                })
                                .catch((error) => {
                                    console.log(error)
                                    setloading(false);
                                    dispatch(setMessage({ type: 'error', message: error?.response?.data?.message || "Un erreur est survenue !" }))
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
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    error={Boolean(touched.nom && errors.nom)}
                                    fullWidth
                                    label="Libellé"
                                    margin="normal"
                                    name="nom"
                                    type="text"
                                    value={values.nom}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {touched.nom && errors.nom && (
                                    <FormHelperText error id="standard-weight-helper-text-nom">
                                        {errors.nom}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Abbréviation"
                                    margin="normal"
                                    name="abbr"
                                    value={values.abbr}
                                    type="text"
                                    onChange={handleChange}
                                    error={Boolean(touched.abbr && errors.abbr)}


                                />
                                {touched.abbr && errors.abbr && (
                                    <FormHelperText error id="standard-weight-helper-text-abbr">
                                        {errors.abbr}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Select

                                    value={values.universite}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="universite"
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ ...theme.typography.customInput, mt: 2 }}


                                >
                                    <MenuItem value={"UCA"}>
                                        <em>--Université--</em>
                                    </MenuItem>

                                    <MenuItem value={"UCA"}>Cadi Ayyaad</MenuItem>

                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={Boolean(touched.description && errors.description)}
                                    fullWidth
                                    label="Description"
                                    margin="normal"
                                    name="description"
                                    type="text"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    multiline
                                    maxRows={4}
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="standard-weight-helper-text-description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Select

                                    value={values.pays}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="pays"
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ ...theme.typography.customInput, mt: 2 }}

                                >
                                    <MenuItem value={"Maroc"}>
                                        <em>--pays--</em>
                                    </MenuItem>

                                    <MenuItem value={"Maroc"}>MAROC</MenuItem>

                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={Boolean(touched.ville && errors.ville)}
                                    fullWidth
                                    label="Ville"
                                    margin="normal"
                                    name="ville"
                                    value={values.ville}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.ville && errors.ville && (
                                    <FormHelperText error id="standard-weight-helper-text-ville">
                                        {errors.ville}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField

                                    fullWidth
                                    label="Adresse"
                                    margin="normal"
                                    name="adresse"
                                    value={values.adresse}
                                    type="text"
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                    error={Boolean(touched.adresse && errors.adresse)}
                                />
                                {touched.adresse && errors.adresse && (
                                    <FormHelperText error id="standard-weight-helper-text-adresse">
                                        {errors.adresse}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Telephone"
                                    margin="normal"
                                    name="telephone"
                                    type="text"
                                    value={values.telephone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.telephone && errors.telephone)}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.telephone && errors.telephone && (
                                    <FormHelperText error id="standard-weight-helper-text-telephone">
                                        {errors.telephone}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    error={Boolean(touched.code_postal && errors.code_postal)}
                                    fullWidth
                                    label="Code postal"
                                    margin="normal"
                                    name="code_postal"
                                    type="text"
                                    value={values.code_postal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.code_postal && errors.code_postal && (
                                    <FormHelperText error id="standard-weight-helper-text-code_postal">
                                        {errors.code_postal}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Site web"
                                    margin="normal"
                                    name="site_web"
                                    type="text"
                                    value={values.site_web}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text-email">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DesktopDatePicker
                                        label="Date création"
                                        inputFormat="MM/DD/YYYY"
                                        name="date_creation"
                                        value={date_creation}
                                        onChange={handleChangeDateInsc}
                                        renderInput={(params) => <TextField fullWidth  {...params} />}

                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                <Button variant="outlined" component="label" fullWidth sx={{ border: '#9500ae', outline: '#9500ae', color: '#9500ae' }} startIcon={<ImageOutlined />}>
                                    Ajouter logo (type: PNG, size: 400*150)
                                    <input hidden accept="image/png" type="file" onChange={uploadImage} />
                                </Button>
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
        </>
    );
};

export default Etablissement;
