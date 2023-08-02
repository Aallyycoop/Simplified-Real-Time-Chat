import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button,
} from 'react-bootstrap';
import { actions as channelsActions } from '../slices/channelsSlice';
import Modal from './modals/Modal.jsx';

const Channels = () => {
  const { setCurrentChannel } = channelsActions;

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  console.log('channels', channels);

  const dispatch = useDispatch();
  const handleSetChannel = (id) => dispatch(setCurrentChannel(id));

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Modal />
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id }) => (
          <li key={id} className="nav-item w-100">
            <Button variant={id === currentChannelId ? 'secondary' : ''} className="w-100 rounded-0 text-start" onClick={() => handleSetChannel(id)}>
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
