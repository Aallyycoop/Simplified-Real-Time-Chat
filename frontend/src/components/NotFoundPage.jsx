import imageNotFoundPath from '../assets/error img.svg';

const NotFoungPage = () => (
  <div className="text-center">
    <img src={imageNotFoundPath} className="img-fluid h-25" alt="Страница не найдена" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href="/">На главную страницу</a>
    </p>
  </div>
);

export default NotFoungPage;
