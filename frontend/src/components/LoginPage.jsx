// import axios from 'axios';
import React, { useRef, useState } from 'react';
// import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
// import { Button, Form, Row, Col, Card } from 'react-bootstrap';
// import { useLocation, useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
// import useAuth from '../hooks/index.jsx';
// import routes from '../routes.js';
import imagePath from '../assets/login img.jpg';

const LoginPage = () => {
  // const auth = useAuth();
  /* eslint-disable-next-line */
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  /* eslint-disable-next-line */
  console.log(inputRef);
  // const location = useLocation();
  // const navigation = useNavigate();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // onSubmit: async (values) => {
    //   setAuthFailed(false);
    // },
  });
  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={imagePath} className="rounded-circle" alt="Войти" />
            </Col>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1 className="text-center mb-4">Войти</h1>
              <fieldset disabled={formik.isSubmitting}>
                <Form.Group className="mb-3 form-floating" controlId="username">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" className="invalid-tooltip">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </fieldset>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              {' '}
              <a href="/signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
