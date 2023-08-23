import React, { useCallback, useMemo } from 'react';
import { SocketContext } from './index.jsx';

const SocketProvider = ({ socket, children }) => {
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

  // const getSocketPromise = useCallback((...args) => new Promise((resolve, reject) => {
  //   socket.timeout(5000).emit(...args, (err) => {
  //     /* eslint-disable-next-line */
  //     if (err) {
  //       reject(err);
  //     }
  //     resolve();
  //   });
  // }), [socket]);

  // const socketApi = useMemo(() => (
  //   {
  //     sendMessage: (...args) => getSocketPromise('newMessage', ...args),
  //     newChannel: (...args) => getSocketPromise('newChannel', ...args),
  //     renameChan: (...args) => getSocketPromise('renameChannel', ...args),
  //     removeChan: (...args) => getSocketPromise('removeChannel', ...args),
  //   }), [getSocketPromise]);

  return (
    <SocketContext.Provider value={socketApi}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
