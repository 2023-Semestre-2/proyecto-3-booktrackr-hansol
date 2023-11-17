import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import './UserVerificationPage.css';
import NotificationContainer from '../components/NotificationContainer';
import axios from 'axios';

const VerificationPage = () => {
  const { emailToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  useEffect(() => {
    if (verificationAttempted) {
      return;
    }

    const verifyAccount = async () => {
      if (!emailToken) {
        setVerificationMessage('No se ha proporcionado un token de verificación.');
        setVerificationStatus('error');
        window.addNotification("Error", "No se ha proporcionado un token de verificación.", "#f44336");
        return;
      }

      try {
        const url = `http://ec2-18-222-200-189.us-east-2.compute.amazonaws.com:3000/api/users/verify/${emailToken}`;
        const response = await axios.get(url);

        setVerificationMessage(response.data.message); // Asumiendo que la respuesta tiene un mensaje
        setVerificationStatus('success');
        window.addNotification("Éxito", response.data.message, "#4caf50");
        alert("Cuenta verificada con éxito");
        // Cerrar la pagina
        window.close();

      } catch (error) {
        console.log(error);
        setVerificationMessage(error.response?.data?.message || "Ha ocurrido un error en la verificación.");
        setVerificationStatus('error');
        window.addNotification("Error", error.response?.data.error || "Error de verificación", "#f44336");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } finally {
        setVerificationAttempted(true); // Indica que la verificación ya se ha intentado

        // App wait to avoid multiple calls of the same function
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    verifyAccount();
  }, [emailToken, verificationAttempted]); // Agrega verificationAttempted a la lista de dependencias

  return (
    <Box className="verification-page">
      <NotificationContainer />
      {verificationStatus === 'loading' && (
        <>
          <Typography variant="h4" className="verification-header">
            Verificando tu Cuenta...
          </Typography>
          <CircularProgress />
        </>
      )}
      {(verificationStatus === 'success' || verificationStatus === 'error') && (
        <>
          <Typography variant="h4" className="verification-header">
            {verificationMessage}
          </Typography>
          <Typography variant="body1">
            Ya puede cerrar esta página.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default VerificationPage;
