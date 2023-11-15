// tableRow to be added to the table in the TestContext.jsx
//
export default function TableRow({
   test,
   slug,
   tester,
   test_target,
   test_group,
   test_case,
   sample,
   brush_type,
   test_measure,
   value,
   units,
   run,
   remarks,
   owner,
   addItem,
   removeItem,
}) {
  return (
    <li className="cr-vacuum-item">
      <p>
        {test} {slug} {tester} {test_target} {test_group} {test_case} {sample} {brush_type} {test_measure} {value} {units} {run} {remarks} {owner}
      </p>
      <p className="cr-vacuum-actions">
        <button onClick={addItem}>-</button>
        <button onClick={removeItem}>+</button>
      </p>
    </li>
  );
}