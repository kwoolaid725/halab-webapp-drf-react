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
import TestDetailsCountBoxCordless from "./CR/TestDetailsCountBox_Cordless";

import classes from './TestDetailsBody.module.css';

export default function TestDetailsBody(props) {
  const { test } = props;
  const [testDetails, setTestDetails] = useState();
  const [openDetails, setOpenDetails] = useState({});
  const [groupedDetails, setGroupedDetails] = useState({});



   // Use useRef for countDict
  const countDictRef = useRef({});




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
    let bareCount = 0; // Initialize bareCount for each uniqueSlug set
    let carpetCount = 0; // Initialize carpetCount for each uniqueSlug set

    uniqueSlugs.forEach((uniqueSlug) => {
      if (props.productCategory.toLowerCase().includes('stick') && props.productCategory.toLowerCase().includes('cordless')) {
        // Your existing logic for parsing unique slugs

        const firstHyphenIndex = uniqueSlug.indexOf('-');
        const testGroup = uniqueSlug.substring(0, firstHyphenIndex);
        const testTarget = uniqueSlug.split('-')[1];

        console.log('uniqueSlug:', uniqueSlug);

        if (!countDict[key]) {
          countDict[key] = {};
        }

        if (!countDict[key][testTarget]) {
          countDict[key][testTarget] = {};
        }

        if (!countDict[key][testTarget][testGroup]) {
          countDict[key][testTarget][testGroup] = 0;
        }

        countDict[key][testTarget][testGroup]++;
      }
      if (props.productCategory.toLowerCase().includes('robot')) {
        // Your existing logic for parsing unique slugs
        const testTarget = uniqueSlug.split('-')[1];
        console.log('uniqueSlug:', uniqueSlug);

        if (!countDict[key]) {
          countDict[key] = {}; // Create the outer key if it doesn't exist
        }

        if (testTarget.includes('bare')) {
          // Increment countDict['bare'] for every 3 occurrences of 'bare'
          console.log('detailsArray:', detailsArray)
          // Check if test_measure is not an empty string for any element in detailsArray
          if (detailsArray.some((detail) => detail.test_measure === "Pickup" && detail.value !== null)) {
            // Increment countDict['bare'] for every 3 occurrences of 'bare'
            bareCount++;
            if (bareCount % 3 === 0) {
              countDict[key]['bare'] = (countDict[key]['bare'] || 0) + 1;
            }
          }
        } else if (testTarget.includes('carpet')) {
          // Increment countDict['carpet'] for every 4 occurrences of 'carpet'
          carpetCount++;
          if (carpetCount % 4 === 0) {
            countDict[key]['carpet'] = (countDict[key]['carpet'] || 0) + 1;
          }
        }
      }
    });
  });

  // Use useRef for countDict
  countDictRef.current = countDict;
  // Log or use the count dictionary as needed
  console.log('Count Dictionary:', countDictRef.current);
};




// Invoke the calculateCounts function where needed
  calculateCounts();


  const getBorderStyle = (category, counts) => {
    if (category.toLowerCase().includes('stick') && category.toLowerCase().includes('cordless')) {
      const bareCount = counts?.bare;
      const bareTotalCount = (bareCount?.sand || 0) + (bareCount?.rice || 0) + (bareCount?.cheerios || 0);

      const carpetCount = counts?.carpet?.sand || 0;
      const edgeCount = counts?.edge?.sand || 0;

      // Check conditions for changing the border color
      if (bareCount?.sand >= 3 && bareCount?.rice >= 3 && bareCount?.cheerios && carpetCount  >= 3 && edgeCount  >= 3) {
        return '4px solid #03cea4'; // Green border if all counts are 3 or greater
      } else if (bareTotalCount > 0 || carpetCount > 0 || edgeCount > 0) {
        return '3px solid #efaac4'; // Yellow border if any count is greater than 0
      } else {
        return '1px dashed #ff6978'; // Red border if neither condition is met
      }
    } else if (category.toLowerCase().includes('robot')) {
      const bareCount = counts?.bare || 0;


      const carpetCount = counts?.carpet || 0;


      // Check conditions for changing the border color
      if (bareCount >= 3 &&  carpetCount  >= 3 ) {
        return '4px solid #03cea4'; // Green border if all counts are 3 or greater
      } else if (bareCount > 0 || carpetCount > 0 ) {
        return '3px solid #efaac4'; // Yellow border if any count is greater than 0
      } else {
        return '1px dashed #ff6978'; // Red border if neither condition is met
      }
    } else {

    // Default style if no matching category
    return '2px solid #ccc';
    }
  };

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
                    border: getBorderStyle(props.productCategory, countDictRef.current[key]),
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
                            {props.productCategory.toLowerCase().includes('stick') && props.productCategory.toLowerCase().includes('cordless') ? (
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
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {/* Bare Row */}
                                <div style={{ marginBottom: '10px', width: '50%', boxSizing: 'border-box', paddingLeft: '75px' }}>
                                  <Typography variant="subtitle2" fontSize="14px" textAlign="center" style={{ color: '#345995', marginBottom: '0px' }}>
                                    Bare
                                  </Typography>
                                  <div style={{ display: 'flex', marginLeft: '10px' }}>
                                    <ColoredCircularProgress
                                      count={countDictRef.current[key]?.bare || 0}
                                      threshold={3}
                                      label=""
                                      style={{ fontWeight: 'bold', marginRight: '10px'}}
                                      color={'#db5375'}
                                      updateBoxStyles={(count) => ({ top: count > 0 ? 0 : 0 })}
                                    />
                                  </div>
                                </div>

                                {/* Carpet Row */}
                               <div style={{ marginBottom: '10px', width: '50%', boxSizing: 'border-box', marginRight:'50px', paddingRight:'30px', paddingLeft:'30px' }}>
                                  <Typography variant="subtitle2" fontSize="14px" textAlign="center" style={{ color: '#345995' }}>
                                    Carpet
                                  </Typography>
                                  <div style={{ display: 'flex' }}>
                                    <ColoredCircularProgress
                                      count = {countDictRef.current[key]?.carpet || 0}
                                      threshold={3}
                                      label=""
                                      style={{ fontWeight: 'bold', marginRight: '10px' }}
                                      color={'#73bfb8'}
                                      updateBoxStyles={(count) => ({ top: count > 0 ? 0 : 0 })}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableRow>

              {/* Conditionally render TestDetailsTable or TestDetailsTableCR based on testCategory */}

              {/*{test?.test_category === 'CR' &&*/}
              {props.productCategory.toLowerCase().includes('stick') && props.productCategory.toLowerCase().includes('cordless') ? (
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
                 (props.productCategory.toLowerCase().includes('robot')) ? (
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

