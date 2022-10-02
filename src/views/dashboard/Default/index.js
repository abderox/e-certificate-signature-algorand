import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} justifyContent={'space-evenly'}>
                    <Grid item lg={5} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} key={1} />
                    </Grid>
                    <Grid item lg={5} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} key={2} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
