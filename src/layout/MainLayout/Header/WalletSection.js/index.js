import { useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

import { useDispatch, useSelector } from "react-redux";
import { setAccountAddress, setWalletAuthToken, disconnectWallet } from "store/walletAction";

import { WALLET_CONSTANTS } from "utils/global-constants";

import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { useNavigate } from "react-router";
import { useRef } from "react";

import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { IconLogout, IconSettings, IconUser, IconLetterA, IconLetterW } from '@tabler/icons';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useState } from "react";

const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});



const WalletSection = () => {
    const theme = useTheme();

    const customization = useSelector((state) => state.customization);
    const userInfo = useSelector((state) => state.login.user);
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);


  const { address } = useSelector((state) => state.wallet);
  const { wallet } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
    setOpen(false);
};
const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};

const prevOpen = useRef(open);
useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
    }

    prevOpen.current = open;
}, [open]);

  useEffect(() => {
    console.log("hi")
    const escFunction = (event) => {
      if (event.keyCode === 27) QRCodeModal.close();
    };
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    console.log("wallet");
    console.log(userInfo.roles);
    if (connector.connected && connector.accounts.length > 0) {
      dispatch(setAccountAddress(
        {
            address: connector.accounts[0],
            wallet: WALLET_CONSTANTS.WALLET_CONNECT,
        }
      ));
    }
  }, [dispatch]);


  const connectToMobileWallet = async () => {
    console.log("connect to mobile wallet");
    if (connector.connected) return;
    if (connector.pending) return QRCodeModal.open(connector.uri);
    await connector.createSession();
    connector.on("connect", (error, payload) => {
        try {
          if (error) {
            throw error;
          }
          const { accounts } = payload.params[0];
        dispatch(setAccountAddress(
            {
                address: accounts[0],
                wallet: WALLET_CONSTANTS.WALLET_CONNECT,
            }
        ));
        console.log("connected");
        console.log(accounts[0]);
        } catch (error) {
          console.error(error);
        }
    });
  };

  const disconnectMobileWallet = async () => {
    if (wallet === WALLET_CONSTANTS.WALLET_CONNECT) {
        if (!connector.connected) return;
        connector.on("disconnect", async (error, payload) => {
            try {
                if (error) {
                    throw error;
                }
                dispatch(disconnectWallet());
                dispatch(setWalletAuthToken(null));
            } catch (error) {
                console.error(error);
            }
        });
        await connector.killSession();
    }
    if (wallet === WALLET_CONSTANTS.ALGO_SIGNER) {
        dispatch(disconnectWallet());
        dispatch(setWalletAuthToken(null));
    }
  };

  const connectAlgoSigner = async () => {

    const AlgoSigner = window.AlgoSigner;

    if (typeof AlgoSigner != "undefined") {
        await AlgoSigner.connect();
        const accounts = await AlgoSigner.accounts({
            ledger: 'TestNet',
        });
        console.log(accounts);
        dispatch(setAccountAddress(
            {
                address: accounts[0].address,
                wallet: WALLET_CONSTANTS.ALGO_SIGNER,
            }
        ));
    }
  }    



  return (
      
      <>

            <Chip
                sx={{
                    marginRight: '10px',
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.secondary.light,
                        '& svg': {
                            stroke: theme.palette.secondary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <WalletOutlinedIcon
                    sx={{
                            width: '36px',
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                         />
                }
                label={<Typography
                    variant="h5" 
                    color={theme.palette.primary.main}
                    sx={{
                        '&:hover': {
                            color: theme.palette.secondary.light,
                            '& svg': {
                                stroke: theme.palette.secondary.light
                            }
                        },
                        'marginRight': '10px',
                    }}
                    >
                        {address? "Mon \"wallet\" " : "Connecter Wallet"}
                    </Typography>}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    onClick={handleToggle}
                variant="outlined"
                aria-haspopup="true"
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2, pb:0 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">{address? address.slice(0, 20) + (address.length > 20 ? "..." : "") : ""}</Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">{wallet == WALLET_CONSTANTS.WALLET_CONNECT ? "Wallet Connect" : (wallet == WALLET_CONSTANTS.ALGO_SIGNER ? "Algo Signer" : userInfo.email)}</Typography>
                                        </Stack>
                                        <Divider />
                                    </Box>
                                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                {
                                                    address ? (
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 4}
                                                            onClick={() => disconnectMobileWallet()}
                                                        >
                                                            <ListItemIcon>
                                                                <IconLogout stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Disconnect</Typography>} />
                                                        </ListItemButton>
                                                    ) : (
                                                        <>
                                                            <ListItemButton
                                                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                selected={selectedIndex === 0}
                                                                onClick={() => connectAlgoSigner()}
                                                            >
                                                                {/* <ListItemIcon>
                                                                    <IconLetterA stroke={1.5} size="1.3rem" />
                                                                </ListItemIcon> */}
                                                                <ListItemText primary={<Typography variant="body2">Algo Signer</Typography>} />
                                                            </ListItemButton>
                                                            <ListItemButton
                                                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                selected={selectedIndex === 0}
                                                                onClick={() => connectToMobileWallet()}
                                                            >
                                                                {/* <ListItemIcon>
                                                                    <IconLetterW stroke={1.5} size="1.3rem" />
                                                                </ListItemIcon> */}
                                                                <ListItemText primary={<Typography variant="body2">Wallet Connect</Typography>} />
                                                            </ListItemButton>
                                                        </>
                                                    )
                                                }
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
  );
};

export default WalletSection;