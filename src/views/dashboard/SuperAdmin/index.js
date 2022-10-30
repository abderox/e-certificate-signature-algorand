import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// material-ui
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Chip from '@mui/joy/Chip';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import FiliereCard from "./Card";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";

import { getAllFilieresAction, getCertifiedFilieresAction } from "store/backOpsAction";
import { getAllFilieres } from 'api/backoperations/filiere.service';

import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import Toast from "ui-component/ui-error/toast";
import CustomAlert from "ui-component/ui-error/alert";

// ==============================|| SuperAdmin DASHBOARD ||============================== //

const SuperAdminDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  //   const filieresInfos = useSelector((state) => state.backops.filieres);
  const dispatch = useDispatch();
  //   const [filieres, setFilieres] = useState([]);
  const walletInfos = useSelector((state) => state.wallet);

  const filieresInfos = useSelector((state) => state.backops.filieres);

  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    // dispatch(getCertifiedFilieresAction());
    dispatch(getAllFilieresAction());
    console.log("filieres: ", filieres);
  }, []);

  useEffect(() => {
    console.log("filieres: ", filieres);
    setFilieres(filieresInfos);
    setLoading(false);
  }, [filieresInfos]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} justifyContent={"start"}>
          <Grid item xs={12} key={2}>
            <CustomAlert isOpen={(walletInfos?.address === null) ? true : false} severity="info" content="Bonjour, veuillez connecter votre wallet !" />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Link to="/add-etablissment"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                replace={true}
              >
                <Button variant="contained" startIcon={<AccountBalanceOutlinedIcon />}>
                  Ajouter Etablissement
                </Button>
              </Link>
              <Link to="/add-filiere"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                replace={true}
              >
                <Button variant="contained" startIcon={<AccountTreeIcon />}>
                  Ajouter Filière
                </Button>
              </Link>

            </Box>
          </Grid>
          {
            (isLoading) ? (
              null
            ) : (
              filieres.map((filiere) => {
                return (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={filiere.id}>
                    <FiliereCard
                      filiere={filiere}
                      isLoading={isLoading}
                      key={filiere._id}
                    />
                  </Grid>
                );
              })
              // <Grid item lg={4} md={6} sm={6} xs={12} key={3}>
              //       Super Admin Dashboard ...
              //   </Grid>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuperAdminDashboard;
