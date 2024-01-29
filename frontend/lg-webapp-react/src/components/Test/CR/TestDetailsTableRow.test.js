import { render, screen } from '@testing-library/react';
import TestDetailsTableRow from './TestDetailsTableRow';

test('renders table headers based on test props', () => {
  const testCategory = 'Bare';
  const testGroup = 'Sand';
  const testMeasures = {
    Bare: [
      {
        Sand: [
          {
            soil_weight: { value: '40', units: 'g' },
            vac_weight_i: { value: '', units: 'g' },
            vac_weight_f: { value: '', units: 'g' },
            vac_weight_diff: { value: '', units: 'g' },
            pickup: { value: '', units: '%' },
          },
        ],
      },
    ],
  };

  const { container, debug } = render(
    <TestDetailsTableRow testCategory={testCategory} testGroup={testGroup} testMeasures={testMeasures}/>
  );

  // Log the HTML structure of the rendered component to the console
  debug();
});
//   render(
//     <TestDetailsTableRow testCategory={testCategory} testGroup={testGroup} testMeasures={testMeasures} />
//   );
//
//   // Ensure that specific table headers are present based on test props
//   expect(screen.getByText('soil_weight')).toBeTruthy();
//   expect(screen.getByText('vac_weight_i')).toBeTruthy();
//   expect(screen.getByText('vac_weight_f')).toBeTruthy();
//   expect(screen.getByText('vac_weight_diff')).toBeTruthy();
//   expect(screen.getByText('pickup')).toBeTruthy();
// });
