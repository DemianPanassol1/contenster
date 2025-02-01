import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import CreatePassword from './CreatePassword';

export const authViews = [
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'create-password/:token?',
    element: <CreatePassword />,
  },
];
