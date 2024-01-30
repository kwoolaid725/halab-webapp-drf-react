import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import axiosInstance from "../../../axios";
import TestDetailsTableRow from "./TestDetailsTableRow";
import TestDetailsTableRowBare from "./Vacuum_Cordless/TestDetailsTableRowBare";

const TestDetailsTable = (props) => {
  const [fetchedRows, setFetchedRows] = useState([]);
  const [rows, setRows] = useState();

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setSelectedComponent(componentName);
  };


  useEffect(() => {
    if (props.testId) {
      axiosInstance(`/admin/tests/vacuum/testdetail/?test_no=${props.testId}`)
        .then((res) => {
          const fetchedRows = res.data || [];
          setFetchedRows(fetchedRows);
        })
        .catch((error) => {
          console.error('Error fetching detailed data: ', error);
        });
    }
  }, [props.testId]);



  useEffect(() => {
    if (fetchedRows.length > 0) {
      const combinedRows = fetchedRows.reduce((acc, row) => {
        const { slug, test_measure, value, units, ...otherValues } = row;

        if (!acc[slug]) {
          acc[slug] = {
            ...otherValues,
            slug,
            test_measure: test_measure ? [test_measure] : [],
            values: {},
            units: units ? [units] : [],
          };
        }

        if (test_measure) {
          if (!acc[slug].values[test_measure]) {
            acc[slug].values[test_measure] = { value: value || '', units: units || '' };
          }
        }

        return acc;
      }, {});

      const updatedRows = Object.keys(combinedRows).reduce((acc, slug) => {
        const { test_target, test_group } = combinedRows[slug];
        if (!acc[test_target]) {
          acc[test_target] = {};
        }
        if (!acc[test_target][test_group]) {
          acc[test_target][test_group] = [];
        }
        acc[test_target][test_group].push(combinedRows[slug]);
        return acc;
      }, {});

      // console.log('updatedRows', updatedRows);

      setRows(updatedRows);


    }
  }, [fetchedRows]);

  useEffect(() => {
    console.log('rows', rows);
  }, [rows]);

   return (
    <React.Fragment>
      <table>
        <th>
          Bare
        </th>
      </table>
      <table>
        <th>
          Carpet
        </th>
      </table>
      <table>
        <th>
          Edge
        </th>
      </table>
      <table>
        <th>
          Pet Hair
        </th>
      </table>
      <table>
        <th>
          Noise
        </th>
      </table>



      <div>
      <button onClick={() => handleButtonClick('Component1')}>Show Component 1</button>
      <button onClick={() => handleButtonClick('Component2')}>Show Component 2</button>
      <button onClick={() => handleButtonClick('Component3')}>Show Component 3</button>

      {selectedComponent === 'Component1' && 2}
      {selectedComponent === 'Component2' && 1}
      {selectedComponent === 'Component3' && 3}
    </div>

    </React.Fragment>
  );



};

export default TestDetailsTable;