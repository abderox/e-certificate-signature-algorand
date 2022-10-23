import React from 'react'

const UnsignedCertificates = () => {
  return (
    <div>
        {
            etudiants.map((etudiant, index) => {
                return (
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        key={etudiant._id}
                        sx={{ m: { xs: 1, sm: 2 }, mb: 0 }}>
                            <Grid item xs={1/2}>
                                <Checkbox checked={checked[index] ? checked[index] : false} onChange={(e) => handleChangeChildCheck(e, index)} />
                            </Grid>
                            <Grid item xs={11}>
                                <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {etudiant.user.nom}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {etudiant.user.prenom}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {etudiant.user.email}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                    </Grid>
                )
            })
        }
    </div>
  )
}

export default UnsignedCertificates