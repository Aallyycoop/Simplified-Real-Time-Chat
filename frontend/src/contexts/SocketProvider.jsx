import React, { useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index.jsx';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const { addMessage } = messagesActions;
  const { addChannel, renameChannel, removeChannel } = channelsActions;

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('newMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    return () => {
      socket.off('newChannel');
    };
  });

  useEffect(() => {
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
    return () => {
      socket.off('renameChannel');
    };
  });

  useEffect(() => {
    socket.on('removeChannel', (channelId) => {
      dispatch(removeChannel(channelId));
    });
    return () => {
      socket.off('removeChannel');
    };
  });

  const sendMessage = useCallback((...args) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newMessage', ...args, (err) => {
      /* eslint-disable-next-line */
      if (err) {
        reject(err);
      }
      resolve();
    });
  }), [socket]);

  const newChannel = useCallback((...args) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newChannel', ...args, (err, response) => {
      /* eslint-disable-next-line */
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  }), [socket]);

  const renameChan = useCallback((...args) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('renameChannel', ...args, (err, response) => {
      /* eslint-disable-next-line */
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  }), [socket]);

  const removeChan = useCallback((...args) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('removeChannel', ...args, (err, response) => {
      /* eslint-disable-next-line */
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  }), [socket]);

  const socketApi = useMemo(() => (
    {
      sendMessage,
      newChannel,
      renameChan,
      removeChan,
    }), [sendMessage, newChannel, renameChan, removeChan]);

  return (
    <SocketContext.Provider value={socketApi}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
