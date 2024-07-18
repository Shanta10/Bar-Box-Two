import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ReceiptDecisionButtons from '../components/ReceiptDecisionButtons';
import '../styles/styles.css';

const ReceiptScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleReceiptDecision = async (receiptBoolean: boolean) => {
    const payload = JSON.parse(localStorage.getItem('payload')!);

    const personId = localStorage.getItem("personId");

    if (receiptBoolean) {
      localStorage.setItem('receiptBoolean', JSON.stringify(receiptBoolean));
      navigate('/cedula-screen');
    } else {
      payload.personId = 1;
      payload.receiptBoolean = receiptBoolean;

      try {
        // ENDPOINT POST DE LA ORDEN
        await fetch('http://localhost:8000/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        navigate('/');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
    // Agregar console.log para mostrar el payload antes de enviarlo
    console.log('Payload antes de enviar:', payload);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="70vh">
        <Typography variant="h4" gutterBottom>
          ¿Necesitas un recibo con tus datos?
        </Typography>
        <ReceiptDecisionButtons handleReceiptDecision={handleReceiptDecision} />
      </Box>
    </Container>
  );
};

export default ReceiptScreen;