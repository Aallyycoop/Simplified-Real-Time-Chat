import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Link,
} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import { AuthContext, SocketContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import { actions } from '../slices/messagesSlice';

const AuthProvider = ({ children }) => {
  // console.log('localStorage', localStorage);
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
    return {};
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
  console.log('auth', auth);

  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const LogOutButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => {
  const socket = io('ws://localhost:3000');
  const dispatch = useDispatch();

  const { addMessage } = actions;

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('newMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* eslint-disable-next-line */
  const socketApi = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
  };

  return (
    <SocketContext.Provider value={socketApi}>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar className="shadow-sm" bg="white" expand="lg">
              <div className="container">
                <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
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
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </SocketContext.Provider>
  );
};

export default App;
