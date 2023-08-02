import { useSelector } from 'react-redux';
import {
  Col,
} from 'react-bootstrap';
import MessageForm from './MessageForm';

const Messages = () => {
  const { messages } = useSelector((state) => state.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';

  const messagesOfCurrentChannel = messages
    .filter((message) => message.channelId === currentChannelId);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{`${messagesOfCurrentChannel.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesOfCurrentChannel.map(({ id, user, message }) => (
            <div key={id} className="text-break mb-2">
              <b>{user}</b>
              :
              {' '}
              {message}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
