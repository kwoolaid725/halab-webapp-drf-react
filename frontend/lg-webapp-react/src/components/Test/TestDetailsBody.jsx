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
import Typography from '@mui/material/Typography';
import TestDetailsTable from './TestDetailsTable';
import TestDetailsHeader from './TestDetailsHeader';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import TestDetailsTableCR from "./TestDetailsTableCR";

import classes from './TestDetailsBody.module.css';

export default function TestDetailsBody(props) {
  const { test } = props;
  const [testDetails, setTestDetails] = useState();
  const [openDetails, setOpenDetails] = useState({});
  const [groupedDetails, setGroupedDetails] = useState({});
  const [totalBareCount, setTotalBareCount] = useState(0);
  const [totalCarpetCount, setTotalCarpetCount] = useState(0);
  const [totalEdgeCount, setTotalEdgeCount] = useState(0);
  const [keyCounts, setKeyCounts] = useState({});

  //


  useEffect(() => {
    // Fetch data and update state
    const fetchData = async () => {
      try {
        // Fetch test details
        const response = await axiosInstance(`/admin/tests/vacuum/testdetail/${test?.id}/`);
        setTestDetails(response.data);


      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors appropriately
      }
    };

    fetchData();
  }, [test?.id]);




   useEffect(() => {
    if (Array.isArray(testDetails)) {
      const grouped = testDetails.reduce((grouped, detail) => {
        const key = `${detail.test}${detail.model}${detail.sample}${detail.brush_type}${detail.test_case}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(detail);
        return grouped;
      }, {});
      setGroupedDetails(grouped);
    }
  }, [testDetails]);


   console.log('groupedDetails:', groupedDetails)



   const handleCollapseToggle = (key) => {
    setOpenDetails((prevOpenDetails) => {
      const updatedOpenDetails = {
        ...prevOpenDetails,
        [key]: !prevOpenDetails[key],
      };
      return updatedOpenDetails;
    });
  };

  const generateUniqueSlugs = (detailsArray) => {
    const uniqueSlugsSet = new Set();

    detailsArray.forEach((details) => {
      // Exclude cases where details.test_group is not "Select Test Group"
      if (details.test_group !== "Select Test Group") {
        const key = `${details.slug}`;
        const uniqueSlug = key.replace(/\s+/g, '-').toLowerCase();
        uniqueSlugsSet.add(uniqueSlug);
      }
    });

    return Array.from(uniqueSlugsSet);
  };
  const calculateCounts = () => {
    // Initialize counters for each key
    const keyCounts = {};

    Object.keys(groupedDetails).forEach((key) => {
      const detailsArray = groupedDetails[key];
      let bareCount = 0;
      let carpetCount = 0;
      let edgeCount = 0;

      const uniqueSlugs = generateUniqueSlugs(detailsArray);

      uniqueSlugs.forEach((uniqueSlug) => {
        bareCount += (uniqueSlug.match(/bare/gi) || []).length;
        carpetCount += (uniqueSlug.match(/carpet/gi) || []).length;
        edgeCount += (uniqueSlug.match(/edge/gi) || []).length;
      });

      // Store counts for the current key
      keyCounts[key] = {
        bareCount,
        carpetCount,
        edgeCount,
      };
    });

    // Update state with the counts for each key
    setKeyCounts(keyCounts);
  };

  // Calculate counts when component mounts
  useEffect(() => {
    calculateCounts();
  }, [groupedDetails]);




  return (

    <React.Fragment>

      {Object.keys(groupedDetails).map((key, index) => {
        const details = groupedDetails[key];
        const firstDetail = details[0];
        const isDetailsOpen = openDetails[key];


        return (
          <div key={index}>
            <Box>
              <TableRow
                  sx={{ '& > *': { borderBottom: 'unset' }}}
                  style={{ width: '90%' }}>

                <TableCell style={{ width: '10%' }}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleCollapseToggle(key)}
                  >
                    {isDetailsOpen ? (
                      <React.Fragment>
                          Sample {index + 1}
                        <KeyboardArrowUpIcon />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        Sample {index + 1}
                        <KeyboardArrowDownIcon />

                      </React.Fragment>
                    )}
                  </IconButton>
                </TableCell>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', mt: 2 }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="fixed table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{ width: '20%' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Test Sample
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ width: '20%' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Inventory Number
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ width: '20%' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Brush Type
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ width: '20%' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Test Case
                            </Typography>
                          </TableCell>
                           <TableCell align="center" sx={{ width: '20%' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Completed Runs
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Typography variant="body1" fontSize="16px">
                              {firstDetail.model}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" fontSize="16px">
                              {firstDetail.sample}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" fontSize="16px">
                              {firstDetail.brush_type}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body1" fontSize="16px">
                              {firstDetail.test_case}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={4} // Adjust the colspan based on the number of columns
                          >
                            <Typography variant="body1" fontSize="16px">
                              {`Bare: ${keyCounts[key]?.bareCount || 0}, Carpet: ${keyCounts[key]?.carpetCount || 0}, Edge: ${keyCounts[key]?.edgeCount || 0}`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableRow>

              {/* Conditionally render TestDetailsTable or TestDetailsTableCR based on testCategory */}

              {test?.test_category === 'CR' && (test?.product_category.startsWith('Stick') || test?.product_category.startsWith('STICK')) ? (
                <TableRow>
                  <TableCell colSpan={4}>
                     <Collapse in={isDetailsOpen} timeout="auto" unmountOnExit>
                      <TestDetailsTableCR
                        testId={test?.id}
                        model={firstDetail.model}
                        sample={firstDetail.sample}
                        brushType={firstDetail.brush_type}
                        tester={props.tester}
                        testCase={firstDetail.test_case}
                      />
                    </Collapse>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse in={openDetails[key]} timeout="auto" unmountOnExit>
                      <TestDetailsTable
                        testId={test?.id}
                        // sample={sampleValue}
                        // brushType={brushTypeValue}
                        tester={props.tester}
                        // testCase={testCaseValue}
                      />
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </Box>
          </div>
        );
      })}

    </React.Fragment>
  );
}

