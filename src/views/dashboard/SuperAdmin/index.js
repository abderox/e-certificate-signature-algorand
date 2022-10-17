import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import FiliereCard from "../Default/FiliereCard";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";

import { getAllFilieresAction } from "store/backOpsAction";
import {getAllFilieres} from 'api/backoperations/filiere.service';

import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import Toast from "ui-component/ui-error/toast";

// ==============================|| SuperAdmin DASHBOARD ||============================== //

const SuperAdminDashboard = () => {
  const [isLoading, setLoading] = useState(true);
//   const filieresInfos = useSelector((state) => state.backops.filieres);
  const dispatch = useDispatch();
//   const [filieres, setFilieres] = useState([]);
  const walletInfos = useSelector((state) => state.wallet);

  console.log("walletInfos: ", walletInfos);
  const [open, setOpen] = useState((walletInfos?.address === null) ? true : false);

  useEffect(() => {
    setLoading(false);
  }, []);


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} justifyContent={"start"}>
            <Grid item xs={12} key={2}>
                <Collapse in={open}>
                    <Alert
                    severity="info"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                        Bonjour, veuillez connecter votre wallet !
                    </Alert>
                </Collapse>
            </Grid>
          {
            (isLoading) ? (
                null
            ) : (
                <Grid item lg={4} md={6} sm={6} xs={12} key={3}>
                    Super Admin Dashboard ...
                </Grid>
            )
            }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuperAdminDashboard;
