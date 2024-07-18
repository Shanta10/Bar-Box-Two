import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import CustomerInfo from '../components/CustomerInfo';
import DrinkTable from '../components/DrinkTable';
import TotalBox from '../components/TotalBox';

interface CustomerData {
  id: number;
  cardId: string;
  names: string;
  email: string;
  cellphone: string;
}

interface Drink {
  id: number;
  name: string;
  portion: number;
  price: number;
  totalPrice: number;
}

const Invoice: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [customerData, setCustomerData] = useState<CustomerData>({
    id: 0,
    cardId: "",
    names: "",
    email: "",
    cellphone: "",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const storedCardId = localStorage.getItem("cardId");

        const response = await fetch(
          `http://localhost:8000/person/cardId/${storedCardId}`
        );
        if (response.ok) {
          const data = await response.json();
          setCustomerData({
            id: data.id,
            cardId: data.cardId,
            names: data.names,
            email: data.email,
            cellphone: data.cellphone,
          });
        } else {
          console.error(
            "Error al obtener los datos del cliente desde el backend"
          );
        }
      } catch (error) {
        console.error("Error en la llamada al backend:", error);
      }
    };

    const storedDrinks = localStorage.getItem("selectedDrinks");
    const storedTotalCost = localStorage.getItem("totalCost");

    if (storedDrinks) {
      setSelectedDrinks(JSON.parse(storedDrinks));
    }
    if (storedTotalCost) {
      setTotalCost(JSON.parse(storedTotalCost));
    }

    fetchCustomerData();
  }, []);

  const handleSaveAndExit = async () => {
    try {
      const payload = JSON.parse(localStorage.getItem('payload')!);
      const receiptBoolean = JSON.parse(localStorage.getItem('receiptBoolean')!);
      payload.receiptBoolean = receiptBoolean;
      payload.personId = customerData.id;

      console.log('Payload antes de enviar:', payload);

      // ENDPOINT POST DE LA ORDEN
      await fetch('http://localhost:8000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      localStorage.removeItem('receiptBoolean');
      navigate("/");
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
      >
        <Typography variant="h4" gutterBottom>
          RECIBO
        </Typography>
        <CustomerInfo customerData={customerData} />
        <DrinkTable selectedDrinks={selectedDrinks} />
        <TotalBox totalCost={totalCost} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAndExit}
          sx={{ mt: 2 }}
        >
          Salir
        </Button>
      </Box>
    </Container>
  );
};

export default Invoice;