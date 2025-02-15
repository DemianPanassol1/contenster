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
    path: 'users/:type?/:id?',
    element: <Users />,
  },
  {
    path: 'roles/:type?/:id?',
    element: <Roles />,
  },
  {
    path: 'profile/:type?/:id?',
    element: <Profile />,
  },
  {
    path: 'modules/:type?/:id?',
    element: <Modules />,
  },
  {
    path: 'permissions/:type?/:id?',
    element: <Permissions />,
  },
  {
    path: 'establishments/:type?/:id?',
    element: <Establishments />,
  },
  {
    path: 'functionalities/:type?/:id?',
    element: <Functionalities />,
  },
  {
    path: 'establishment-roles/:type?/:id?',
    element: <EstablishmentRoles />,
  },
  {
    path: 'establishment-users/:type?/:id?',
    element: <EstablishmentUsers />,
  },
];
