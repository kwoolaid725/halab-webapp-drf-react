import React, { useContext } from 'react';
import TestContext from '../../store/TestContext'
import Button from '@mui/material/Button';
export default function TestItem( test ) {
	const testCtx = useContext(TestContext);

	function handleAddToTest() {
		testCtx.addItem(test);
	}


	return (
		<li className="test-item">
      <article>
        <div>
          <h3>{test.id}</h3>
          <p className="test-item-price">
            {test.test_category}
          </p>
          <p className="test-item-description">{test.description}</p>
        </div>
        <p className="test-item-actions">
          <Button onClick={handleAddToTest}>Add to Test</Button>
        </p>
      </article>
    </li>
  );
};
// export default Tests;

