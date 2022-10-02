
// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
 import logo from 'assets/images/auth/app-logo.png';
// ==============================|| LOGO SVG ||============================== //

const LogoApp = () => {
    

    return (
        <img src={logo} alt="app-logo" width="115" />
    );
};

export default LogoApp;
