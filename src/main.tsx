// i18n
// @mui
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ReactDOM from 'react-dom';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Provider, Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version
// import { AuthProvider } from './contexts/JWTContext';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import store from './app/store.ts';
import './i18n';
// redux
// import { persistor, store } from './redux/store';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// highlight
// import './utils/highlight';

import BreadcrumbComponent from './components/BreadcrumbComponent.tsx';








// ----------------------------------------------------------------------

ReactDOM.render(
  <Provider store={store}>

    <SettingsProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
        {/* <BreadcrumbComponent/> */}
          <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
