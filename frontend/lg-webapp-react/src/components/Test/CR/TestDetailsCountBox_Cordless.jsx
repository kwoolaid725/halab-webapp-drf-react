// TestDetailsBox.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ColoredCircularProgress from '../../UI/CircularProgress';

const TestDetailsCountBoxCordless = ({ key, countDictRef }) => {
  const bareCount = countDictRef.current[key]?.bare;
  const bareTotalCount = (bareCount?.sand || 0) + (bareCount?.rice || 0) + (bareCount?.cheerios || 0);

  const carpetCount = countDictRef.current[key]?.carpet?.sand || 0;
  const edgeCount = countDictRef.current[key]?.edge?.sand || 0;


  return (
    <Box>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Bare Row */}
        <div style={{ marginBottom: '10px' }}>
          <Typography variant="subtitle2" fontSize="14px" textAlign="center" style={{ color: '#345995' }}>
            Bare
          </Typography>
          <div style={{ display: 'flex', marginLeft: '10px' }}>
            <ColoredCircularProgress
              count={countDictRef.current[key]?.bare?.sand || 0}
              threshold={3}
              label="Sand"
              style={{ fontWeight: 'bold' }}
              color={'#db5375'}
            />

            <ColoredCircularProgress
              count={countDictRef.current[key]?.bare?.rice || 0}
              threshold={3}
              label="Rice"
              style={{ fontWeight: 'bold' }}
              color={'#db5375'}
            />

            <ColoredCircularProgress
              count={countDictRef.current[key]?.bare?.cheerios || 0}
              threshold={3}
              label="Cheerios"
              style={{ fontWeight: 'bold' }}
              color={'#db5375'}
            />
          </div>
        </div>

        {/* Carpet Row */}
        <div style={{ marginBottom: '10px' }}>
          <Typography variant="subtitle2" fontSize="14px" textAlign="center" style={{ color: '#345995' }}>
            Carpet
          </Typography>
          <div style={{ display: 'flex' }}>
            <ColoredCircularProgress
              count={countDictRef.current[key]?.carpet?.sand || 0}
              threshold={3}
              label="Sand"
              style={{ fontWeight: 'bold', marginRight: '10px' }}
              color={'#73bfb8'}
            />
          </div>
        </div>

        {/* Edge Row */}
        <div>
          <Typography variant="subtitle2" fontSize="14px" textAlign="center" style={{ color: '#345995' }}>
            Edge
          </Typography>
          <div style={{ display: 'flex' }}>
            <ColoredCircularProgress
              count={countDictRef.current[key]?.edge?.sand || 0}
              threshold={3}
              label="Sand"
              style={{ fontWeight: 'bold', marginRight: '10px' }}
              color={'#ff6b35'}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TestDetailsCountBoxCordless;
