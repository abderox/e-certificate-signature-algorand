import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapperForm = ({ children, ...other }) => (
    <MainCard
        sx={{
            minWidth: { lg: 900 , md: 800},
            maxWidth: { lg: 1000 },
            margin: { xs: 2, md: 2 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);

AuthCardWrapperForm.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapperForm;
