import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';

const MessageForm = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      console.log(message);
      formik.resetForm();
    },
  });
  console.log(formik.values);

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.message}
          className="border-0 p-0 ps-2"
          placeholder="Введите сообщение..."
          name="message"
          aria-label="Новое сообщение"
          ref={inputRef}
          autoComplete="off"
        />
        <Button type="submit" className="btn-group-vertical border-0" variant="" disabled={formik.values.message === formik.initialValues.message}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </Button>
      </Form.Group>

    </Form>
  );
};

export default MessageForm;
