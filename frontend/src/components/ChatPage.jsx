import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '../hooks/index.jsx';
import fetchData from '../slices/fetchData.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const ChatPage = () => {
  const auth = useAuth();

  const dispatch = useDispatch();

  const token = auth.getToken();

  useEffect(() => {
    dispatch(fetchData(token))
      .unwrap()
      .catch((error) => {
        /* eslint-disable-next-line */
        if (error.message === 'Request failed with status code 500' || error.message === 'Request failed with status code 401') {
          auth.logOut();
        }
      });
  }, [dispatch, token, auth]);

  return (
    <div className="chat-box container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
