import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#588b8b', // Set your primary color here
      contrastText: '#fff', // Set your primary text color for better contrast
    },
    // ... (other palette configurations)
  },
  // ... (other theme configurations)
});

export default theme;
