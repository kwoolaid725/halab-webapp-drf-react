import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import axiosInstance from "../../axios";
import TestDetailsTableRow from "./TestDetailsTableRow";
import TestDetailsTableRowBare from "./TestDetailsTableRowBare";
import TestDetailsTableRowCarpet from "./TestDetailsTableRowCarpet";
import TestDetailsTableRowEdge from "./TestDetailsTableRowEdge";

const TestDetailsTableCR = (props) => {
  const [testMeasures, setTestMeasures] = useState(null);
  const [fetchedRows, setFetchedRows] = useState([]);
  const [rows, setRows] = useState();

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  useEffect(() => {
    fetch('/test-measures.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setTestMeasures(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);



  // fetch Bare rows from API

    useEffect(() => {
    axiosInstance.get(`/admin/tests/vacuum/testdetail/${props.testId}/?test_target=Bare`)
      .then((response) => {
        setFetchedRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
    }, []);






   return (
    <React.Fragment>
      <table>
        <tr>
          <th>
          Bare
          </th>
        </tr>
          <tbody>
          <TestDetailsTableRowBare

            testId={props.testId}
            sample={props.sample}
            brushType={props.brushType}
            tester={props.tester}
            testCase={props.testCase}
            model={props.model}

              />
          </tbody>
      </table>
      <table>
        <tr>
          <th>
            Carpet
          </th>
        </tr>
        <tbody>
          <TestDetailsTableRowCarpet

            testId={props.testId}
            sample={props.sample}
            brushType={props.brushType}
            tester={props.tester}
            testCase={props.testCase}
            model={props.model}

              />
          </tbody>
      </table>
      <table>
        <tr>
          <th>
            Edge
          </th>
        </tr>
        <tbody>
          <TestDetailsTableRowEdge

            testId={props.testId}
            sample={props.sample}
            brushType={props.brushType}
            tester={props.tester}
            testCase={props.testCase}
            model={props.model}

              />
          </tbody>
      </table>
      <table>
        <tr>
          <th>
            Pet Hair
          </th>
        </tr>
      </table>
      <table>
        <tr>
          <th>
            Noise
          </th>
        </tr>
      </table>



    </React.Fragment>
  );



};

export default TestDetailsTableCR;
