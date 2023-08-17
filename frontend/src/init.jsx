import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';

import App from './components/App.jsx';
import resources from './locales/index.js';
import SocketProvider from './contexts/SocketProvider.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default async () => {
  const socket = io();
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      debug: false,
      resources,
    });

  const russianProfanity = filter.getDictionary('ru');
  filter.add(russianProfanity);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketProvider socket={socket}>
          <I18nextProvider i18n={i18nInstance}>
            <App />
          </I18nextProvider>
        </SocketProvider>
      </ErrorBoundary>
    </Provider>
  );
};
