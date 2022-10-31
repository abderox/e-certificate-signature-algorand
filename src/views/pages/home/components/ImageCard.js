import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    margin: '20px auto',
    background: 'rgba( 255, 255, 255, 0.1 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 5.5px )',
    webkitBackdropFilter: 'blur( 5.5px )',
    borderRadius: '10px',
   
  },
  media: {
    height: 440,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
  },
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
       
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
            
          >
            {place.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {place.description}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}
