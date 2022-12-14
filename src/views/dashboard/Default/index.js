import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import FiliereCard from "./FiliereCard";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";

import { getAllFilieresAction } from "store/backOpsAction";
import { getAllFilieres } from 'api/backoperations/filiere.service';

import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import Toast from "ui-component/ui-error/toast";


// ==============================|| DEFAULT DASHBOARD ||============================== //


const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const filieresInfos = useSelector((state) => state.backops.filieres);
  const dispatch = useDispatch();
  const [filieres, setFilieres] = useState([]);
  // const toastMessage = useSelector((state) => state.message.message);
 

  useEffect(() => {
    dispatch(getAllFilieresAction());
  }, []);

  useEffect(() => {
    console.log("filieres: ", filieresInfos);
    setFilieres(filieresInfos);
    setLoading(false);
  }, [filieresInfos]);


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} justifyContent={"start"}>
          {
            (isLoading) ? (
              [1, 2, 3].map((item) => (
                <Grid item lg={4} md={6} sm={6} xs={12} key={item}>
                  <SkeletonEarningCard />
                </Grid>
              ))
            ) : (
              filieres.map((filiere) => {
                return (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={"filiere-"+filiere.abbr}>
                    <FiliereCard
                      filiere={filiere}
                      isLoading={isLoading}
                      key={filiere.id}
                    />
                  </Grid>
                );
              })
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
