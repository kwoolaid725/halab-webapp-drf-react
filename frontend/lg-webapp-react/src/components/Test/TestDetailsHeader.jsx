import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import theme from '../UI/Theme';
import { ThemeProvider } from '@mui/material/styles';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import RotateLeftTwoToneIcon from '@mui/icons-material/RotateLeftTwoTone';
import PendingIcon from '@mui/icons-material/Pending';

import NotesTwoToneIcon from '@mui/icons-material/NotesTwoTone';

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

    const testStatusLabel = TEST_STATUS.find(status => status.value === props.testStatus)?.label;

    let statusIcon;

    switch (props.testStatus) {
        case 'PENDING':
          statusIcon = <PendingIcon color="red" />;
          break;
        case 'IN_PROGRESS':
          statusIcon = <RotateLeftTwoToneIcon color="blue" />;
          break;
        case 'COMPLETED':
          statusIcon = <DoneOutlineIcon color="green" />;
          break;
        default:
          statusIcon = null;
    }

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
                  Remarks :
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
                  <TextField variant="outlined" multiline fullWidth rows={2.95} />
                </StyledTableCell>
              </TableRow>
            </RightPanel>
          </Grid>
        </ThemeProvider>
      );
    }

export default TestDetailsHeader;
