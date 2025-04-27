import { useRouteParams } from '@/hooks/router.hook';

import {
  SESSION_STATE,
  HOMEPAGE_STATE,
  SESSION_EXPIRED_EVENT,
  SESSION_EXPIRED_EVENT_DETAIL,
} from '@/utils/consts.util';
import { getDefaultPermission } from '@/utils/functions.util';

const useSession = (): Session | null => {
  const session = sessionStorage.getItem(SESSION_STATE);

  if (!session) {
    window.dispatchEvent(
      new CustomEvent(SESSION_EXPIRED_EVENT, {
        detail: SESSION_EXPIRED_EVENT_DETAIL,
      })
    );

    return null;
  }

  return JSON.parse(session) as Session;
};

const usePermission = (searchSlug?: string): Permission => {
  const session = useSession();
  const { slug } = useRouteParams();

  if (!session) {
    window.dispatchEvent(
      new CustomEvent(SESSION_EXPIRED_EVENT, {
        detail: SESSION_EXPIRED_EVENT_DETAIL,
      })
    );
  }

  const permission = (session?.permissions ?? []).find(
    (item) => item.slug === slug || item.slug === String(searchSlug)
  );

  return permission ?? getDefaultPermission(slug || searchSlug);
};

const useHomePage = (): HomePage | null => {
  const homePage = sessionStorage.getItem(HOMEPAGE_STATE);

  if (!homePage) {
    return null;
  }

  return JSON.parse(homePage) as HomePage;
};

export { useSession, usePermission, useHomePage };
