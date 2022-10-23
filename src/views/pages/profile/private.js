import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CustomizedAccordions from 'ui-component/accordion';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { getPrivateProfileStudentAction } from 'store/profileAction';
import { updateVisibility } from 'api/profile/profile.service';

const drawerWidth = 400;
const drawerWidthMin = 440;



const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${useMediaQuery('(min-width:600px)') ? drawerWidth : drawerWidthMin}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const SkeletonCertif = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={400} height={60} />
            <Skeleton variant="rectangular" width={400} height={60} />
        </Stack>
    );
}
const SkeletonInfo = () => {
    return (
        <Stack spacing={2} >
            <Skeleton variant="rectangular" width={400} height={50} />
            <Skeleton variant="rectangular" width={400} height={50} />
            <Skeleton variant="rectangular" width={400} height={50} />
            <Skeleton variant="rectangular" width={400} height={50} />
        </Stack>
    );
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${useMediaQuery('(min-width:600px)') ? drawerWidth : drawerWidthMin}px)`,
        marginLeft: `${useMediaQuery('(min-width:600px)') ? drawerWidth : drawerWidthMin}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const ItemInfo = ({ data, label }) => {
    return (<ListItem key={label} disablePadding>
        <TextField
            disabled
            id="outlined-disabled"
            label={label}
            value={data}
            sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                    WebkitTextFillColor: "gray",
                },
            }}
        />
    </ListItem>);
}

export default function Profile() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.privateProfile.myProfile);
    const isLoggedIn = useSelector((state)=> state.login.isAuthenticated)
    const user = useSelector((state) => state.login.user);
    const [info, setinfo] = useState({});
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = React.useState(true);
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const cne = new URLSearchParams(search).get('cne');
    const other = new URLSearchParams(search).get('o');
    const [loading, setloading] = useState(true);
    const [wait, setwait] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        console.log(info)
        console.log(profile)
        setloading(true)
        if (profile==null) {
            feed();
        }
        else {
            console.log(profile)
            setinfo(profile);
            setloading(false)
        }

    }, []);

    const feed = () => {

        if (isLoggedIn) {
            console.log("loged in")
            dispatch(getPrivateProfileStudentAction({ code_apogee: user.student.code_apogee || code, cne: user.student.code_apogee.cne || cne, user_id: user.id })).then((res) => {
                console.log(res)
                setinfo(res);
                setChecked(res.student.visibility);
                setloading(false);
            })
        }
        else {
            navigate('/login');
        }

    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    const handleChange = (event) => {
        setChecked(event.target.checked);
        setwait(true);
        updateVisibility({
            user_id: user.id,
            visibility: event.target.checked
        }).then((res) => {
            setwait(false);
            feed();
        }).catch((err) => {
            alert(err);
            setwait(false);
        })

    };



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3" noWrap component="div" style={{ color: "white" }}>
                        {loading || info.student.visibility ? "Profile en mode public" : "Profile en mode privé"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: useMediaQuery('(min-width:600px)') ? drawerWidth : drawerWidthMin,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: useMediaQuery('(min-width:600px)') ? drawerWidth : drawerWidthMin,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Avatar
                        alt="profile image"
                        src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/256/000000/external-hacker-male-profession-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
                        sx={{ width: 256, height: 256, marginBottom: 4 }}
                    />
                </Box>

                <Divider />
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off">
                    {(user && user.student) &&
                        <>
                            <FormControlLabel
                                sx={{ ml: 2 }}
                                control={<IOSSwitch sx={{ m: 1 }}
                                    checked={checked}
                                    disabled={wait}
                                    onChange={handleChange} />}
                                label="Profile public ?"
                            />
                            <Typography sx={{ fontWeight: 'medium', ml: 3, mb: 3 }}>
                                <span style={{ fontSize: '9pt', color: 'gray' }}> Si vérifié tout le monde peuvent accèder à votre profile </span>
                            </Typography>

                        </>}

                    {loading ?

                        <SkeletonInfo /> :
                        <>
                            <ItemInfo data={info.university.nom} label={'Université'} />
                            <ItemInfo data={user.student.cne} label={'CNE'} />
                            <ItemInfo data={user.student.code_apogee} label={'Code apogée'} />
                            <ItemInfo data={user.student.user.nom} label={'Nom'} />
                            <ItemInfo data={user.student.user.prenom} label={'Prénom'} />
                        </>
                    }


                </Box>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Container maxWidth="md" sx={{ margin: 2 }} >
                    <Box >
                        {loading || info.certificatsInfo.length < 1 ? <SkeletonCertif /> : info.certificatsInfo.map((item, index) => (
                            <CustomizedAccordions key={index} panel={'panel' + index} data={item} />
                        ))}
                    </Box>
                </Container>
            </Main>
        </Box>
    );
}
