import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import CreateSprint from './pages/CreateSprint';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ConfigureSprint from './pages/ConfigureSprint';


function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createSprint' element={<CreateSprint />} />
        <Route path='/sprint' element={<ConfigureSprint />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
