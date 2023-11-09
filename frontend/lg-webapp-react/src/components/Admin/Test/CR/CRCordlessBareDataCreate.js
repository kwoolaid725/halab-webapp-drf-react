import { useState } from 'react';

import Input from '../../../UI/DataInput.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../../../../util/validation.js';
import { useInput } from '../../../../hooks/useInput.js';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import axiosInstance from "../../../../axios";


const initialData = {
    id: 1,
    test_category: 'CR',
    test_target: 'Bare Floor', // bare
    test_group: 'Sand',
    test_case: 'REG',
    sample: "1111",
    brush_type: 'Carpet',
    owner: 1,

}



export default function CRBareData() {

    const {
      value: testerValue,
      handleInputChange: handleTesterChange,
      handleInputBlur: handleTesterBlur,
      hasError: testerHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: runValue,
      handleInputChange: handleRunChange,
      handleInputBlur: handleRunBlur,
      hasError: runHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: soilwtValue,
      handleInputChange: handleSoilwtChange,
      handleInputBlur: handleSoilwtBlur,
      hasError: soilwtHasError,
    } = useInput('40', (value) => isNotEmpty(value));
    const {
      value: initialwtValue,
      handleInputChange: handleInitialwtChange,
      handleInputBlur: handleInitialwtBlur,
      hasError: initialwtHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: finalwtValue,
      handleInputChange: handleFinalwtChange,
      handleInputBlur: handleFinalwtBlur,
      hasError: finalwtHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: wtdiffValue,
      handleInputChange: handleWtdiffChange,
      handleInputBlur: handleWtdiffBlur,
      hasError: wtdiffHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: pickupValue,
      handleInputChange: handlePickupChange,
      handleInputBlur: handlePickupBlur,
      hasError: pickupHasError,
    } = useInput('', (value) => isNotEmpty(value));
    const {
      value: remarksValue,
      handleInputChange: handleRemarksChange,
      handleInputBlur: handleRemarksBlur,
      hasError: remarksHasError,
    } = useInput('', (value) => isNotEmpty(value));

     const test_measure = {
            soil_weight: {
                value: soilwtValue,
                units: 'g'
            },
            vac_weight_i: {
                value: initialwtValue,
                units: 'g'
            },
            vac_weight_f: {
                value: finalwtValue,
                units: 'g'
            },
            vac_weight_diff: {
                value: wtdiffValue,
                units: 'g'
            },
            pickup: {
                value: pickupValue,
                units: '%'
            },
        };

    function handleSubmit(event) {
        event.preventDefault();

        // Create an array to hold all the new data

        for (let measure in test_measure) {

            const newData = {
                test: initialData.id,
                test_target: initialData.test_target,
                test_group: initialData.test_group,
                test_case: initialData.test_case,
                sample: initialData.sample,
                brush_type: initialData.brush_type,
                test_measure: measure,
                value: Number(test_measure[measure].value),
                units: test_measure[measure].units,
                tester: Number(testerValue),
                run: Number(runValue),
                remarks: remarksValue,
                owner: initialData.owner,
            }

            // allNewData.push(newData);
            // console.log(allNewData);
             axiosInstance.post(`admin/tests/vacuum/testdetail/`, newData);

        }

        }

  return (
    <form onSubmit={handleSubmit}>
      <TableBody>
        {/*{rows.map((row, index) => (*/}
          <TableRow >
            {/* Your TableCell components */}
            <TableCell>
                <Input
                  label="Row ID"
                  id="id"
                  name="id"
                  // value={row.id}
                  disabled
                />
            </TableCell>
            <TableCell>
               <Input
                  label="Created"
                  id="created_at"
                  type="date"
                  name="created_at"
                  // value={row.created_at}
                  disabled
                />
            </TableCell>
            <TableCell>
               <Input
                  label="Last Updated"
                  id="last_updated"
                  type="date"
                  name="last_updated"
                  // value={row.last_updated}
                  disabled
                />
            </TableCell>
            <TableCell>
              <Input
                label="Tester"
                id="tester"
                type="tester"
                name="tester"
                onChange={handleTesterChange}
                onBlur={handleTesterBlur}
                value={testerValue}
                error={testerHasError && 'Please enter a valid tester'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Run"
                id="run"
                type="run"
                name="run"
                onChange={handleRunChange}
                onBlur={handleRunBlur}
                value={runValue}
                error={runHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Soil Weight"
                id="soil_weight"
                name="soil_weight"
                onChange={handleSoilwtChange}
                onBlur={handleSoilwtBlur}
                value={soilwtValue}
                error={soilwtHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Initial Weight"
                id="initial_weight"
                name="initial_weight"
                onChange={handleInitialwtChange}
                onBlur={handleInitialwtBlur}
                value={initialwtValue}
                error={initialwtHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Final Weight"
                id="final_weight"
                name="final_weight"
                onChange={handleFinalwtChange}
                onBlur={handleFinalwtBlur}
                value={finalwtValue}
                error={finalwtHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Weight Difference"
                id="weight_difference"
                name="weight_difference"
                onChange={handleWtdiffChange}
                onBlur={handleWtdiffBlur}
                value={wtdiffValue}
                error={wtdiffHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Pickup %"
                id="pickup"
                name="pickup"
                onChange={handlePickupChange}
                onBlur={handlePickupBlur}
                value={pickupValue}
                error={pickupHasError && 'Please enter a valid run'}
              />
            </TableCell>
            <TableCell>
              <Input
                label="Remarks"
                id="remarks"
                name="remarks"
                onChange={handleRemarksChange}
                onBlur={handleRemarksBlur}
                value={remarksValue}
                error={remarksHasError && 'Please enter a valid run'}
              />
            </TableCell>
            {/*<TableCell>*/}
            {/*  <Input*/}
            {/*    label="Image"*/}
            {/*    id="image"*/}
            {/*    name="image"*/}
            {/*    onChange={handleImageChange}*/}
            {/*    onBlur={handleWtdiffBlur}*/}
            {/*    value={wtdiffValue}*/}
            {/*    error={wtdiffHasError && 'Please enter a valid run'}*/}
            {/*  />*/}
            {/*</TableCell>*/}
              <TableCell>

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
        <button onClick={handleSubmit}>
            Submit
        </button>
    </TableBody>
    </form>
  );
}