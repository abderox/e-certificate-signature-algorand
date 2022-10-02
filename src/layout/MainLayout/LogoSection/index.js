import { Link } from 'react-router-dom';
import logo from 'assets/images/auth/uca-logo.png';
// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img src={logo} alt="logo"  height="60" width="50"/>
        {/* <Logo /> */}
    </ButtonBase>
);

export default LogoSection;
