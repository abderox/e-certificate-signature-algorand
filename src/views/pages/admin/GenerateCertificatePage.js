import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  ButtonGroup,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

// project imports
import { getAllEtudiantsAction, setEtudiantsAction } from "store/backOpsAction";
import { useRef } from "react";
import AuthCardWrapperForm from "../authentication/AuthCardWrapperForm";

const EtudiantsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filiere = useSelector((state) => state.backops.filiere);
  const etudiants = useSelector((state) => state.backops.etudiants);

  return (
    <>
      <Grid container spacing={3}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapperForm>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  container
                  direction={matchDownSM ? "column-reverse" : "row"}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Typography
                        color={theme.palette.secondary.main}
                        gutterBottom
                        variant={matchDownSM ? "h3" : "h2"}
                      >
                        {isEtudiant
                          ? "Inscrire étudiant"
                          : "Inscrire administrateur"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                {isEtudiant ? <AuthRegisterEtudiant /> : <AuthRegister />}
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

export default EtudiantsPage;
