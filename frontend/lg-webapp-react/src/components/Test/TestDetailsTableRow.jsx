import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';


const testData = {
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
const TestDetailsTableRow = ({ rows, deleteRow, editRow, testGroup, testMeasures  }) => {
  console.log('testMeasures:', testMeasures);
  let keys = Object.keys(testMeasures);
  let values = [];
  for (let key in testMeasures) {
    let value = testMeasures[key];
    console.log(key, value);
    values.push(<th>{value.value}</th>);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tester</th>
            <th>Test Group</th>
            {keys}
            <th>Run</th>
            <th>Remarks</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {rows && rows.map((row, idx) =>  {
          return (
            <tr key={idx}>
              <td>{row.id}</td>
              <td>{row.tester}</td>
              <td>{testGroup}</td>
              {values}
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
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default TestDetailsTableRow;

