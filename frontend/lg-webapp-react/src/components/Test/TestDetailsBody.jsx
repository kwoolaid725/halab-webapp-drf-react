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
import TestDetailsTableCR from "./TestDetailsTableCR";

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
  const [openDetails, setOpenDetails] = useState({});


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


  const handleCollapseToggle = (key) => {
    setOpenDetails({
      ...openDetails,
      [key]: !openDetails[key], // Toggle the state for the clicked group
    });
  };

  return (

    <React.Fragment>

      {Object.keys(groupedDetails).map((key, index) => {
        const details = groupedDetails[key];
        const firstDetail = details[0];
        return (
          <div key={index}>
            <Box>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleCollapseToggle(key)}
                  >
                    {openDetails[key] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <Box>
                  <TableContainer component={Paper}>
                    <Table aria-label="fixed table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Test Sample</TableCell>
                          <TableCell align="left">Inventory Number</TableCell>
                          <TableCell align="left">Brush Type</TableCell>
                          <TableCell align="left">Test Case</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        <TableRow key={index}>
                          <TableCell>{firstDetail.sample}</TableCell>
                          <TableCell>{firstDetail.sample}</TableCell>
                          <TableCell>{firstDetail.brush_type}</TableCell>
                          <TableCell>{firstDetail.test_case}</TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableRow>

              {/* Conditionally render TestDetailsTable or TestDetailsTableCR based on testCategory */}
              {test?.test_category === 'CR' && (test?.product_category.startsWith('Stick') || test?.product_category.startsWith('STICK')) ? (
                <Collapse in={openDetails[key]} timeout="auto" unmountOnExit>
                  <TestDetailsTableCR
                    testId={test?.id}
                    sample={firstDetail.sample}
                    brushType={firstDetail.brush_type}
                    tester={props.tester}
                    testCase={firstDetail.test_case}
                  />
                </Collapse>
              ) : (
                <Collapse in={openDetails[key]} timeout="auto" unmountOnExit>
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
          </div>
        );
      })}
    </React.Fragment>
  );
}

