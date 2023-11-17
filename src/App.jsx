
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserVerificationPage from './pages/UserVerificationPage';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />	
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/users/verify/:emailToken" element={<UserVerificationPage />} />
        {/* Usuario */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
