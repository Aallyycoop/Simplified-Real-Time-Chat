import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAuth from '../hooks/index.jsx';
import fetchData from '../slices/fetchData.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const ChatPage = () => {
  const auth = useAuth();
  // console.log('auth', auth);

  const dispatch = useDispatch();

  const token = auth.getToken();

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  // const channels = JSON.stringify(useSelector((state) => state.channels), null, 2);
  // const messages = JSON.stringify(useSelector((state) => state.messages), null, 2);

  // console.log('channels', channels);
  // console.log('messages', messages);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
