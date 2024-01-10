import React, {useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

import TestDetailsTableCR from "./TestDetailsTableCR";
import TestDetailsTable from "./TestDetailsTable";
import axiosInstance from "../../axios";


export default function TestDetailsAddModal (props) {

	const navigate = useNavigate();
	const [sampleValue, setSampleValue] = useState('');
    const [invNoValue, setInvNoValue] = useState('');
    const [brushTypeValue, setBrushTypeValue] = useState('');
    const [testCaseValue, setTestCaseValue] = useState('');

    const [allSamples, setAllSamples] = useState([]);
    const handleSubmit = (e) => {

        const slug = `${props.testId}-Bare-${sampleValue}${brushTypeValue}${testCaseValue}-1`;
		e.preventDefault();
		let formData = new FormData();
		formData.append('test_measure', '');
        formData.append('value', '');
        formData.append('units', '');
        formData.append('test', props.testId);
        formData.append('sample', sampleValue);
        formData.append('brush_type', brushTypeValue);
        formData.append('tester', 1);
        formData.append('owner', 1);
        formData.append('test_target', 'Bare');
        formData.append('test_group', 'Select Test Group');
        formData.append('test_case', testCaseValue);
        formData.append('slug', slug);
        formData.append('run', 1);
        formData.append('remarks', '');

        const url = `admin/tests/vacuum/testdetail/`;
        const requestType = 'POST'; // Use PUT for updating existing rows

		axiosInstance({
          method: requestType,
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

		window.location.reload();
	};

     useEffect(() => {
    // Fetch rows from the database and update the 'allRows' state
        axiosInstance.get('/samples/')
          .then(response => {
            setAllSamples(response.data);
          })
          .catch(error => {
            console.error('Error fetching rows', error);
          });

      }, []); // Fetch only once on component mount

    useEffect(() => {
        console.log('all samples:', allSamples);
    }, [allSamples]);

	return (
		<React.Fragment>
          <Box>
            <form onSubmit={handleSubmit}>
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
            <Button type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </form>
          </Box>

      </React.Fragment>
	);
}