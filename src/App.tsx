import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import store from './app/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import Router1 from './routes/index.tsx'
import ThemeProvider from './theme/index.tsx';
import ThemeLocalization from './components/ThemeLocalization.tsx'
import ThemeColorPresets from './components/ThemeColorPresets.tsx'
import RtlLayout from './components/RtlLayout.tsx'
import MotionLazyContainer from './components/animate/MotionLazyContainer.tsx'
import NotistackProvider from './components/NotistackProvider.tsx'
import ProgressBar from './components/ProgressBar.tsx'
// import ChartStyle from './components/chart/ChartStyle.tsx'
import Settings from './components/settings/index.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import { ChartStyle } from './components/chart';
import { ProgressBarStyle } from './components/ProgressBar';
export default function App() {
return(
  // <React.StrictMode>
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <ChartStyle />
                <Settings />
                    <Router1 />
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  // </React.StrictMode>,
)
}