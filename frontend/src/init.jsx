import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import App from './components/App.jsx';

import resources from './locales/index.js';

export default async () => {
  const defaultLanguage = 'ru';
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      debug: false,
      resources,
    });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <App />
    </I18nextProvider>
  );
};
