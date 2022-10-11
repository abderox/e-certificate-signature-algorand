import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from 'store/registerAction';
import { clearMessage } from 'store/apiMessage';
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
    useMediaQuery
} from '@mui/material';

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

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {

    const dispatch = useDispatch();
    const messageErr = useSelector((state) => state.message.message);
    const successRegistration = useSelector((state) => state.register.createdUser);
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [loading, setloading] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const filiereAbbr = useSelector((state) => state.backops.filiere);


    const [date_naissance, setdate_naissance] = useState(dayjs('1999-08-18T21:11:54'));
    const [date_inscription, setdate_inscription] = useState(dayjs('2018-08-18T21:11:54'));


    const handleChangeDateInsc = (newdate) => {
        setdate_inscription(newdate)
    };

    const handleChangeDateNaissance = (newdate) => {
        setdate_naissance(newdate)
    };



    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        dispatch(clearMessage())
        console.log(filiereAbbr)
        
    }, []);

    return (
        <>
            {messageErr && <Toast message={JSON.parse(messageErr)} severity="error" />}
            {successRegistration && <Toast message={successRegistration} severity="success" />}
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
                    address: '',
                    telephone: '',
                    ville: '',
                    pays: '',
                    filiere: '',
                    code_apogee: '',
                    nom: '',
                    prenom: '',
                    cin: '',
                    cne: '',
                    nom: '',
                    prenom: '',
                    date_inscription :'',
                    date_naissance :'',
                    roles: ['etudiant'],
                }}
              
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            dispatch(clearMessage())
                            values.date_inscription = date_inscription["$d"].toLocaleDateString('fr-FR');
                            values.date_naissance = date_naissance["$d"].toLocaleDateString('fr-FR');
                            values.filiere = filiereAbbr;

                            console.log(values)
                            setloading(true);
                            dispatch(registerAction(values,'student')).
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
                <form noValidate onSubmit={handleSubmit} {...others}>                    
                    <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nom"
                                margin="normal"
                                name="nom"
                                type="text"
                                value={values.nom}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Prénom"
                                margin="normal"
                                name="prenom"
                                value={values.prenom}
                                type="text"
                                onChange={handleChange}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Pays"
                                margin="normal"
                                name="pays"
                                type="text"
                                value={values.pays}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ville"
                                margin="normal"
                                name="ville"
                                value={values.ville}
                                type="text"
                                onChange={handleChange}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Address"
                                margin="normal"
                                name="address"
                                value={values.address}
                                type="text"
                                onChange={handleChange}
                                sx={{ ...theme.typography.customInput }}
                            />
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
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Cin"
                                margin="normal"
                                name="cin"
                                type="text"
                                value={values.cin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cne"
                                margin="normal"
                                name="cne"
                                type="text"
                                value={values.cne}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Code apogé"
                                margin="normal"
                                name="code_apogee"
                                type="text"
                                value={values.code_apogee}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DesktopDatePicker
                                    label="Date naissance"
                                    inputFormat="MM/DD/YYYY"
                                    name="date_naissance"
                                    value={date_naissance}
                                    onChange={handleChangeDateNaissance}
                                    renderInput={(params) => <TextField fullWidth  {...params} sx={{ ...theme.typography.customInput }} />}

                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DesktopDatePicker
                                    label="Date inscription"
                                    inputFormat="MM/DD/YYYY"
                                    name="date_inscription"
                                    value={date_inscription}
                                    onChange={handleChangeDateInsc}
                                    renderInput={(params) => <TextField fullWidth  {...params}  sx={{ ...theme.typography.customInput }}/>}

                                />
                            </LocalizationProvider>
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

export default FirebaseRegister;
