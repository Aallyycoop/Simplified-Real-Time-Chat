import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import * as yup from 'yup';
import { AiOutlineSend } from 'react-icons/ai';
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
          <AiOutlineSend size={20} color="#0d6efd" />
          <span className="visually-hidden">{t('send')}</span>
        </Button>
      </Form.Group>

    </Form>
  );
};

export default MessageForm;
