import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Logo from '../components/Logo';
import EnterButton from '../components/EnterButton';
import '../styles/styles.css';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/selection');
  };

  return (
    <Container className="welcome-container">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50%">
        <Logo />
        <EnterButton onClick={handleEnterClick} />
      </Box>
    </Container>
  );
};

export default WelcomeScreen;