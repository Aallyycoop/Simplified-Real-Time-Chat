import React, { useCallback, useMemo } from 'react';
import { SocketContext } from './index.jsx';

const SocketProvider = ({ socket, children }) => {
  const getWrapSocketPromise = useCallback((...args) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit(...args, (err, response) => {
      /* eslint-disable-next-line */
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  }), [socket]);

  const socketApi = useMemo(() => (
    {
      sendMessage: (...args) => getWrapSocketPromise('newMessage', ...args),
      newChannel: (...args) => getWrapSocketPromise('newChannel', ...args),
      renameChan: (...args) => getWrapSocketPromise('renameChannel', ...args),
      removeChan: (...args) => getWrapSocketPromise('removeChannel', ...args),
    }), [getWrapSocketPromise]);

  return (
    <SocketContext.Provider value={socketApi}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
