import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TestDetailsTable from './TestDetailsTable';
import TestDetailsHeader from './TestDetailsHeader';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import TestDetailsTableCR from "./TestDetailsTableCR_Cordless";

export default function TestDetailsBody(props) {
  const [openFirst, setOpenFirst] = useState(true);
  const [sampleValue, setSampleValue] = useState('');
  const [invNoValue, setInvNoValue] = useState('');
  const [brushTypeValue, setBrushTypeValue] = useState('');
  const [testCaseValue, setTestCaseValue] = useState('');

  const {id} = useParams();

  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState();

  const { test, testDetails } = props;


  const [groupedDetails, setGroupedDetails] = useState({});

   useEffect(() => {
    if (Array.isArray(testDetails)) {
      const grouped = testDetails.reduce((grouped, detail) => {
        const key = `${detail.sample}${detail.brush_type}${detail.test_case}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(detail);
        return grouped;
      }, {});
      setGroupedDetails(grouped);
    }
  }, [testDetails]);

  useEffect(() => {
    console.log('groupedDetails:', groupedDetails);
  }, [groupedDetails]);


  return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenFirst(!openFirst)}
            >
              {openFirst ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <Box>
             {/*Input fields for sample, Inv. No., Brush Type, and Test Case */}
            <TableContainer component={Paper}>
              <Table aria-label="fixed table">
                <TableHead>
                  <TableRow>
                    <TableCell>Test Sample</TableCell>
                    <TableCell align="left">Inv. No.</TableCell>
                    <TableCell align="left">Brush Type</TableCell>
                    <TableCell align="left">Test Case</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={sampleValue}
                        onChange={(e) => setSampleValue(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={invNoValue}
                        onChange={(e) => setInvNoValue(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={brushTypeValue}
                        onChange={(e) => setBrushTypeValue(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={testCaseValue}
                        onChange={(e) => setTestCaseValue(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Conditionally render TestDetailsTable or TestDetailsTableCR based on testCategory */}
            {test?.test_category === 'CR' && test?.product_category.startsWith('Stick') || test?.product_category.startsWith('STICK') ? (
              <Collapse in={openFirst} timeout="auto" unmountOnExit>
                <TestDetailsTableCR
                  testId={test?.id}
                  sample={sampleValue}
                  brushType={brushTypeValue}
                  tester={props.tester}
                  testCase={testCaseValue}
                />
              </Collapse>
            ) : (
              <Collapse in={openFirst} timeout="auto" unmountOnExit>
                <TestDetailsTable
                  testId={test?.id}
                  sample={sampleValue}
                  brushType={brushTypeValue}
                  tester={props.tester}
                  testCase={testCaseValue}
                />
              </Collapse>
            )}


          </Box>
        </TableRow>
      </Box>
    </React.Fragment>
  );
}

