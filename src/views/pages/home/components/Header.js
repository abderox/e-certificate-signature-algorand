import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar, IconButton, Toolbar, Collapse, Avatar } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from 'assets/images/auth/E-Certificate.png'
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#8C52FF',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#8C52FF',
    fontSize: '4rem',
  },
  large :{
    width: 100,
    height: 100,
  }
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>

          <div className={classes.appbarTitle}>
            <img 
              alt="Logo"
              src={logo}
           
              className={classes.large}

            />
          </div>
          <IconButton 
          onClick={
            () => navigate('/login')
          }
          >
            <ArrowOutwardIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Bienvenue sur <br />
            <br />
            <br /><br />
            E-<span className={classes.colorText}>certificate</span>
          </h1>
          <Scroll to="stop-here" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
