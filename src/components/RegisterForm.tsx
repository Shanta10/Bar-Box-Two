import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import TextFieldWithValidation from "./TextFieldWithValidation";
import '../styles/styles.css';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardId: "",
    names: "",
    email: "",
    cellphone: "",
  });
  const [errors, setErrors] = useState({
    names: "",
    email: "",
    cellphone: "",
  });

  useEffect(() => {
    const storedCedula = localStorage.getItem("cardId") || "";
    setFormData((prevData) => ({
      ...prevData,
      cardId: storedCedula,
    }));
  }, []);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "names":
        if (value.trim() === "") {
          return "El nombre no puede estar en blanco";
        }
        if (!/^[a-zA-Z\sáéíóúñÁÉÍÓÚÑ]*$/.test(value)) {
          return "El nombre solo debe contener letras y espacios";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ingresa un email válido";
        }
        break;
      case "cellphone":
        if (!/^09\d{8}$/.test(value)) {
          return "Ingresa un número de celular válido";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validate(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    pattern: RegExp
  ) => {
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    const nombreError = validate("names", formData.names);
    const correoError = validate("email", formData.email);
    const celularError = validate("cellphone", formData.cellphone);

    if (nombreError || correoError || celularError) {
      setErrors({
        names: nombreError,
        email: correoError,
        cellphone: celularError,
      });
      alert("Verifica que los datos ingresados sean correctos");
      return;
    }

    try {
      // ENDPOINT POST PARA GUARDAR CLIENTE
      const response = await fetch("http://localhost:8000/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem("formData", JSON.stringify(formData));
        navigate("/invoice");
      } else {
        console.error("Error al registrar el cliente:", response.statusText);
        alert(
          "Ocurrió un error al registrar el cliente. Inténtalo nuevamente."
        );
      }
    } catch (error) {
      console.error("Error en la llamada al backend:", error);
      alert(
        "Ocurrió un error al conectar con el servidor. Inténtalo nuevamente."
      );
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
          REGISTRO
        </Typography>
        <TextFieldWithValidation
          label="Cédula"
          name="cardId"
          value={formData.cardId}
          onChange={handleChange}
          inputProps={{ readOnly: true }}
        />
        <TextFieldWithValidation
          label="Nombre y Apellido"
          name="names"
          value={formData.names}
          onChange={handleChange}
          onKeyPress={(e) =>
            handleKeyPress(e as React.KeyboardEvent<HTMLInputElement>, /^[a-zA-Z\sáéíóúñÁÉÍÓÚÑ]*$/)
          }
          error={errors.names}
          helperText={errors.names}
        />
        <TextFieldWithValidation
          label="Correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email}
        />
        <TextFieldWithValidation
          label="Celular"
          name="cellphone"
          value={formData.cellphone}
          onChange={handleChange}
          onKeyPress={(e) =>
            handleKeyPress(e as React.KeyboardEvent<HTMLInputElement>, /^[0-9]*$/)
          }
          error={errors.cellphone}
          helperText={errors.cellphone}
          inputProps={{ maxLength: 10 }}
        />
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "200px", height: "50px", fontSize: "18px" }}
          >
            GUARDAR
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;