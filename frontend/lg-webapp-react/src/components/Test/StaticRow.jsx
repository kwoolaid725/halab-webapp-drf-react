import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import moment from 'moment';

const StaticRow = ({ row, idx, testGroup, keys, handleEdit }) => {

  const formatDate = (timestamp) => {
    if (!timestamp) {
      console.error('Empty timestamp:', timestamp);
      return 'N/A';
    }

    try {
      const formattedTimestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

      if (!formattedTimestamp || formattedTimestamp === 'Invalid date') {
        console.error('Invalid formatted timestamp:', formattedTimestamp);
        return 'Invalid Date';
      }

      return formattedTimestamp;
    } catch (error) {
      console.error('Date Formatting Error:', error);
      return 'Date Formatting Error';
    }
  };

  return (
    <tr key={idx}>
      <td>{row.slug}</td>
      <td>{row.tester}</td>
      <td>{testGroup}</td>
        {keys.map((key, idx) => (
          <td key={idx}>
            {row.values[key]?.value} {row.values[key]?.units}
          </td>
        ))}
        <td>{row.run}</td>
        <td>{row.remarks}</td>
        <td>{formatDate(row.created_at)}</td>
        <td>{formatDate(row.last_updated)}</td>



      <td>
        <span>
          <BsFillPencilFill className="edit-btn" onClick={() => handleEdit(idx)} />
          <BsFillTrashFill />
        </span>
      </td>
    </tr>
  );
};

export default StaticRow;