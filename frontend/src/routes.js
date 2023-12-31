const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  chatPagePath: () => '/',
};
