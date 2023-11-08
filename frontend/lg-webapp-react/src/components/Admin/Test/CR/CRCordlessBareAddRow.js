import React, { useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'



// component for adding CR Bare Floor Data to the table

const data = {
    id: 1,
    test_group: 'CR Cordless Bare Floor',
    length: 2

};
const BareAddRow = ( { onSubmit }) => {

  const initialFormData = Object.freeze({
      subId: '',
      tester: '',
      run: '',
      soil_weight: '',
      vac_weight_i: '',
      vac_weight_f: '',
      vac_weight_diff: '',
      pickup: '',
      remarks: '',
      images: '',
  });


  // const [formData, updateFormData] = useState(initialFormData);
  // const [row, setRow] = useState([]);
  const [input, setInput] = useState([]);
  const addRow = () => {
    const newRow = {...initialFormData, id:`${data.id}-${data.test_group}-${data.length + 1}`};
      // created_at: new Date().toISOString(),
      // last_updated: new Date().toISOString()};
      setInput([...input, newRow]);
  };

   const handleSubmit = () => {
    onSubmit(input);
    setInput("");
  };

  //   const removeRow = (index) => {
  //   setRow(row.filter((_, i) => i !== index));
  // };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...rows];
  //   list[index][name] = value;
  //   setRows(list);
  //   // console.log(rows);
  //
  // }

  // const handleSubmit = (index) => {
  //   const list = [...rows];
  //   list[index].last_updated = new Date().toISOString();
  //   setRows(list);
  // };


  return (
      <TableBody>
        {/*{rows.map((row, index) => (*/}
        {/*  <TableRow key={row.id}>*/}
          <TableRow>
            {/* Your TableCell components */}
            <TableCell>
              <input
                name="id"
                value={input.id}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="created_at"
                value={input.created_at}
                onChange={e => setInput(e.target.value)}
                disabled
              />
            </TableCell>
            <TableCell>
              <input
                name="last_updated"
                value={input.last_updated}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="tester"
                value={input.tester}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="run"
                value={input.run}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="soil_weight"
                value={input.soil_weight}
                onChange={e => setInput(e.target.value)}
                disabled
              />
            </TableCell>
             <TableCell>
              <input
                name="vac_weight_i"
                value={input.vac_weight_i}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="vac_weight_f"
                value={input.vac_weight_f}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="vac_weight_diff"
                value={input.vac_weight_diff}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="pickup"
                value={input.pickup}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="remarks"
                value={input.remarks}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <input
                name="images"
                value={input.images}
                onChange={e => setInput(e.target.value)}
              />
            </TableCell>
              <TableCell>
                  <button onClick={handleSubmit}>Submit</button>
              </TableCell>
            {/*<TableCell>*/}
            {/*  <button onClick={() => handleSubmit(index)}>*/}
            {/*    Submit*/}
            {/*  </button>*/}
            {/*</TableCell>*/}
            {/*<TableCell>*/}
            {/*  <button onClick={() => removeRow(index)}>*/}
            {/*    Remove*/}
            {/*  </button>*/}
            {/*</TableCell>*/}
          </TableRow>
        {/*))}*/}

        <button type="button" onClick={addRow}>
        Add New
      </button>
    </TableBody>

  );
}

export default BareAddRow;