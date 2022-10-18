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

import { getAllEtudiantsAction, setFiliere } from "store/backOpsAction";
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

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStudentRegister = () => {
    console.log("filiere: ", filiere.abbr);
    dispatch(setFiliere(filiere.abbr));
    navigate("/register-student", { replace: true });
  };
  
  const [filiereAbbr, setFiliereAbbr] = useState(null);
  
  useEffect(() => {
    setFiliereAbbr(filiere.abbr);
    dispatch(clearMessage())
  }, [filiere]);


  const handleStudentRegisterExcel = (event) => {
    dispatch(clearMessage())
    console.log("filiere: ", filiereAbbr);
  // TODO 
      const formData = new FormData();
      formData.append(
        "file",
        event.target.files[0]
      );
      formData.append(
        "filiere",
        filiereAbbr
      );

      dispatch(importEtudiantExcelAction(formData));
  };

  const handleImportNoteExcel = (event) => {
    dispatch(clearMessage())
    console.log("filiere: ", filiereAbbr);

    const formData = new FormData();
      formData.append(
        "file",
        event.target.files[0]
      );
      formData.append(
        "filiere",
        filiereAbbr
      );

      dispatch(importNoteExcelAction(formData));
  }

  const handleFiliereChoice = () => {
    console.log("filiere: ", filiere.abbr);
    dispatch(setFiliere(filiere));
    dispatch(getAllEtudiantsAction({ filiere: filiere.abbr, page: 1}));
    navigate("/admin/etudiants", { replace: true });
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
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      onClick={handleFiliereChoice}
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1,
                      }}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary[200],
                        zIndex: 1,
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
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
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                      />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={handleStudentRegister}>
                        <AddIcon sx={{ mr: 1.75 }} /> Ajouter un étudiant
                      </MenuItem>
                      <MenuItem>
                        <label htmlFor={"excelEtudiant"+filiere.abbr} style={{cursor: "pointer"}}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75, mb:-1 }} />  Importer excel des étudiants
                        </label>
                        <input type="file" name={"excelEtudiant"+filiere.abbr} id={"excelEtudiant"+filiere.abbr} hidden={true} onChange={handleStudentRegisterExcel}/>
                      </MenuItem>
                      <MenuItem>
                        <label htmlFor={"excelNote"+filiere.abbr} style={{cursor: "pointer"}}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75, mb:-1 }} />  Importer excel des notes
                        </label>
                        <input type="file" name={"excelNote"+filiere.abbr} id={"excelNote"+filiere.abbr} hidden={true} onChange={handleImportNoteExcel}/>
                      </MenuItem>
                    </Menu>
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
