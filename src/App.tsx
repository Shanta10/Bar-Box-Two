import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';
import './App.css';

import WelcomeScreen from './screens/WelcomeScreen';
import SelectionScreen from './screens/SelectionScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import CedulaScreen from './screens/CedulaScreen';
import Register from './screens/Register';
import Invoice from './screens/Invoice';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar className="app-toolbar">
            <Typography variant="h6" component="div" className="app-title">
              BAR-BOX 2.0
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className="container">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/selection" element={<SelectionScreen />} />
            <Route path="/receipt" element={<ReceiptScreen />} />
            <Route path="/cedula-screen" element={<CedulaScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cedula-screen" element={<CedulaScreen />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/register" element={<Register />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;