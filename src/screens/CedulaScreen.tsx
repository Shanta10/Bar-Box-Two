import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import CedulaInput from "../components/CedulaInput";
import ErrorSnackbar from "../components/ErrorSnackbar";
import '../styles/styles.css';

const CedulaScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cardId, setCedula] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    // VALIDAR QUE SEAN 10 DIGITOS
    if (!/^\d{10}$/.test(cardId)) {
      alert(
        "Por favor ingresa un número de cédula válido (10 dígitos, sin guión)."
      );
      return;
    }

    // VALIDAR QUE SEA ECUATORIANA
    if (!isValidEcuadorianCedula(cardId)) {
      alert("Por favor ingresa un número de cédula válido.");
      return;
    }

    try {
      // ENDPOINT GET CEDULA
      const response = await fetch(
        `http://localhost:8000/person/cardId/${cardId}`
      );

      if (response.status === 200) {
        console.log("Cédula registrada");
        navigate("/invoice");
      } else if (response.status === 400) {
        console.log("Cédula no registrada");
        alert("Cédula no registrada.");
        navigate("/register");
      } else {
        alert("Error en la verificación de la cédula.");
        throw new Error("Respuesta no OK");
      }
    } catch (error) {
      console.error("Error al verificar la cédula:", error);
      setError("Error al verificar la cédula. Por favor, intenta nuevamente.");
    }
    localStorage.setItem("cardId", cardId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validar que solo se ingresen números
    if (/^\d*$/.test(value) && value.length <= 10) {
      setCedula(value);
    }
  };

  const isValidEcuadorianCedula = (cedulaId: string): boolean => {
    const provinceCode = parseInt(cedulaId.substring(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) {
      return false;
    }

    const thirdDigit = parseInt(cedulaId.charAt(2), 10);
    if (thirdDigit >= 6) {
      return false;
    }

    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digits = cedulaId.split("").map(Number);
    let sum = 0;

    for (let i = 0; i < coefficients.length; i++) {
      let value = coefficients[i] * digits[i];
      sum += value >= 10 ? value - 9 : value;
    }

    const verifierDigit = (10 - (sum % 10)) % 10;
    return verifierDigit === digits[9];
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
          Ingresa tu número de cédula
        </Typography>
        <CedulaInput cardId={cardId} handleChange={handleChange} />
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerification}
            sx={{ width: "200px", height: "50px", fontSize: "18px" }}
          >
            Verificar
          </Button>
        </Box>
      </Box>
      {error && <ErrorSnackbar error={error} setError={setError} />}
    </Container>
  );
};

export default CedulaScreen;