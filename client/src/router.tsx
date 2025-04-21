import { createBrowserRouter } from 'react-router-dom';

// ========== COMMON VIEWS ========== //

import Error from '@/views/general/Error';
import Auth from '@/views/public/common/Auth';
import Admin from '@/views/private/common/Admin';

// ========== PUBLIC VIEWS ========== //

import publicContensterViews from '@/views/public/contenster';

// ========== PRIVATE VIEWS ========== //

import privatePortfolioViews from '@/views/private/portfolio';
import privateContensterViews from '@/views/private/contenster';

// ========== ======= ========== //
// ========== ROUTER ========== //
// ========== ======= ========== //

export default createBrowserRouter([
  {
    path: '/',
    element: <Admin />,
    errorElement: <Error />,
    children: [...privateContensterViews, ...privatePortfolioViews],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <Error />,
    children: [...publicContensterViews],
  },
]);
