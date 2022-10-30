import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthCardWrapperForm from './AuthCardWrapperForm';
import Etablissement from './Etablissment';
import Filiere from './Filiere';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';



const AddComponent = ({isEtablissment}) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
    <>
            <Grid container spacing={3} >
             
                    <Grid container justifyContent="center" alignItems="center" >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapperForm>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                   
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        {isEtablissment ? "Ajouter Etablissment" : "Ajouter filière" }
                                                    </Typography>
                                                   
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} lg={12} >
                                        {isEtablissment ? <Etablissement /> :<Filiere />}
                                      
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                 
                                  
                                </Grid>
                            </AuthCardWrapperForm>
                        </Grid>
                    </Grid>
             
            </Grid>
            </>
       
    );
};

export default AddComponent;
