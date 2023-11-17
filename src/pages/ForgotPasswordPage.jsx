
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  // Función para manejar el envío del formulario
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Lógica para manejar la solicitud de recuperación de contraseña
  // };

  return (
    <Container maxWidth="sm" className="forgot-password-container">
      <Box className="forgot-password-box">
        <EmailIcon color="primary" style={{ fontSize: 60 }} />
        <Typography variant="h5" className="forgot-password-title">
          Recuperar Contraseña
        </Typography>
        <Typography variant="body1" className="forgot-password-instructions">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </Typography>
        <form className="forgot-password-form" /* onSubmit={handleSubmit} */>
          <TextField
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="forgot-password-submit"
          >
            Enviar Enlace
          </Button>
        </form>
      </Box>
      { /* Boton para regresar al login */ }
      <Button
        variant="text"
        color="primary"
        startIcon={<ArrowBackIcon />}
        href="/login" // Asegúrate de que esta ruta coincida con la ruta de tu página de inicio de sesión
        className="forgot-password-back"
      >
        Volver al Inicio de Sesión
      </Button>
    </Container>
  );
};

export default ForgotPasswordPage;
