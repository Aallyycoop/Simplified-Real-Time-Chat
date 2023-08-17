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
import AuthProvider from '../contexts/AuthProvider';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes';

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
              path={routes.chatPagePath()}
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
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
