import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as modalActions } from '../../slices/modalSlices';
import { useSocket } from '../../hooks';

const Add = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channels);
  const { isShown } = useSelector((state) => state.modals);

  const channelsNames = channels.map(({ name }) => name);

  const { setCurrentChannel } = channelsActions;
  const { hideModal } = modalActions;

  const channelNameSchema = yup.object().shape({
    name: yup.string().trim()
      .required(t('required'))
      .notOneOf(channelsNames, t('shouldBeUniq')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameSchema,
    onSubmit: async (values) => {
      try {
        const preparedName = filter.clean(values.name.trim());
        formik.values.name = preparedName;

        await channelNameSchema.validate({ name: preparedName });
        const response = await socketApi.newChannel({ name: preparedName });
        dispatch(setCurrentChannel(response.data.id));
        dispatch(hideModal());
        toast.success(t('toast.channelCreate'));
        formik.resetForm();
      } catch (error) {
        formik.setFieldError('name', error.message);
        console.error(error);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show={isShown} centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                placeholder={t('channels.name')}
                id="name"
                className="mb-2"
                isInvalid={(formik.errors.name && formik.touched.name)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              <Form.Label htmlFor="name" hidden>{t('channels.name')}</Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">{t('cancel')}</Button>
              <Button type="submit" variant="primary">{t('send')}</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
