import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import CreatePassword from './CreatePassword';

export default [
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
