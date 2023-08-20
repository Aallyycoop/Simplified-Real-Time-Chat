import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlices';
import Modal from './modals/Modal.jsx';

const UnchangedChannelButton = (name, id, currentChannelId, handleSetChannel) => (
  <Button variant={id === currentChannelId ? 'primary' : ''} className="w-100 text-start border-primary" onClick={() => handleSetChannel(id)}>
    <span className="me-1">#</span>
    {name}
  </Button>
);

const ChangedChannelButton = (name, id, currentChannelId, handleSetChannel, dispatch, t) => {
  const { showModal, setChannelId } = modalActions;

  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button variant={id === currentChannelId ? 'primary' : ''} className="w-100 text-start text-truncate border-primary border-right-0" onClick={() => handleSetChannel(id)}>
        <span className="me-1">#</span>
        {name}
      </Button>

      <Dropdown.Toggle split variant={id === currentChannelId ? 'primary' : ''} id="react-aria5875383625-1" className="border-primary border-left-0">
        <span className="visually-hidden">{t('channels.control')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-0">
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ type: 'removing' })); dispatch(setChannelId({ id })); }}
          className="py-2"
        >
          {t('channels.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ type: 'renaming' })); dispatch(setChannelId({ id })); }}
          className="py-2"
        >
          {t('channels.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = () => {
  const { setCurrentChannel } = channelsActions;
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setCurrentChannel(id));

  const channelsBox = useRef();

  const activeChannel = useRef();

  useEffect(() => {
    setTimeout(() => {
      activeChannel.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [channels]);

  return (
    <Col className="bg-color-chat-page col-4 col-md-2 px-0 flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Modal />
      </div>
      <ul id="channels-box" ref={channelsBox} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id, removable }) => (
          <li key={id} className="nav-item w-100 py-1" ref={id === currentChannelId ? activeChannel : null}>
            {!removable && UnchangedChannelButton(name, id, currentChannelId, handleSetChannel)}
            {removable
              && ChangedChannelButton(name, id, currentChannelId, handleSetChannel, dispatch, t)}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
