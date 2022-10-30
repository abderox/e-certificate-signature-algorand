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


import { createFiliere, uploadLogo, getEtabs } from 'api/backoperations/universite.service'
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
    const [etabs, setetabs] = useState([]);




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
        dispatch(clearMessage());
        getEtabs().then((response) => {
            console.log(response)
            setetabs(response.data.etabs)
        })

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
                    nom: '',
                    abbr: '',
                    description: '',
                    date_creation: '',
                    site_web: '',
                    logo: null,
                    etablissement: "FSTG",
                    duree: 1,
                    diplome: "Licence"
                }}

                validationSchema={Yup.object().shape({
                    nom: Yup.string().max(50).required('Nom is required'),
                    abbr: Yup.string().max(10).required('Abbr is required'),
                    diplome: Yup.string().max(30).required('Adresse is required'),
                    description: Yup.string().max(255).required('Description is required'),
                    etablissement: Yup.string().max(50).required('Etablissement is required'),
                    duree: Yup.number().required('Duree is required'),

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                    let initVals = {
                        nom: '',
                        abbr: '',
                        description: '',
                        date_creation: '',
                        site_web: '',
                        logo: null,
                        etablissement: "FSTG",
                        duree: 1,
                        diplome: "Licence"
                    }



                    try {
                        if (scriptedRef.current) {
                            dispatch(clearMessage())



                            values.date_creation = date_creation["$d"].toLocaleDateString('fr-FR');
                            values.logo = extension ? values.abbr + '.' + extension : null;

                            const dataArray = new FormData();
                            dataArray.append("file", uploadlogo, values.logo);



                            console.log(values)
                            setloading(true);



                            Promise.all([createFiliere(values), values.logo ? uploadLogo(dataArray) : null])
                                .then((response) => {
                                    console.log(response)
                                    setloading(false);
                                    dispatch(setMessage({ type: 'success', message: response[0].data.message || "la filière est bien ajouté !" }))
                                    Object.values(values).
                                        forEach((value, index) => {
                                            values[Object.keys(values)[index]] = initVals[Object.keys(values)[index]]
                                        }
                                        )
                                })
                                .catch((error) => {
                                    console.log(error)
                                    setloading(false);
                                    dispatch(setMessage({ type: 'error', message: error?.response?.data?.message || "Un erreur est survenue !" }))
                                    Object.values(values).
                                        forEach((value, index) => {
                                            values[Object.keys(values)[index]] = initVals[Object.keys(values)[index]]
                                        }
                                        )

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

                                    value={values.etablissement}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="etablissement"
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ ...theme.typography.customInput, mt: 2 }}


                                >
                                    <MenuItem value={"UCA"}>
                                        <em>--Etablissement--</em>
                                    </MenuItem>

                                    {etabs &&
                                        etabs.map((etab) => (
                                            <MenuItem value={etab}>{etab}</MenuItem>
                                        ))
                                    }

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
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    label="diplôme"
                                    margin="normal"
                                    name="diplome"
                                    value={values.diplome}
                                    type="text"
                                    onChange={handleChange}
                                    error={Boolean(touched.diplome && errors.diplome)}
                                />
                                {touched.diplome && errors.diplome && (
                                    <FormHelperText error id="standard-weight-helper-text-diplome">
                                        {errors.diplome}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Durée"
                                    margin="normal"
                                    name="duree"
                                    type="number"
                                    value={values.duree}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.duree && errors.duree)}
                                />
                                {touched.duree && errors.duree && (
                                    <FormHelperText error id="standard-weight-helper-text-duree">
                                        {errors.duree}
                                    </FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Site web"
                                    margin="normal"
                                    name="site_web"
                                    type="text"
                                    value={values.site_web}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                                    Ajouter logo  (type: PNG)
                                    <input hidden accept="image/*" type="file" onChange={uploadImage} />
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
