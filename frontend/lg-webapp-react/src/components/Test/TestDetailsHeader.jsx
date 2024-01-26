import React, { useState,useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import theme from '../UI/Theme';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';



import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

import NotesTwoToneIcon from '@mui/icons-material/NotesTwoTone';
import UpdateIcon from '@mui/icons-material/Update';


// Import styled from '@mui/system'
import { styled } from '@mui/system';


    const TEST_STATUS = [
      { value: 'PENDING', label: 'Pending' },
      { value: 'IN_PROGRESS', label: 'In Progress' },
      { value: 'COMPLETED', label: 'Completed' },
    ];

    // Use styled from '@mui/system'
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        borderBottom: '1px solid black',
        fontSize: '16px',
        whiteSpace: 'nowrap',
        // borderTop: 'solid steelblue',
        textAlign: 'left',
        width: '25%',
        backgroundColor: theme.palette.primary.main, // Fix: Access the main property
        color: theme.palette.primary.contrastText,
        '& input': {
            color: theme.palette.primary.contrastText,
        },
        '& label': {
        color: theme.palette.primary.contrastText,
        },
        '& fieldset': {
        borderColor: theme.palette.primary.contrastText,
        },
        '& .MuiInputBase-root': {
        color: theme.palette.primary.contrastText,
        },
        '& .MuiSvgIcon-root': {
        color: theme.palette.primary.contrastText,
        },
        '& .MuiMenuItem-root': {
        color: theme.palette.primary.contrastText,
        },
    }));

    const LeftPanel = styled(Grid)(({ theme }) => ({
      marginBottom: { xs: '10px', md: 0 },
      marginLeft: '10px', // Adjust the left margin as needed
      marginRight: '-20px',
    }));

    const RightPanel = styled(Grid)(({ theme }) => ({
      marginBottom: '10px',
      marginRight: '10px',
      [theme.breakpoints.up('xs')]: {

        marginLeft: '10px',

    },



          // [theme.breakpoints.up('md')]: {
          //   width: '100%', // Adjust the width for medium screens
          // },
          // [theme.breakpoints.up('lg')]: {
          //   width: '100%', // Adjust the width for large screens
          // },
          // [theme.breakpoints.up('xl')]: {
          //   width: '100%', // Adjust the width for extra-large screens
          // },
        }));


    function TestDetailsHeader(props) {
      const navigate = useNavigate();

      // const [testStatus, setTestStatus] = useState(props.testStatus);
      const [isCompletedChecked, setIsCompletedChecked] = useState(props.testStatus === 'COMPLETED');
      const testStatusLabel = TEST_STATUS.find(status => status.value === props.testStatus)?.label;
      // Set the default value of remarksValue to props.remarks
      const [remarksValue, setRemarksValue] = useState();
      const [completionDate, setCompletionDate] = useState(props.completionDate || '');

      useEffect(() => {
        setIsCompletedChecked(props.testStatus === 'COMPLETED');
      }, [props.testStatus]);

      useEffect(() => {
        setRemarksValue(props.remarks || '');
      }, [props.remarks]);

       useEffect(() => {
        setCompletionDate(props.completionDate || '');
      }, [props.completionDate]);

       // useEffect(() => {
       //    if (isCompletedChecked) {
       //      // Set completion date to current date when status is COMPLETED
       //      setCompletionDate(new Date().toLocaleDateString());
       //    } else {
       //      setCompletionDate(props.completionDate || '');
       //    }
       //    console.log('completionDate:', completionDate);
       //  }, [isCompletedChecked, props.completionDate]);

      let statusIcon;

      switch (props.testStatus) {
        case 'PENDING':
            statusIcon = <PendingOutlinedIcon style={{ color: '#e71d36' }} />;
            break;
        case 'IN_PROGRESS':
            statusIcon = <RotateLeftTwoToneIcon style={{ color: 'yellow' }} />;
            break;
        case 'COMPLETED':
            statusIcon = <DoneAllRoundedIcon style={{ color: '#9ef01a' }} />;
            break;
        default:
            statusIcon = null;

      }


     const handleCheckboxClick = () => {
        setIsCompletedChecked((prevIsCompletedChecked) => !prevIsCompletedChecked);
      };

      const handleRemarksChange = (event) => {
        // Update remarksValue state when TextField value changes
        setRemarksValue(event.target.value);
      };

      const handleButtonSubmit = () => {
        // Make sure to update this endpoint and payload structure according to your API
        const newTestStatus = isCompletedChecked ? 'COMPLETED' : 'IN_PROGRESS';
        const remarks = remarksValue;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const newCompletionDate = isCompletedChecked ? formattedDate : props.completionDate;

        axiosInstance.patch(`admin/tests/edit/${props.testId}/`, { test_status: newTestStatus, remarks, completion_date: newCompletionDate })
          .then((res) => {
            console.log('Test status updated to', newTestStatus);
            navigate('/admin/tests/');
            // You may want to update your local state or perform other actions upon success
          })
          .catch((error) => {
            console.error("Error updating test status: ", error);
            // Handle error, show a notification, etc.
          });
      };



      return (
         <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
            {/* Left Panel */}
            <LeftPanel item xs={12} md="auto">
              {/* First row: Test Category, Product Category */}
              <TableRow>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'right',


                  }}
                  colSpan={1}
                >
                  Test Category :
               </StyledTableCell>
                <StyledTableCell
                    colSpan={1}>{props.testCategory}</StyledTableCell>

                <StyledTableCell
                  sx={{
                    width: '75%',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'right',


                  }}
                  colSpan={2}
                >
                  Product Category :
               </StyledTableCell>
                <StyledTableCell
                     colSpan={5}>{props.productCategory}</StyledTableCell>
                {/*<StyledTableCell colSpan={1}></StyledTableCell>*/}
              </TableRow>

              {/* Second row: Test No., Description */}
              <TableRow>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    // borderBottom: 'solid steelblue',
                    fontSize: '18px'
                  }}
                  colSpan={1}
                >
                  Test No. :
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderTop: 'None',
                  }}
                    colSpan={1}>{props.testId}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'right',

                  }}
                  colSpan={2}
                >
                  Description :
               </StyledTableCell>
                <StyledTableCell
                     colSpan={5}>{props.description}</StyledTableCell>
              </TableRow>

              {/* Third row: Test Status, Due Date, Completion Date */}
              <TableRow>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    borderBottom: 'solid steelblue',
                    fontSize: '18px'
                  }}
                  colSpan={1}
                >
                  Test Status :
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderTop: 'None',
                    borderBottom: 'solid steelblue',
                    }}
                    colSpan={1}>


                 {statusIcon} {testStatusLabel}

                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    borderBottom: 'solid steelblue',
                    fontSize: '18px'
                  }}
                  colSpan={2}
                >
                  Due Date :
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderTop: 'None',
                    borderBottom: 'solid steelblue',
                  }}
                    colSpan={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="date"
                    value={props.dueDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: '50%',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    borderBottom: 'solid steelblue',
                    fontSize: '18px'
                  }}
                  colSpan={2}
                >
                  Completion Date :
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderTop: 'None',
                    borderBottom: 'solid steelblue',
                  }} colSpan={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="date"
                    value={props.completionDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderTop: 'None',
                    borderBottom: 'solid steelblue',
                  }} colSpan={1}></StyledTableCell>
              </TableRow>



            </LeftPanel>

            {/* Right Panel */}
              <RightPanel item xs={12} sm md >
                {/* Remarks header */}
                <TableRow>
                  <StyledTableCell
                    sx={{
                      width: '25%',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      borderBottom: 'None',
                      fontSize: '18px',
                        marginTop: '0px', // Explicitly set marginTop
                      // marginBottom: '5px', // Adjust the marginBottom to reduce the space
                    }}
                    colSpan={4} // Adjust the colspan to match the number of columns
                  >
                    <NotesTwoToneIcon /> Test Summary :
                  </StyledTableCell>
                </TableRow>

                {/* Fourth row: Remarks */}
                <TableRow>
                  <StyledTableCell
                   sx={{
                        borderTop: 'None',
                        borderBottom: 'solid steelblue',
                        }}
                    colSpan={4} // Adjust the colspan to match the number of columns
                  >
                    <TextField
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={2.7} // Adjust the number of rows based on your preference
                      value={remarksValue}
                      onChange={handleRemarksChange}
                    />
                  </StyledTableCell>
                </TableRow>
                  {/* Checkbox and Button row */}

                <TableRow
                  sx={{
                    // height: '40px', // Adjust the height based on your preference
                  }}
                >
                  <TableCell
                    sx={{
                      width: '45%',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      borderBottom: 'None',
                      fontSize: '18px',
                      whiteSpace: 'revert',
                      verticalAlign: 'top', // Adjust the vertical alignment
                      color: '#023047',
                    }}
                    colSpan={1}
                  >
                    <Button
                      // disabled
                      variant="contained"
                      color="primary"
                      style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          backgroundColor: '#ffff',
                          color: 'black',
                          marginRight:'0px',
                          // paddingRight: '0px', // Adjust the right padding to reduce space
                          // textAlign: 'right', // Align the text to the right
                          // padding: '8px 16px', // Adjust padding for better aesthetics
                          cursor: 'not-allowed', // Set cursor to 'not-allowed' when disabled
                          // opacity: 0.7, // Reduce opacity for a visually disabled look
                          pointerEvents: 'none', }}
                    >
                      Mark as Complete:
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '5%',
                      textAlign: 'left',
                      borderBottom: 'None',
                      verticalAlign: 'top',
                      // marginTop: '0px',
                      padding: '10px 0px 0px 0px',
                    }}

                  colSpan={1}
                  >

                    <Checkbox
                      checked={isCompletedChecked}
                      onChange={handleCheckboxClick}
                      color="primary"
                      size="large"
                      sx={{
                            marginLeft: '-25px', // Adjust the marginLeft for the Checkbox
                        }}
                    />
                  </TableCell>
                    <TableCell
                     sx={{
                        width: '5%',
                      borderBottom: 'None',

                      // marginTop: '0px',
                      padding: '0px 0px 0px 0px',
                    }}
                    colSpan={1}
                    >

                    </TableCell>

                  <TableCell
                    sx={{
                      width: '100%',
                      borderBottom: 'None',
                      verticalAlign: 'top',
                      marginTop: '0px', // Explicitly set marginTop
                        // marginLeft: '50px', // Adjust the marginLeft to reduce the space
                    }}
                    colSpan={1}
                  >
                    <Button
                      onClick={handleButtonSubmit}
                      startIcon={<UpdateIcon style={{ fontWeight: 'bold', fontSize: '24px', color: '#38a3a5',  }} />}
                      variant="contained"
                      color="primary"
                      style={{ fontWeight: 'bold', fontSize: '16px', backgroundColor: '#f9f9f9', color: '#38a3a5', border: '1px solid #38a3a5', marginRight: '0px' }}
                    >
                      Submit Changes
                    </Button>
                  </TableCell>
                </TableRow>
              </RightPanel>
          </Grid>
        </ThemeProvider>
      );
    }

export default TestDetailsHeader;
