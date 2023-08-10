import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlices';
import Modal from './modals/Modal.jsx';

const UnchangedChannelButton = (name, id, currentChannelId, handleSetChannel) => (
  <Button variant={id === currentChannelId ? 'primary' : ''} className="w-100 rounded-0 text-start" onClick={() => handleSetChannel(id)}>
    <span className="me-1">#</span>
    {name}
  </Button>
);

const ChangedChannelButton = (name, id, currentChannelId, handleSetChannel, dispatch, t) => {
  const { showModal, setChannelId } = modalActions;

  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button variant={id === currentChannelId ? 'primary' : ''} className="w-100 rounded-0 text-start text-truncate" onClick={() => handleSetChannel(id)}>
        <span className="me-1">#</span>
        {name}
      </Button>

      <Dropdown.Toggle split variant={id === currentChannelId ? 'primary' : ''} id="react-aria5875383625-1" />

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ type: 'removing' })); dispatch(setChannelId({ id })); }}
        >
          {t('channels.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => { dispatch(showModal({ type: 'renaming' })); dispatch(setChannelId({ id })); }}
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
  console.log('channels', channels);
  console.log('currentChannelId', currentChannelId);

  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setCurrentChannel(id));

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Modal />
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id, removable }) => (
          <li key={id} className="nav-item w-100">
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
