import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerAction } from 'store/registerAction';
import { clearMessage } from 'store/apiMessage';
import Toast from 'ui-component/ui-error/toast';
import LoadingButton from '@mui/lab/LoadingButton';
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
    const messageErr = useSelector((state)=>state.message.message);
    const successRegistration = useSelector((state)=>state.register.createdUser);
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [loading, setloading] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        dispatch(clearMessage())
        changePassword('123456');
        console.log(successRegistration)
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
                    email: '',
                    password: '',
                    mac: '',
                    roles: ['admin'],
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required').matches(/^[\w+\.]+@(?:edu\.uca\.|uca\.)ma$/, 'Must be a valid email'),
                    password: Yup.string().max(255).required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'),
                    mac: Yup.string().max(255).required('Mac is required').matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, 'Must be a valid mac')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            dispatch(clearMessage())
                            setloading(true);
                            dispatch(registerAction({ email: values.email, password: values.password, mac: values.mac, username: values.email.split('@')[0], roles: values.roles })).
                                then((res) => {
                                    setloading(false);
                                    setStatus({ success: true });
                                    setSubmitting(false);
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
                            setSubmitting(false);
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
                                    label="First Name"
                                    margin="normal"
                                    name="fname"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lname"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.mac && errors.mac)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-mac-register">MAC</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-mac-register"
                                type="text"
                                value={values.mac}
                                name="mac"
                                label="mac"
                                onBlur={handleBlur}
                                onChange={
                                    handleChange}
                                inputProps={{}}
                            />
                            {touched.mac && errors.mac && (
                                <FormHelperText error id="standard-weight-helper-text-mac-register">
                                    {errors.mac}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>




                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}


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
                                    Save
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
