import React, {useEffect, useState, useRef  } from 'react';
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
import TestDetailsTableCrCordless from "./TestDetailsTableCR_Cordless";
import TestDetailsTableCrRobot from "./TestDetailsTableCR_Robot";
import ColoredCircularProgress from "../UI/CircularProgress";

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
  const [testMeasures, setTestMeasures] = useState(null);

  const [bareSlugs, setBareSlugs] = useState([]);
  const [carpetSlugs, setCarpetSlugs] = useState([]);
  const [edgeSlugs, setEdgeSlugs] = useState([]);

  const [allCountDict, setAllCountDict] = useState({});


   // Use useRef for countDict
  const countDictRef = useRef({});



  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/test-measures.json');
          const jsonData = await response.json();
          setTestMeasures(jsonData);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
      fetchData();
    }, []);

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
        // const key = `${detail.test}${detail.model}${detail.sample}${detail.brush_type}${detail.test_case}`;
        const key = `${detail.sample}${detail.brush_type}${detail.test_case}`.toLowerCase();

        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(detail);
        console.log('key:', key)
        return grouped;
      }, {});
       // Sort groups by their keys
    const sortedGroups = Object.keys(grouped).sort();


    // Sort samples within each group based on created_date
    sortedGroups.forEach((key) => {
      grouped[key].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
    });

    // Create a new object with sorted groups
    const sortedGroupedDetails = {};
      sortedGroups.forEach((key) => {
        sortedGroupedDetails[key] = grouped[key];
      });

      setGroupedDetails(sortedGroupedDetails);
      }
    }, [testDetails]);


     console.log('groupedDetails:', groupedDetails)
     console.log('testMeasures:', testMeasures  )



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
        // Split details.slug by the first '-' and keep the second part
        const slugParts = details.slug.split('-');
        if (slugParts.length > 1) {
          const key = `${details.test_group}-${slugParts.slice(1).join('-')}`;
          const uniqueSlug = key.replace(/\s+/g, '-').toLowerCase();
          uniqueSlugsSet.add(uniqueSlug);
        }
      }
    });

    return Array.from(uniqueSlugsSet);
  };


  const calculateCounts = () => {
  // Initialize counters for each category
    const countDict = {};

    Object.keys(groupedDetails).forEach((key) => {
      const detailsArray = groupedDetails[key];
      const uniqueSlugs = generateUniqueSlugs(detailsArray);

      uniqueSlugs.forEach((uniqueSlug) => {

        const firstHyphenIndex = uniqueSlug.indexOf('-');
        const testGroup = uniqueSlug.substring(0, firstHyphenIndex);
        const testTarget = uniqueSlug.split('-')[1];
        const lastHyphenIndex = uniqueSlug.lastIndexOf('-');
        const secondLastHyphenIndex = uniqueSlug.lastIndexOf('-', lastHyphenIndex - 1);
        const commonSuffix = uniqueSlug.substring(secondLastHyphenIndex + 1, lastHyphenIndex);

        console.log('uniqueSlug:', uniqueSlug);

        if (!countDict[commonSuffix]) {
          countDict[commonSuffix] = {};
        }

        if (!countDict[commonSuffix][testTarget]) {
          countDict[commonSuffix][testTarget] = {};
        }

        if (!countDict[commonSuffix][testTarget][testGroup]) {
          countDict[commonSuffix][testTarget][testGroup] = 0;
        }

        countDict[commonSuffix][testTarget][testGroup]++;
      });
    });

     // Use useRef for countDict
     countDictRef.current = countDict;
    // Log or use the count dictionary as needed
    console.log('Count Dictionary:', countDictRef.current);
  };

// Invoke the calculateCounts function where needed
calculateCounts();


  // Calculate counts when component mounts
  useEffect(() => {
    calculateCounts();
  }, [groupedDetails]);

  // useEffect allCountDict
  // useEffect(() => {
  //   setAllCountDict(allCountDict);
  // }, [allCountDict]);


  const LabeledCircularProgress = ({ count, threshold, label, style }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <Typography variant="body1" fontSize="16px" style={{ fontWeight: 'bold', marginRight: '5px' }}>
        {label}:
      </Typography>
      <ColoredCircularProgress count={count} threshold={threshold} style={style} />
    </div>
  );

  return (

    <React.Fragment>

      {Object.keys(groupedDetails).map((key, index) => {
        const details = groupedDetails[key];
        const firstDetail = details[0];
        const isDetailsOpen = openDetails[key];


         // Add console.log statements here
          console.log('groupedDetails:', groupedDetails);
          console.log('Current key:', key);
          console.log('allCountDict:', countDictRef.current);
          console.log('Bare object:', countDictRef.current[key]?.bare);
          console.log('Sand property:', countDictRef.current[key]?.bare?.sand);


        return (
          <div key={index}>
            <Box
              sx={{
                marginTop: '-20px',
                marginLeft: '10px'
              }}
            >
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
                         <span style={{ color: '#3a606e', fontWeight: 'bold' }}>Sample {index + 1}</span>
                        <KeyboardArrowUpIcon />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span style={{ color: '#3a606e' }}>Sample {index + 1}</span>
                      <KeyboardArrowDownIcon />

                      </React.Fragment>
                    )}
                  </IconButton>
                </TableCell>
                <Box
                  sx={{
                    border: () => {
                      // Get the counts for the current key
                      const bareCount = countDictRef.current[key]?.bare;
                      const bareTotalCount = (bareCount?.sand || 0) + (bareCount?.rice || 0) + (bareCount?.cheerios || 0);

                      console.log('bareTotalCount:', bareTotalCount);

                      const carpetCount = countDictRef.current[key]?.carpet?.sand || 0;
                      const edgeCount = countDictRef.current[key]?.edge?.sand || 0;


                      // Check conditions for changing the border color
                      if (bareTotalCount >= 3 && carpetCount  >= 3 && edgeCount  >= 3) {
                        return '4px solid #03cea4'; // Green border if all counts are 3 or greater
                      } else if (bareTotalCount > 0 || carpetCount > 0 || edgeCount > 0) {
                        return '3px solid #efaac4'; // Yellow border if any count is greater than 0
                      } else {
                        return '1px dotted #ff6978'; // Red border if neither condition is met
                      }
                    },
                    borderRadius: '8px',
                    overflow: 'hidden',
                    mt: 2,
                  }}
                >
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
                            <Typography variant="subtitle2" fontSize="18px" color="#345995">
                              {firstDetail.model}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" fontSize="18px" color="#345995">
                              {firstDetail.sample}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" fontSize="18px" color="#345995">
                              {firstDetail.brush_type}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                             <Typography variant="subtitle2" fontSize="18px" color="#345995">
                              {firstDetail.test_case}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={4} // Adjust the colspan based on the number of columns
                          >
                            {/* Bare Row */}
                        <div style={{ display: 'flex', flexDirection: 'row',  }}>
                          {/* Bare Row */}
                          <div style={{ marginBottom: '10px' }}>
                            <Typography variant="subtitle2" fontSize="14px" textAlign='center' style={{  color: "#345995" }}>
                              Bare
                            </Typography>
                            <div style={{ display: 'flex', marginLeft:'10px'}}>
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
                            <Typography variant="subtitle2" fontSize="14px" textAlign='center' style={{  color: "#345995" }}>
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
                            <Typography variant="subtitle2" fontSize="14px" textAlign='center' style={{  color: "#345995" }}>
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
                            {/*<Typography variant="body1" fontSize="16px">*/}
                            {/*  {`Bare: ${keyCounts[key]?.bareCount || 0}, Carpet: ${keyCounts[key]?.carpetCount || 0}, Edge: ${keyCounts[key]?.edgeCount || 0}`}*/}
                            {/*</Typography>*/}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableRow>

              {/* Conditionally render TestDetailsTable or TestDetailsTableCR based on testCategory */}

              {test?.test_category === 'CR' &&
               (test?.product_category.toLowerCase().includes('stick') && test?.product_category.toLowerCase().includes('cordless')) ? (
                <TableRow>
                  <TableCell colSpan={4}>
                     <Collapse in={isDetailsOpen} timeout="auto" unmountOnExit>
                      <TestDetailsTableCrCordless
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
                 (test?.product_category.toLowerCase().includes('robot')) ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse in={openDetails[key]} timeout="auto" unmountOnExit>
                      <TestDetailsTableCrRobot
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
              )
              )}

            </Box>
          </div>
        );
      })}

    </React.Fragment>
  );
}

