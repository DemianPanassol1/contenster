import { useRouteParams } from '@/hooks/router.hook';

import {
  SESSION_STATE,
  SESSION_EXPIRED_EVENT,
  SESSION_EXPIRED_EVENT_DETAIL,
} from '@/utils/consts.util';

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

  return (
    session?.permissions?.find((item) => item.slug === searchSlug || slug) ?? {
      id: 0,
      slug: slug || '',
      title: '',
      canRead: true,
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      type: 'general',
    }
  );
};

export { useSession, usePermission };
