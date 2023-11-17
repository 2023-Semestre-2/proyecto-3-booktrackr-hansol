import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el envío del formulario
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Lógica para restablecer la contraseña
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" className="reset-password-container">
      <Box className="reset-password-box">
        <Typography variant="h5" className="reset-password-title">
          Restablecer Contraseña
        </Typography>
        <form className="reset-password-form" /* onSubmit={handleSubmit} */>
          <TextField
            label="Nueva Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmar Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="reset-password-submit"
          >
            Guardar
          </Button>
        </form>
        <Button
          variant="text"
          color="primary"
          startIcon={<ArrowBackIcon />}
          href="/login"
          className="reset-password-back"
        >
          Volver al Inicio de Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
