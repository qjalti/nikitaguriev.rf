/**
 * Import modules
 */
import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

/**
 * Context
 */
import {Context} from './context';

/**
 * Components
 */
import {NavBar} from './components/layout/NavBar';
import {Footer} from './components/layout/Footer';

/**
 * Pages
 */
import {Index} from './pages/IndexPage';
import {Resume} from './pages/ResumePage';
import {Calc} from './pages/CalcPage';
import {Move} from './pages/MovePage';
import {Marika} from './pages/MarikaPage';
import {Alya} from './pages/AlyaPage';
import {SFG} from './pages/SFGPage';
import {StarSystems} from './pages/StarSystemPage';
import {Timers} from './pages/TimersPage';
import {TimerCreator} from './pages/TimerCreatorPage';
import {ChooseFilm} from './pages/ChooseFilmPage';
import {FullScreen} from './pages/FullScreen';
import {TES} from './pages/TESPage';
import {GasCalc} from './pages/GasCalculatorPage';
import {Wishlist} from './pages/WishlistPage';

/**
 * MUI components
 */
import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
} from '@mui/material';

/**
 * Настройка темы
 */
const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
    },
  },
});

/**
 * Root React element
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  const [speedDialState, setSpeedDialState] = useState(false);
  const closeSpeedDial = () => {
    setSpeedDialState(false);
  };
  const openSpeedDial = () => {
    setSpeedDialState(true);
  };
  return (
    <Router>
      <Fragment>
        <Context.Provider value={{
          closeSpeedDial, openSpeedDial, speedDialState,
        }}
        >
          <ThemeProvider theme={darkTheme}>
            <Box sx={{
              bgcolor: (theme) => theme.palette.grey[100],
              minHeight: '100vh',
            }}>
              <NavBar/>
              <Container sx={{mt: 2}}>
                <Routes>
                  <Route path="/" element={<Index/>} exact/>
                  <Route path="/resume" element={<Resume/>} exact/>
                  <Route path="/calc" element={<Calc/>} exact/>
                  <Route path="/move" element={<Move/>} exact/>
                  <Route path="/marika" element={<Marika/>} exact/>
                  <Route path="/alya" element={<Alya/>} exact/>
                  <Route path="/sfg" element={<SFG/>} exact/>
                  <Route path="/star_systems" element={<StarSystems/>} exact/>
                  <Route path="/timers" element={<Timers/>} exact/>
                  <Route path="/timer_creator" element={<TimerCreator/>} exact/>
                  <Route path="/choose_film" element={<ChooseFilm/>} exact/>
                  <Route path="/fs" element={<FullScreen/>} exact/>
                  <Route path="/TES" element={<TES/>} exact/>
                  <Route path="/gas_calc" element={<GasCalc/>} exact/>
                  <Route path="/wishlist" element={<Wishlist/>} exact/>
                </Routes>
              </Container>
              <Footer/>
            </Box>
          </ThemeProvider>
        </Context.Provider>
      </Fragment>
    </Router>
  );
}

export default App;
