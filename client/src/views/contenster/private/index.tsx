import Users from './Users';
import Roles from './Roles';
import Profile from './Profile';
import Modules from './Modules';
import Permissions from './Permissions';
import Establishments from './Establishments';
import Functionalities from './Functionalities';
import EstablishmentRoles from './EstablishmentRoles';
import EstablishmentUsers from './EstablishmentUsers';

export const adminViews = [
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'roles',
    element: <Roles />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'modules',
    element: <Modules />,
  },
  {
    path: 'permissions',
    element: <Permissions />,
  },
  {
    path: 'establishments',
    element: <Establishments />,
  },
  {
    path: 'functionalities',
    element: <Functionalities />,
  },
  {
    path: 'establishment-roles',
    element: <EstablishmentRoles />,
  },
  {
    path: 'establishment-users',
    element: <EstablishmentUsers />,
  },
];
