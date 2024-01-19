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
    }));

    const RightPanel = styled(Grid)(({ theme }) => ({
      marginBottom: '10px',
      marginLeft: '-15px', // Adjust the negative margin to minimize the gap
    }));

    function TestDetailsHeader(props) {
      const navigate = useNavigate();

      const [testStatus, setTestStatus] = useState(props.testStatus);
      const [isCompletedChecked, setIsCompletedChecked] = useState(props.testStatus === 'COMPLETED');
      const testStatusLabel = TEST_STATUS.find(status => status.value === props.testStatus)?.label;
      const [remarksValue, setRemarksValue] = useState(''); // Add remarksValue state

      useEffect(() => {
        setIsCompletedChecked(testStatus === 'COMPLETED');
      }, [testStatus]);

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
          let newStatus;
          if (isCompletedChecked) {
            newStatus = 'IN_PROGRESS';
          } else {
            newStatus = testStatus === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          }
          setTestStatus(newStatus);
          console.log('newStatus:', newStatus);
          setIsCompletedChecked(!isCompletedChecked);
        };

      const handleRemarksChange = (event) => {
        // Update remarksValue state when TextField value changes
        setRemarksValue(event.target.value);
      };

      const handleButtonSubmit = () => {
        // Make sure to update this endpoint and payload structure according to your API
        const newTestStatus = isCompletedChecked ? 'COMPLETED' : 'IN_PROGRESS';
        const remarks = remarksValue;

        axiosInstance.patch(`admin/tests/edit/${props.testId}/`, { test_status: newTestStatus, remarks })
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
            <RightPanel item xs={12} md lg xl>
              {/* Remarks header */}
              <TableRow>
                <StyledTableCell
                  sx={{
                    width: '75%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: 'None',
                    fontSize: '18px'
                  }}
                  colSpan={2}
                >
                  <NotesTwoToneIcon /> Remarks :
                </StyledTableCell>

                <StyledTableCell colSpan={1}>
                   Mark as Completed :
                  <Checkbox
                    checked={isCompletedChecked}
                    onChange={handleCheckboxClick}
                    color="primary"
                  />


                </StyledTableCell>


              </TableRow>

              {/* Fourth row: Remarks */}
              <TableRow>
                <StyledTableCell
                    sx={{
                    borderBottom: 'solid steelblue',
                  }}
                    colSpan={2}
                     >
                  <TextField
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={2.2}
                    value={remarksValue} // Controlled component using state
                    onChange={handleRemarksChange} // Handle TextField value change
                  />
                </StyledTableCell>
                <StyledTableCell
                    sx={{
                    borderBottom: 'solid steelblue',
                  }}
                    colSpan={2}
                     >
                   <Button onClick={handleButtonSubmit} startIcon={<UpdateIcon />} variant="contained" color="primary">
                    Submit
                  </Button>
                </StyledTableCell>



              </TableRow>


            </RightPanel>
          </Grid>
        </ThemeProvider>
      );
    }

export default TestDetailsHeader;
