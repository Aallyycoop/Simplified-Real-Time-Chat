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

  return (
    <Col className="p-0 h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelName}`}</b>
        </p>
        <span className="text-muted">{`${messages.length} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map((message) => (
          <div key={message} className="text-break mb-2">{message}</div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
