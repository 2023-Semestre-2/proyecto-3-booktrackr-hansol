
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
