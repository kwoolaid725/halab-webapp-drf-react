import { useContext } from 'react';

// import Modal from './UI/Modal.jsx';

// import Button from './UI/Button.jsx';
// import { currencyFormatter } from '../util/formatting.js';
// import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from '@mui/material/Button';
import TableContext from '../../../../store/TestContext.jsx';
import TableRow from './TableRow.jsx';

export default function Table() {
  const tableCtx = useContext(TableContext);
  // const userProgressCtx = useContext(UserProgressContext);

const tableTotal = tableCtx.items.reduce(
  (total, item) => total + item.test,
  0
);


  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {tableCtx.items.map((item) => (
          <TableRow
            key={item.id}
            test={item.test}
            slug={item.slug}
            tester={item.tester}
            test_target={item.test_target}
            test_group={item.test_group}
            test_case={item.test_case}
            sample={item.sample}
            brush_type={item.brush_type}
            test_measure={item.test_measure}
            run={item.run}
            value={item.value}
            units={item.units}
            owner={item.owner}
            remarks={item.remarks}
            onIncrease={() => tableCtx.addItem(item)}
            onDecrease={() => tableCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{tableTotal}</p>
      <p className="modal-actions">
        <Button textOnly>
          Close
        </Button>
        {tableCtx.items.length > 0 && (
          <Button>Go to Checkout</Button>
        )}
      </p>
    </div>
  );
}