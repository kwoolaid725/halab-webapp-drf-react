import React, {useEffect, useState} from 'react';
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


//  component for user to input data and can be added and subtracted with a button


const initialFormData = {
  id: '',
  created_at: '',
  last_updated: '',
  tester: '',
  run: '',
  soil_weight: '',
  vac_weight_i: '',
  vac_weight_f: '',
  vac_weight_diff: '',
  pickup: '',
  remarks: '',
  images: '',
};

function createData( id, test_target, test_group, test_measure,test_case,tester, run, created_at, last_updated, remarks) {
  return {
    id, // test_id + '-' + auto increment
    test_target, // bare
    test_group, // sand
    test_measure, // pickup
    test_case, // NA
    tester,// 1
    run,
    created_at,
    last_updated,
    remarks
  };
}

let test_measure_bare = {
  Sand: [
    {
      soil_weight: 40,
      vac_weight_i: 10,
      vac_weight_f: 0,
      vac_weight_diff: 0,
      pickup: ''
    }
  ],
  Cheerios: [
    {
      soil_weight: 25,
      vac_weight_i: 0,
      vac_weight_f: 0,
      vac_weight_diff: 0,
      pickup: ''
    }
  ],
  Rice: [
    {
      soil_weight: 50,
      vac_weight_i: '',
      vac_weight_f: '',
      vac_weight_diff: '',
      pickup: ''

    }

  ],
};


function Bare(props) {
  const [formData, updateFormData] = useState(initialFormData);
  const [rows, setRows] = useState([]);
  const addRow = () => {
    const newRow = {formData, id:`${props.id}-${props.test_group}-${rows.length + 1}`, created_at: new Date().toISOString(),
      last_updated: new Date().toISOString()};
      setRows([...rows, newRow]);
  };
    const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
    console.log(rows);

  }

  const handleSubmit = (index) => {
    const list = [...rows];
    list[index].last_updated = new Date().toISOString();
    setRows(list);
  };

  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={row.id}>
          {/* Your TableCell components */}
          <TableCell>
            <input
              name="id"
              value={row.id}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="created_at"
              value={row.created_at}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="last_updated"
              value={row.last_updated}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="tester"
              value={row.tester}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="run"
              value={row.run}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="soil_weight"
              value={row.soil_weight}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
           <TableCell>
            <input
              name="vac_weight_i"
              value={row.vac_weight_i}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="vac_weight_f"
              value={row.vac_weight_f}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="vac_weight_diff"
              value={row.vac_weight_diff}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="pickup"
              value={row.pickup}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="remarks"
              value={row.remarks}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <input
              name="images"
              value={row.images}
              onChange={e => handleInputChange(e, index)}
            />
          </TableCell>
          <TableCell>
            <button onClick={() => handleSubmit(index)}>
              Submit
            </button>
          </TableCell>
          <TableCell>
            <button onClick={() => removeRow(index)}>
              Remove
            </button>
          </TableCell>
        </TableRow>
      ))}
      <button onClick={addRow}>
        Add New
      </button>
    </TableBody>
  );
}

export default Bare;