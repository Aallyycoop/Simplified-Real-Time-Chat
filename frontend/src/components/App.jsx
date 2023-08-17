import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import { AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(user && user.token);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getToken = () => {
    if (loggedIn) {
      return user.token;
    }
    return null;
  };

  return (
    /* eslint-disable-next-line */
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const LogOutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('loginPage.logout')}</Button>
      : null
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar className="shadow-sm" bg="white" expand="lg">
            <div className="container">
              <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
              <LogOutButton />
            </div>
          </Navbar>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
