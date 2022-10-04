import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';

import { getAllFilieresAction } from 'store/backOpsAction'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const filieresInfos = useSelector((state) => state.allFilieres);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(false);
        dispatch(getAllFilieresAction());
        console.log(filieresInfos);
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
