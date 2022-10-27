import * as React from 'react';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ControlledAccordions from 'ui-component/accordion-verification';
import Alert from '@mui/material/Alert';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import PolicyIcon from '@mui/icons-material/Policy';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGeneralInfoAction } from 'store/verificationAction';
const reactPdf = require('react-pdf/dist/esm/entry.webpack5')
import useMediaQuery from '@mui/material/useMediaQuery';
import  styled_ from "@emotion/styled";

const { Document, Page } = reactPdf;



const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
});

const DocumentWrapper = styled_.div`
  canvas {
    border: 1px solid #ccc;
    margin : auto ;
    right : 0;
    left : 0;
    top : 0;
  }
`;

export default function VerificationPage() {

    const data = useSelector((state) => state.verification.generalInfo);
    const dispatch = useDispatch();
    const [data_, setdata_] = React.useState({});
    const [loading, setloading] = React.useState(true);
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const search = useLocation().search;
    const hash = new URLSearchParams(search).get('hash');
    const matches = useMediaQuery('(min-width:600px)');
    const matchesSM = useMediaQuery('(min-width:600px)');
    const right = matches ? '33%' : '-1%';
    const bringCertif = "http://localhost:7000/api/process/get-certificate?hash=";


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    React.useEffect(() => {

        const feed = (hash) => {
            dispatch(getGeneralInfoAction(hash)).then((res) => {
                console.log(res)
                setdata_(res);
                setloading(false);
            });
        }

        setloading(true);
        console.log(data)
        if (data) {
            setdata_(data);
            setloading(false);
        }
        else {
            feed(hash);
        }

    }, [hash])




    return (

        <Container maxWidth="md" >
            <Box display="flex" minHeight="100vh"  alignItems="center" justifyContent="center" m="auto" flexDirection="column" >
                {!loading && data_ && data_?.certificat?.txnHash && <Box sx={{ width: '90%', mb: 2 }} >
                    <Alert variant="outlined" severity="info" color="info" >

                        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                            Txn : <Link to={'/'} replace={true} style={{ textDecoration: 'none' }}>{data_.certificat.txnHash}</Link>
                        </Typography>


                    </Alert>

                </Box>
                }

                {!loading && data_ && 
                <>
                <Card sx={{ maxWidth: 1080, backgroundColor: "#edf6f9", minHeight: '60vh', position: 'relative' , overflow : 'visible'}} >

                    <CardMedia
                        component="img"
                        height="300"
                        image="https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                        alt="."

                        sx={{borderRadius : '10px 10px 0 0'}}
                    />


                    <CardContent key={"kkkf"} sx={{minHeight : '40vh'}}>
                        <Box display="flex" alignItems="center" justifyContent="center" m="auto" flexDirection="column" sx={{minHeight : '38vh'}}>
                            <Typography gutterBottom variant="h2" component="div" sx={{ pb: 2, pt: 0, color: '#093170', textTransform: 'uppercase' }} color="dark">
                                Informations générales
                            </Typography>
                            <ControlledAccordions data={data_?.student} />
                            <ControlledAccordions data={data_?.filiere} />
                            <Divider variant="middle" sx={{ bgcolor: "secondary" }} />
                            <Link to={`/etudiant/student-profile?code=${data_?.student?.code_apogee}`} style={{ textDecoration: 'none', marginTop: '3%' }}>
                                <Button startIcon={<AccountCircleIcon sx={{ height: 32, width: 32 }} />} >
                                    Visiter le profile pour plus d'informations
                                </Button>
                            </Link>
                            <Divider />
                        </Box>
                    </CardContent>
                    <Box display="flex" justifyContent="center" sx={{ pb: 3 }}>

                        <NoMaxWidthTooltip title={"Si vous avez la certificat en format pdf , vous pouver l'attacher et attender la vérification"}>
                            <Button startIcon={<FilePresentIcon sx={{ height: 48, width: 38 }} />} color="dark">
                                Attacher Certification (pdf)
                            </Button>
                        </NoMaxWidthTooltip>
                        <NoMaxWidthTooltip title={"Vous pouvez vérifier l'authenticité de la certification en cliquant sur ce bouton  "}>
                            <Button startIcon={<PolicyIcon sx={{ height: 48, width: 38 }} />} color="dark">
                                Vérifier authenticité
                            </Button>
                        </NoMaxWidthTooltip>

                        <NoMaxWidthTooltip title={"Si vous souhaitez télécharger la certificat en format pdf , vous pouver cliquer sur le bouton ci-dessous "}>
                            <a href={bringCertif + data_.certificat.fileName} target={'_blank'} style={{ textDecoration: 'none' }} download>
                                <Button startIcon={<DownloadForOfflineIcon sx={{ height: 48, width: 38 }} />} color="dark" >
                                    Télécharger certification (pdf)
                                </Button>
                            </a>
                        </NoMaxWidthTooltip>


                    </Box>
                   


                    <Box sx={{position : 'absolute' , justifyContent : 'center' , alignItems : 'center' , margin :'auto' , right: 0, left :0 , top : '-5%'}}>
                    <DocumentWrapper>
                        <Document file={bringCertif + data_.certificat.fileName} onLoadSuccess={onDocumentLoadSuccess} options={options} >
                            <Page pageNumber={pageNumber} height={matches ? 300 : 200} width={matches ? 600 : 400} />
                        </Document>
                    </DocumentWrapper>
                    </Box>
                </Card>
                 <Box display="flex" justifyContent="center" sx={{ pb: 3 , position : 'fixed' , bottom :0 }}> 
                 <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                 Tous droits réservés <Link to={'/'} replace={true} style={{ textDecoration: 'none' }}>Université Cadi Ayyaad</Link>
                 </Typography>
             </Box>
             </>
                }
            </Box >
        </Container >

    );
}