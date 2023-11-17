
import { TextField, Button, Box, Paper, Typography, Link } from '@mui/material';
import './LoginPage.css';

import LockResetIcon from '@mui/icons-material/LockReset';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import NotificationContainer from '../components/NotificationContainer';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {

    event.preventDefault();
    // Lógica de autenticación

    const url = 'http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/login';

    const body = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    
    try {
      const response = await axios.post(url, body);
      console.log(response);
      const session_token = response.data.session_token;
      const user = response.data.user;

      localStorage.setItem('session_token', session_token);
      localStorage.setItem('user', JSON.stringify(user));

      window.addNotification("Success", "Inicio de sesión exitoso", "#00C851");

      // Navigation to home
      navigate('/home');


    } catch (err) {
      console.log(err);
      if (err && err.response && err.response.data && err.response.data.error === 'Account not verified') {
        window.addNotification("Error", "Cuenta no verificada", "#f44336");
      }

      else {
        window.addNotification("Error", "Error al iniciar sesión", "#f44336");
      }
      
    }

  };

  return (
    <Box className="login-page">
      <NotificationContainer />
      <Paper className="login-banner">
      </Paper>
      <Box className="login-form-container">
        <Typography variant="h4" className="login-header">
          Inicio de Sesión
        </Typography>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField label="Nombre de Usuario" name="email" variant="outlined" fullWidth margin="normal" />
          <TextField label="Contraseña" type="password" name="password" variant="outlined" fullWidth margin="normal" />
          <Button type='submit' variant="contained" color="primary" fullWidth className="login-button">
            Iniciar Sesión
          </Button>
          <Box className="login-links">
            <Link href="/forgot-password" className="login-link">
              <LockResetIcon className="link-icon" /> Olvidé mi Contraseña
            </Link>
            <Link href="/register" className="login-link">
              <PersonAddIcon className="link-icon" /> Registrarse
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
