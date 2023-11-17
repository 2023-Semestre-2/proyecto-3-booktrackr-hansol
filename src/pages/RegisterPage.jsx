
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import './RegisterPage.css'; // Asegúrate de tener este archivo para los estilos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import NotificationContainer from '../components/NotificationContainer';

import axios from 'axios';

const RegisterPage = () => {
  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const url = "http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/register";

    const body = {
      "role": "user",
      "username": event.target.username.value,
      "email": event.target.email.value,
      "password": event.target.password.value,
      "first_name": event.target.first_name.value,
      "last_name": event.target.last_name.value,
      "phone": event.target.phone.value
    }

    try {
      const response = await axios.post(url, body);
      console.log(response);
      window.addNotification("Success", "Registro exitoso", "#00C851");
    }
    catch (err) {
      console.log(err);

      if (err.response?.data?.error === 'Username or email already exists') {
        window.addNotification("Error", "El usuario o email ya existe", "#f44336");
      }
      else {
        window.addNotification("Error", "Error al registrarse", "#f44336");
      }
    }
  
  };

  return (
    <Box className="register-page">
      <NotificationContainer />

      <Paper className="register-banner">
        {/* Banner: puede ser una imagen o un elemento estilizado */}
      </Paper>
      
      <Box className="register-form-container">
        <Typography variant="h4" className="register-header">
          Registro
        </Typography>
        <form className="register-form" onSubmit={handleSubmit}>
          <TextField label="Nombre de Usuario" name="username" variant="outlined" fullWidth margin="normal" />
          <TextField label="Email" type="email" name="email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Contraseña" type="password" name="password" variant="outlined" fullWidth margin="normal" />
          <TextField label="Nombre" variant="outlined" name="first_name" fullWidth margin="normal" />
          <TextField label="Apellido" variant="outlined" name="last_name" fullWidth margin="normal" />
          <TextField label="Teléfono" variant="outlined" name="phone" fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" fullWidth className="register-button">
            Registrarse
          </Button>
          <Button
            variant="text"
            color="primary"
            startIcon={<ArrowBackIcon />}
            href="/login"
            className="forgot-password-back"
          >
            Volver al Inicio de Sesión
          </Button>
        </form>
      </Box>

      
    </Box>
  );
};

export default RegisterPage;
