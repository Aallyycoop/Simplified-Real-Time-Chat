import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { actions as modalActions } from '../../slices/modalSlices';
import { useSocket } from '../../hooks';
import { channelNameValidation } from './Add';

const Rename = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels } = useSelector((state) => state.channels);
  const { channelId } = useSelector((state) => state.modals);

  const channelsNames = channels.map(({ name }) => name);
  const renamingChannel = channels.find((channel) => channel.id === channelId);

  const { hideModal } = modalActions;

  const russianProfanity = filter.getDictionary('ru');
  filter.add(russianProfanity);

  const formik = useFormik({
    initialValues: { name: renamingChannel.name },
    validationSchema: channelNameValidation(channelsNames, t),
    onSubmit: async (values) => {
      try {
        const preparedName = filter.clean(values.name.trim());
        await socketApi.renameChan({ id: channelId, name: preparedName });
        dispatch(hideModal());
        toast.success(t('toast.channelRename'));
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    validateOnChange: false,
  });

  // ? не срабатывает селект на содержимом внутри инпута
  // при открытии модального окна переименовать
  const inputRef = useRef();

  // useEffect(() => {
  //   inputRef.current.select();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton onHide={() => dispatch(hideModal())}>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                required
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.errors.name ? filter.clean(formik.values.name) : formik.values.name}
                name="name"
                id="name"
                className="mb-2"
                isInvalid={(formik.errors.name && formik.touched.name)}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              <Form.Label htmlFor="name" visuallyHidden>{t('channels.name')}</Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button onClick={() => dispatch(hideModal())} type="button" className="me-2" variant="secondary">{t('cancel')}</Button>
              <Button type="submit" variant="primary">{t('send')}</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
