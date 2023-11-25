import React, {
  useEffect,
  useState
} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import Button from '@mui/material/Button';


// const testGroup = 'Bare';
// const testMeasures = {
//
// }




// const TestDetailsTableRow = ({  testGroup = '', testMeasures ={}, addRow, deleteRow, editRow }) => {
const TestDetailsTableRow = ({  addRow, deleteRow, editRow }) => {
  const [rows, setRows] = useState([
    {
      slug: '1',
      tester: 'a',
      testGroup: '',
      // test_measure: '',
      // value: '',
      // units: '',
      run: 1,
      remarks: 'adf',
      created_at: '',
      last_updated: '',
    }

  ]);

  // const testGroup = 'Bare';
  const testMeasures = {
  "Bare": [
    {
      "Sand": [
        {
          "soil_weight": {
            "value": "40",
            "units": "g"
          },
          "vac_weight_i": {
            "value": "",
            "units": "g"
          },
          "vac_weight_f": {
            "value": "",
            "units": "g"
          },
          "vac_weight_diff": {
            "value": "",
            "units": "g"
          },
          "pickup": {
            "value": "",
            "units": "%"
          }
        }
      ]
    },
    {
      "Rice": [
        {
          "soil_weight": {
            "value": "40",
            "units": "g"
          },
          "vac_weight_i": {
            "value": "",
            "units": "g"
          },
          "vac_weight_f": {
            "value": "",
            "units": "g"
          },
          "vac_weight_diff": {
            "value": "",
            "units": "g"
          },
          "pickup": {
            "value": "",
            "units": "%"
          }
        }
      ]
    },
    {
      "Cheerios": [
        {
          "soil_weight": {
            "value": "40",
            "units": "g"
          },
          "vac_weight_i": {
            "value": "",
            "units": "g"
          },
          "vac_weight_f": {
            "value": "",
            "units": "g"
          },
          "vac_weight_diff": {
            "value": "",
            "units": "g"
          },
          "pickup": {
            "value": "",
            "units": "%"
          }
        }
      ]
    }
  ],
  "Carpet":
      {
      "Sand":
        {
          "soil_weight": {
              "value": "100",
              "units": "g"
          },
          "vac_weight_i": {
              "value": "",
              "units": "g"
          },
          "vac_weight_f": {
              "value": "",
              "units": "g"
          },
          "vac_weight_diff": {
              "value": "",
              "units": "g"
          },
          "pickup": {
              "value": "",
              "units": "%"
          }
        }
      }
}

const testGroup = 'Sand';

  const handleAddRow = () => {
    addRow(testGroup, testMeasures); // Pass test group and test target data to addRow function
  };


 // Check if testMeasures and testGroup are valid
  if (!testMeasures || !testMeasures[testGroup]) {
    return (
      <div>
        <p>Test measures for {testGroup} are not available.</p>
      </div>
    );
  }

  // Extract keys and values from testMeasures[testGroup]
  // let keys = [];
  // let values = [];

  // Extract keys and values from testMeasures[testGroup]
  const measuresKeys = Object.keys(testMeasures[testGroup]); // Array of keys for the measures
  const selectedMeasures = testMeasures[testGroup][measuresKeys[0]]; // Assuming taking the first instance

  const keys = Object.keys(selectedMeasures[0]); // Assuming it's an array with at least one item
  const values = keys.map((key) => selectedMeasures[0][key].value);

  console.log('keys:', keys);
  console.log('values:', values);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tester</th>
            <th>Test Group</th>
            {keys.map((key, idx) => (
              <th key={idx}>{key}</th>
            ))}
            <th>Run</th>
            <th>Remarks</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td>{row.slug}</td>
                <td>{row.tester}</td>
                <td>{testGroup}</td>
                {values.map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
                <td>{row.run}</td>
                <td>{row.remarks}</td>
                <td>{row.created_at}</td>
                <td>{row.last_updated}</td>
                <td>
                  <span>
                    <BsFillTrashFill />
                    <BsFillPencilFill />
                  </span>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={keys.length + 7}>
              <Button variant="contained" onClick={handleAddRow}>
                Add Row
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestDetailsTableRow;

