import React, {useEffect, useState} from 'react';
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'


export default function BareDataCreate(props) {
  { row } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert rows to formData
    let formData = new FormData();
    formData.append('subId', row.subId);
    formData.append('tester', row.tester);
    formData.append('run', row.run);
    formData.append('soil_weight', row.soil_weight);
    formData.append('vac_weight_i', row.vac_weight_i);
    formData.append('vac_weight_f', row.vac_weight_f);
    formData.append('vac_weight_diff', row.vac_weight_diff);
    formData.append('pickup', row.pickup);
    formData.append('remarks', row.remarks);
    formData.append('images', row.images);
    console.log(formData);
  };

  return (
    <React.Fragment>
       <button
         type="submit"
         onClick={handleSubmit}

       >
        Submit Form
       </button>
   </React.Fragment>

  );
}


