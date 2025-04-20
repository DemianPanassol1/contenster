import { useCallback } from 'react';
import { useNavigate as useNavigateHook } from 'react-router-dom';

const useRouteParams = (): RouteParams => {
  const { pathname } = new URL(window.location.href);
  const [slug, type, id] = pathname.split('/').filter(Boolean);

  return {
    id: id ?? null,
    type: type ?? null,
    slug: slug ?? null,
  };
};

const useNavigate = (): NavigateFunction => {
  const { slug } = useRouteParams();
  const navigate = useNavigateHook();

  return useCallback(
    (url?: string | number) => {
      if (typeof url === 'number') {
        return navigate(url);
      }

      navigate(url || `/${slug}`);
    },
    [navigate, slug]
  );
};

export { useRouteParams, useNavigate };
