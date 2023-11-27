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



const TestDetailsTableRow = ({ testCategory, testGroup, testMeasures, addRow, deleteRow, editRow }) => {


  const [rows, setRows] = useState([
    {
      slug: '1',
      tester: 'a',
      testGroup: '',
      run: 1,
      remarks: 'adf',
      created_at: '',
      last_updated: '',
      values: {} // Initialize values within the row object
    },
  ]);

  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState({});


  const handleAddRow = () => {
    // For the sake of example, manually adding a row
    setRows((prevRows) => [
      ...prevRows,
      {
        slug: '2',
        tester: 'b',
        testGroup,
        run: 2,
        remarks: 'xyz', // Adjust as needed
        created_at: '',
        last_updated: '',
      },
    ]);
  };

  useEffect(() => {
    const selectedMeasures = testMeasures[testCategory];
    if (selectedMeasures && selectedMeasures.length > 0) {
      const specificMeasure = selectedMeasures.find(measure => Object.keys(measure)[0] === testGroup);
      if (specificMeasure) {
        const values = specificMeasure[testGroup][0];
        const keys = Object.keys(values);
        setValues(values);
        setKeys(keys);
      }
    }
  }, [testGroup, testCategory, testMeasures]);


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tester</th>
            <th>Test Group</th>
            {keys.map((key, index) => (
              <th key={index}>{key}</th>
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
            <tr key={idx}>
              <td>{row.slug}</td>
              <td>{row.tester}</td>
              <td>{testGroup}</td>
              {keys.map((key, index) => (
                <td key={index}>
                  {values[key]?.value} {values[key]?.units}
                </td>
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

