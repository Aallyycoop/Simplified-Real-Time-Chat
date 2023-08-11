import { useSelector } from 'react-redux';
import {
  Col,
} from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';
// import './messagesStyle.css';

const Messages = () => {
  const { t } = useTranslation();
  const { messages } = useSelector((state) => state.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const { username } = JSON.parse(localStorage.getItem('userId'));

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : 'general';

  const messagesOfCurrentChannel = messages
    .filter((message) => message.channelId === currentChannelId);

  const messageBox = useRef(null);

  // const scrollToBottom = () => {
  //   const { scrollHeight } = messageBox.current;
  //   const height = messageBox.current.clientHeight;
  //   const maxScrollTop = scrollHeight - height;
  //   messageBox.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  // };

  const scrollToBottom = (element) => {
    element.scrollTo(0, element.scrollHeight);
  };

  useEffect(() => scrollToBottom(messageBox.current), [messagesOfCurrentChannel]);

  // useEffect(() => scrollToBottom(), [messagesOfCurrentChannel]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{t('messages.message', { count: messagesOfCurrentChannel.length })}</span>
        </div>
        <div id="messages-box" ref={messageBox} className="chat-messages overflow-auto px-5">
          {messagesOfCurrentChannel.map(({ id, user, message }) => (
            <div key={id} className={username === user ? 'text-break mb-2' : 'message text-break mb-2'}>
              <b>{user}</b>
              {': '}
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
