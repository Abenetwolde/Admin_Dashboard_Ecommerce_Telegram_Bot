import { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider, Theme } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import palette from './palette.tsx';
import typography from './typography.tsx';
import breakpoints from './breakpoints.tsx';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows.tsx';

// ----------------------------------------------------------------------


export default function ThemeProvider({ children }: any) {
  const { themeMode, themeDirection }:any = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions:any = useMemo(() => ({
    palette: isLight ? palette.light : palette.dark,
    typography,
    breakpoints,
    shape: { borderRadius: 8 },
    direction: themeDirection,
    shadows: isLight ? shadows.light : shadows.dark,
    customShadows: isLight ? customShadows.light : customShadows.dark,
  }), [isLight, themeDirection]);

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
