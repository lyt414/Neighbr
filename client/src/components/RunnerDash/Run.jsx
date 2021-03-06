/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Run(props) {
  const { run, setRun } = props;
  const { location, date, startTime, endTime, transportation } = run;
  return (
    <Card
      onClick={() => setRun(run)}
      elevation={4}
      sx={{
        bgcolor: 'secondary.main',
        color: 'white',
        '&:hover': {
          bgcolor: 'secondary.light'
        },
      }}
    >
      <CardContent>
        <Grid container direction="column">
          <Grid item container direction="row" justifyContent="space-between" spacing="2">
            <Typography width="50%" variant="h5">{`${location.placeText}`}</Typography>
            <Typography variant="h5">{`by: ${transportation}`}</Typography>
          </Grid>
          <Typography variant="body2">{`Start: ${new Date(startTime).toLocaleTimeString()} End: ${new Date(endTime).toLocaleTimeString()}`}</Typography>
          <Typography variant="body2">{`Date: ${new Date(date).toLocaleDateString()}`}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Run.propTypes = {
//   run: propTypes.shape({
//     location: propTypes.string.isRequired,
//     date: propTypes.instanceOf(Date).isRequired,
//     startTime: propTypes.instanceOf(Date).isRequired,
//     endTime: propTypes.instanceOf(Date).isRequired,
//     transportation: propTypes.string.isRequired,
//   }).isRequired,
// };
