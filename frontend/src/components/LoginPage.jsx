import axios from 'axios';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import imagePath from '../assets/login img.png';

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    /* eslint-disable-next-line */
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(
          routes.loginPath(),
          { username: username.toLowerCase(), password },
        );

        localStorage.setItem('userId', JSON.stringify(res.data));

        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);

        /* eslint-disable-next-line */
        if (err.message === 'Network Error') {
          toast.error(t('toast.connectionError'));
        }
        /* eslint-disable-next-line */
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imagePath} className="img-fluid" alt={t('loginPage.login')} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('loginPage.nickname')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('loginPage.nickname')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('loginPage.password')}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid">{t('loginPage.unsuccessLogin')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('loginPage.login')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAcc')}</span>
                {' '}
                <a href="/signup">{t('loginPage.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
