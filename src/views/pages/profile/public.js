import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { getProfileStudentAction } from 'store/profileAction';


const drawerWidth = 400;
const drawerWidthMin = 440;

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


const ItemInfo = ({data, label}) => {
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
    const profile = useSelector((state) => state.profile);
    const [info, setinfo] = useState({});
    const [open, setOpen] = React.useState(false);
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    const cne = new URLSearchParams(search).get('cne');
    const [loading, setloading] = useState(true);

    const arr = [{
        title: "certificate 2022",
        desc: "fstg marrakech"
    },
    {
        title: "certificate 2019",
        desc: "fstg marrakech"
    }];


    useEffect(() => {

        setloading(true)
        console.log(info)
        if (!profile.profile) {

            dispatch(getProfileStudentAction({ code_apogee: code, cne: cne })).then((res) => {
                console.log(res)
                setinfo(res);
                setloading(false)
            })
        }
        else {
            setinfo(profile.profile);
            setloading(false)
        }

    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                        Public Profile
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
                    {!loading ?
                        <>
                            <ItemInfo data={info.university.nom} label={'Université'} />
                            <ItemInfo data={info.student.cne} label={'CNE'} />
                            <ItemInfo data={info.student.code_apogee} label={'Code apogée'} />
                            <ItemInfo data={info.student.user.nom} label={'Nom'} />
                            <ItemInfo data={info.student.user.prenom} label={'Prénom'} />

                        </>
                        : <SkeletonInfo />}

                </Box>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Container maxWidth="md" sx={{ margin: 2 }} >
                    <Box >
                        {loading ? <SkeletonCertif /> : info.certificatsInfo.map((item, index) => (
                            <CustomizedAccordions key={index} panel={'panel' + index} data={item}/>
                        ))}
                    </Box>
                </Container>
            </Main>
        </Box>
    );
}
