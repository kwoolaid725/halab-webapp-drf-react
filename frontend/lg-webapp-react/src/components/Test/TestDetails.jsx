import { useState } from "react";

import "./App.css";
import { TestDetailsTableRow } from "./TestDetailsTableRow";
import { TestDetailsTable } from "./TestDetailsTable";
import { TestDetailsHeader } from "./TestDetailsHeader";
import { TestModal } from "./TestModal";

const testMeasure = {
  Bare: [
      {
      Sand: [
        {
          soil_weight: {
              value: '40',
              units: 'g'
          },
          vac_weight_i: {
              value: '',
              units: 'g'
          },
          vac_weight_f: {
              value: '',
              units: 'g'
          },
          vac_weight_diff: {
              value: '',
              units: 'g'
          },
          pickup: {
              value: '',
              units: '%'
          }
        }
        ]
      },
      {
        Rice: [
          {
            soil_weight: {
              value: '40',
              units: 'g'
            },
            vac_weight_i: {
              value: '',
              units: 'g'
            },
            vac_weight_f: {
              value: '',
              units: 'g'
            },
            vac_weight_diff: {
              value: '',
              units: 'g'
            },
            pickup: {
              value: '',
              units: '%'
            }
          }
        ]
      },
      {
        Cheerios: [
          {
            soil_weight: {
                value: '40',
                units: 'g'
            },
            vac_weight_i: {
                value: '',
                units: 'g'
            },
            vac_weight_f: {
                value: '',
                units: 'g'
            },
            vac_weight_diff: {
                value: '',
                units: 'g'
            },
            pickup: {
                value: '',
                units: '%'
            }
          }
        ]
      }
  ]};
function TestDetails({testTarget}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    testMeasure[testTarget].map(testGroup => ({
      slug: '',
      tester: '',
      test_group: '',
      test_measure: testMeasure[Object.keys(testGroup)[0]][0],
      value: testMeasure[Object.keys(testGroup)[0]][0].value,
      units: testMeasure[Object.keys(testGroup)[0]][0].units,
      run: '',
      remarks: '',
      created: '',
      updated: '',
    }))

  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <TestDetailsTable rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <TestModal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default TestDetails;