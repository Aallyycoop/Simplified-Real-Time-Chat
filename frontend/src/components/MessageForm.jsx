import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as yup from 'yup';
import { useSocket, useAuth } from '../hooks';

const messageSchema = yup.object().shape({
  body: yup.string().trim().min(1),
});

const MessageForm = () => {
  const socketApi = useSocket();
  const { user } = useAuth();
  const { t } = useTranslation();

  const { currentChannelId } = useSelector((state) => state.channels);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema,
    onSubmit: async ({ body }) => {
      try {
        const russianProfanity = filter.getDictionary('ru');
        filter.add(russianProfanity);
        const preparedMessage = filter.clean(body);

        await socketApi.sendMessage({
          message: preparedMessage,
          channelId: currentChannelId,
          user: user.username,
        });
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="py-1 border-0 rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.body}
          className="border-0 p-0 ps-2"
          placeholder={t('messages.enterMessage')}
          name="body"
          aria-label={t('messages.newMessage')}
          ref={inputRef}
          autoComplete="off"
        />
        <Button type="submit" className="border-0" variant="group-vertical" disabled={formik.values.body === formik.initialValues.body || formik.isSubmitting}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="#0d6efd"
          >
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{t('send')}</span>
        </Button>
      </Form.Group>

    </Form>
  );
};

export default MessageForm;
