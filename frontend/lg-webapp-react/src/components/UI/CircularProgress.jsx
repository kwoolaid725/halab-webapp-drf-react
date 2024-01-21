// ColoredCircularProgress.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  const calculatePercentage = (value, threshold) => {
    return value >= threshold ? 100 : Math.round((value / threshold) * 100);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10px',
        left: 5
      }}
    >
      <Typography variant="caption" component="div" color="text.secondary" marginBottom="1px" fontWeight="bold" fontSize="12px">
        {props.label}
      </Typography>
      <CircularProgress variant="determinate" value={calculatePercentage(props.count, props.threshold)} sx={{ color: props.color }} />
      <Box
        sx={{
          top: 25,
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
          {props.count}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  threshold: PropTypes.number.isRequired,
};

export default function ColoredCircularProgress({ count, label, color, threshold }) {
  return <CircularProgressWithLabel count={count} label={label} color={color} threshold={threshold} />;
}
