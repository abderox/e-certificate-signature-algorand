import { ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const InfoListItem = (props) => {
    const { primary, secondary } = props
  return (
    <ListItem alignItems="flex-start">
        <ListItemText
        primary={
            <Typography
                fontWeight="bold"
                color="text.primary"
            >
            {primary}
            </Typography>
        }
        secondary={
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                {secondary}
            </Typography>
        }
        />
    </ListItem>
  )
}

export default InfoListItem