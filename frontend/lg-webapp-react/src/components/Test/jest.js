import { render } from '@testing-library/react';
import TestDetailsTableRow from './TestDetailsTableRow';

test('renders with test props', () => {
  const testCategory = 'Bare';
  const testGroup = 'Sand';
  const testMeasures = {
    // Mock data
  };

  render(<TestDetailsTableRow testCategory={testCategory} testGroup={testGroup} testMeasures={testMeasures} />);
  // Assertions or further test scenarios...
});
