import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../hooks/index.jsx';
import { fetchData } from '../slices/dataSlice';

const ChatPage = () => {
  const auth = useAuth();
  console.log('auth', auth);

  const dispatch = useDispatch();

  const token = auth.getToken();

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  const data = JSON.stringify(useSelector((state) => state.data), null, 2);

  console.log('data', data);
  return (
    data
  );
};

export default ChatPage;
