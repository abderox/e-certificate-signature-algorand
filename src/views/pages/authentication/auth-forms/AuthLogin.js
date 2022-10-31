import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { loginAction } from 'store/authAction';
import { clearMessage } from 'store/apiMessage';
import { addressMAC } from 'utils';
import Toast from 'ui-component/ui-error/toast';

import { getAllFilieresAction } from "store/backOpsAction";
import { CloseOutlined, DoneOutlineOutlined } from '@mui/icons-material';


const LoginForm = ({ ...others }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectorMsg = useSelector(state => state.message.message);
    const isLoggedIn = useSelector(state => state.login.isAuthenticated);
    const [errorMsg, seterrorMsg] = useState('');


    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = useState(false);
    const [mac, setmac] = useState('');
    const [link, setlink] = useState("http://localhost:7002");
    const [clicked, setclicked] = useState(false);
    const [loading, setLoading] = useState(false);

    const userInfos = useSelector((state) => state.login?.user);


    // useEffect(() => {
    //     addressMAC().then((mac) => {
    //         setmac(mac);
    //     }
    //     );
    // }, [])


    useEffect(() => {
        if (isLoggedIn) {
            if (userInfos?.roles?.includes("ROLE_SUPER_ADMIN")) {
                navigate('/dashboard', { replace: true });
            } else if (userInfos?.roles?.includes("ROLE_ADMIN")) {
                navigate('/admin/dashboard', { replace: true });
            } else if (userInfos?.roles?.includes("ROLE_ETUDIANT")) {
                navigate('/student/my-profile', { replace: true });
            }

        }

    }, [isLoggedIn])


    const handleChangeLink = (e) => {
        setlink(e.target.value)
    }


    const getMacAddr = (link) => {
        let link_ = link.includes("http") || link.includes("http");
        if (link_) {
            addressMAC(link).then((mac) => {
                console.log(mac)
                setmac(mac);
                setclicked(false);
            }
            ).catch((err) => {
                setclicked(false);
                seterrorMsg("Adresse mac introuvable");
            });
        }
        else {
            setclicked(false);
            seterrorMsg("Le lien doit commencer par http ou https");
        }
    }





    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {errorMsg !== '' && <Toast message={errorMsg} severity="error" />}
            {selectorMsg && <Toast message={JSON.parse(selectorMsg)} severity="error" />}
            {mac !== '' && <Toast message={"L'adresse MAC est récupérée avec succès, vous pouvez reprendre le processus d'authentification . !"} severity="success" />}
            <Formik
                initialValues={{
                    // email: '',
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    email: Yup.string().max(255).required('Username or email  is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                    try {
                        dispatch(clearMessage());
                        seterrorMsg('');
                        var emailVerif = true;
                        if (values.email.includes('@')) {
                            emailVerif = /^[\w+\.]+@(?:edu\.uca\.|uca\.)ma$/.test(values.email);
                        }
                        if (!emailVerif) {
                            seterrorMsg('Email must be a valid email : @edu.uca.ma or @uca.ma');
                            return;
                        }
                        if (scriptedRef.current && emailVerif) {

                            setStatus({ success: true });
                            setLoading(true);
                            console.log(mac)
                            dispatch(loginAction({ username: values.email, password: values.password, mac: mac })).then((res) => {
                                console.log(res);
                                // dispatch(getAllFilieresAction());
                                setLoading(false);
                            }).catch((err) => {
                                console.log(err.message);
                                setLoading(false);
                            })

                        }

                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                            setLoading(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={values.email}
                                name="email"
                                disabled={clicked}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={clicked}
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
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!clicked && <Button startIcon={<SecurityOutlinedIcon />} onClick={() => setclicked(!clicked)}>
                                Administrateur
                            </Button>}

                            {clicked && <><TextField
                                id="standard-basic"
                                label="Lien"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                placeholder="URL-> http(s)://domain"
                                helperText="Pour s'authentifier en tant que admin , l'adresse mac est obligatoire ! "
                                value={link}
                                onChange={handleChangeLink}
                            />
                                <CloseOutlined onClick={() => setclicked(!clicked)} />
                                <DoneOutlinedIcon onClick={() => getMacAddr(link)} />
                            </>
                            }

                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    disabled={loading || clicked}
                                    fullWidth
                                    loading={loading}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        ':hover': {
                                            bgcolor: 'buttonDark.main',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    Sign in
                                </LoadingButton>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
