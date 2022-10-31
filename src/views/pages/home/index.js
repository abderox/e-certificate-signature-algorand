import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Cards from './components/cards';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor : 'rgb(0,0,0)',
    background: 'linear-gradient(174deg, rgba(0,0,0,1) 0%, rgba(41,9,102,1) 60%)'


  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Cards />
    </div>
  );
}
