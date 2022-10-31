import React from 'react';
import { makeStyles } from '@mui/styles';
import ImageCard from './ImageCard';
import useWindowPosition from '../hook/useWindowPosition';
import { Box, Grid } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'column'

  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  const places = [
    {
      title: 'Innovation',
      description:
        "Nous essayons de sortir des sentiers battus en innovant une toute nouvelle solution E-Certificate , qui remplacera à la fois la signature automatique et la signature traditionnelle pour introduire blockchain et web 3.0 dans ce produit.",
      time: 1500,
    },
    {
      title: 'Performance',
      description:
        'En termes de performance et de facilité, l’adoption de cette solution aidera le personnel de l’université à réduire le temps consacré à la signature et à la révision des diplômes générés pour des milliers d’étudiants chaque année.',
      time: 1600,
    },
    {
      title: 'Authenticité',
      description:
        'La partie passionnante de tout cela, et qui mérite le battage médiatique est l’immuabilité du certificat généré. Aucun ne possède la capacité de frauder ou d’oser modifier ses informations. Il n’y a qu’une pièce unique pour chaque certificat généré. ',
      time: 1700,
    },
  ];
  return (
    <>
      <div className={classes.root} id="stop-here">

        <Grid

          spacing={3}
          justify="center"
          alignItems="center"

        >
          {places.map((place, i) => (
            <Grid item xs={12} sm={12} key={i} >
              <ImageCard place={place} checked={checked} />
            </Grid>
          ))}
        </Grid>
      
           

        <Box
              sx={{
                display: 'flex',
                justifyContent: 'around',
                alignItems: 'center',
                flexDirection: 'row',
                p: 2,
                m: 2,
              }}
            >
              <a 
                href="https://github.com/abderox"

                target="_blank"
                rel="noopener noreferrer"
                style ={{
                  marginRight : "10px"
                  , opacity : 0.2
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/81394980?v=4"
                  alt="abderox"
                  style={{ width: 24 , height :24 , borderRadius : 50 , opacity : 0.1}}
                />
              </a>
            
              <a 
                href="https://github.com/kaoutar-ou"

                target="_blank"
                rel="noopener noreferrer"
                style ={{
                  opacity : 0.2
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/82285643?v=4"
                  alt="kaoutar"
                  style={{ width: 24 , height :24 , borderRadius : 50 ,opacity : 0.1}}
                />
              </a>
            </Box>
        
          
      
      



      </div>
      <footer
        style={{
          backgroundColor: 'linear-gradient(174deg, rgba(0,0,0,1) 2%, rgba(41,9,102,1) 50%)',
          color: '#fff',
          textAlign: 'center',
          padding: '20px',
          position: 'relative',
          bottom: '0',
          width: '100%',
        }}
      >
        <p>© 2022 E-Certificate</p>

      </footer>

    </>
  );
}

