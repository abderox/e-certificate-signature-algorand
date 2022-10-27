import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';


export default function ControlledAccordions({ data }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ width: '100%' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: '50%', flexShrink: 0 }}>
                    {Object.keys(data)[0].toUpperCase()}
                </Typography>
                <Typography sx={{ color: '#093170' }}>{Object.values(data)[0]}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: '25vh' }}>
                <Box sx={{ width: '100%', height: '23vh', overflow: 'auto' }}>
                    <Grid container spacing={2}>
                        {Object.entries(data).map(([key, value], idx) => {

                            const style = { height: value.length > 100 ? 100 : 55, overflow: 'auto' }
                            if ((idx + 1) % 2 === 0) {
                                return (
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#f5f5f5' }}>
                                            <ListItem sx={style}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <DoneRoundedIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={key.toUpperCase()} secondary={value.length > 100 ? value.substring(0, 100) : value} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#f5f5f5' }}>
                                            <ListItem sx={style}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <DoneRoundedIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={key.toUpperCase()} secondary={value.length > 100 ? (value.substring(0, 100) + "...") : value} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                )
                            }
                        }
                        )}
                    </Grid>
                </Box>

            </AccordionDetails>
        </Accordion>


    );
}