import { ThemeProvider } from '@mui/material/styles';
import { createTheme, colors } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { AloiLink as BaseAloiLink } from './AloiLink';
import CssBaseline from '@mui/material/CssBaseline';
import { forwardRef } from 'react';

const AloiLinkWithRef = forwardRef((props, ref) => {
  return <BaseAloiLink {...props} />;
});

export const theme = createTheme({
  palette: {
    warning: {
      main: '#F8A80ED9',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: AloiLinkWithRef,
      },
    },
    MuiButton: {
      defaultProps: {
        LinkComponent: AloiLinkWithRef,
      },
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      // '.root': {
      //   backgroundColor: '#000',
      // },
      a: {
        textDecoration: 'none',
      },
      '#root': {
        height: '100%',
        width: '100%',
        backgroundColor: '#F4EDE9',
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export const withAloiTheme = (WrappedComponent) => {
  const _ = ({ theme, ...props }) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <WrappedComponent {...props} />
    </ThemeProvider>
  );

  return (
    (_.displayName = `withAloiTheme(${
      WrappedComponent.displayName || WrappedComponent.name
    })`),
    _
  );
};
