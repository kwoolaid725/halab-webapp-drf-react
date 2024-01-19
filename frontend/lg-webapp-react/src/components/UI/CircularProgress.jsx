// ColoredCircularProgress.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  const calculatePercentage = (value) => {
    return value >= 3 ? 100 : Math.round((value / 3) * 100);// Calculate percentage based on the range [0, 3]
  };

  return (
    // <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
   <Box sx={{ position:'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
      <Typography variant="caption" component="div" color="text.secondary" marginBottom="4px" fontWeight="bold">
        {props.label}
      </Typography>
      <CircularProgress variant="determinate" value={calculatePercentage(props.value)} />
      <Box
        sx={{
          top: 20,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" fontWeight="bold">
          {props.value}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default function ColoredCircularProgress({ count, threshold, color, label }) {
  return (
    <CircularProgressWithLabel value={count} label={label} />
  );
}



