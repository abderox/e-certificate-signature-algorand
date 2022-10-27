import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";

import AddIcon from '@mui/icons-material/Add';
// assets
import EarningIcon from "assets/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import { useDispatch, useSelector } from "react-redux";

import { getAllCertificatsByFiliereAction, getAllEtudiantsAction, setFiliere } from "store/backOpsAction";
import { importEtudiantExcel, importEtudiantExcelAction, importNoteExcelAction } from "store/uploadAction";
// import { importEtudiantExcel } from "api/backoperations/upload.service";
import { useEffect } from "react";
import Toast from "ui-component/ui-error/toast";
import { clearMessage } from "store/apiMessage";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const FiliereCard = ({ isLoading, filiere }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  const [filiereAbbr, setFiliereAbbr] = useState(null);
  
  useEffect(() => {
    setFiliereAbbr(filiere.abbr);
    dispatch(clearMessage())
  }, [filiere]);

  const handleFiliereChoice = () => {
    console.log("filiere abbr", filiere.abbr);
    dispatch(setFiliere(filiere));
    dispatch(getAllCertificatsByFiliereAction(filiere.abbr));
    navigate("/certificats", { replace: true });
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {filiere.abbr}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark,
                      }}
                      onClick={handleFiliereChoice}
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                      />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25, height: "40px" }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[200],
                  }}
                >
                  {filiere.nom}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

FiliereCard.propTypes = {
  isLoading: PropTypes.bool,
  filiere: PropTypes.object,
};

export default FiliereCard;
