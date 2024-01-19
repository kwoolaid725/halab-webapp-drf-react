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
import TestDetailsBody from "./TestDetailsBody";
import Button from "@mui/material/Button";
import TestDetailsAddSample from "./TestDetailsAddSample";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import ModalComponent from "../UI/Modal";

export default function TestDetails(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {id} = useParams();

  const [data, setData] = useState();
  const [dataDetails, setDataDetails] = useState();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    axiosInstance(`/tests/`)
      .then((res) => {
        const test = res.data.find((test) => test.id === parseInt(id));
        setData(test);
        console.log('test123:',test);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // handle error appropriately
      });
  }, [id]);

  useEffect(() => {
  if (data?.id) {
    axiosInstance(`/admin/tests/vacuum/testdetail/${data?.id}/`)
      .then((res) => {
        const testDataDetails = res.data;
        setDataDetails(testDataDetails);
        console.log('testDataDetails1111:', testDataDetails);

        // Check if there are test details
        const hasTestDetails = testDataDetails.length > 0;

        // If there are test details, set the test_status to 'IN_PROGRESS'
        // If there are no test details and the test_status is not 'COMPLETED', set the test_status to 'PENDING'
        const newTestStatus = hasTestDetails ? 'IN_PROGRESS' : (data?.test_status !== 'COMPLETED' ? 'PENDING' : data?.test_status);

        // Update the test_status in the main data
        if (data?.test_status !== 'COMPLETED') {
          axiosInstance.patch(`admin/tests/edit/${data.id}/`, { test_status: newTestStatus })
            .then((res) => {
              console.log('Test status updated to', newTestStatus);
            })
            .catch((error) => {
              console.error("Error updating test status: ", error);
            });
        }
      })
        .catch((error) => {
          console.error("Error fetching detailed data: ", error);
        });
     }
  }, [data?.id]);

  const handleToggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };



  return (
    <React.Fragment>
      {/* TestDetailsHeader outside of the collapsible section */}
      <TestDetailsHeader
        testCategory={data?.test_category}
        productCategory={data?.product_category}
        testStatus={data?.test_status}
        testId={data?.id}
        description={data?.description}
        dueDate={data?.due_date}
        completionDate={data?.completion_date}
        remarks={data?.remarks}
      />


   <Box >
     <Button
         variant="contained"
         onClick={openModal}
         size="large"
         endIcon={<PlaylistAddIcon />}
         style={{ backgroundColor: 'white', color: 'steelblue', fontWeight: 'bold', margin: '15px' }}
     >
        {isModalOpen ? '' : 'Add Sample'}
     </Button>
    </Box>

      <ModalComponent open={isModalOpen} onClose={closeModal}>
        <TestDetailsAddSample
          testId={data?.id}
          productCategory={data?.product_category}
        />
      </ModalComponent>


      <TestDetailsBody
          test={data}
          // testDetails={dataDetails}

      />

    </React.Fragment>
  );
}

