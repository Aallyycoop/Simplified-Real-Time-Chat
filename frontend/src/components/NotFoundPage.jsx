import { useTranslation } from 'react-i18next';
import imageNotFoundPath from '../assets/error img.png';
import routes from '../routes';

const NotFoungPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5">
      <img src={imageNotFoundPath} className="img-fluid h-25" alt={t('notFoundPage.pageNotFound')} />
      <h1 className="h4 text-muted">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.transition')}
        {' '}
        <a href={routes.chatPagePath()}>{t('notFoundPage.toMainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoungPage;
