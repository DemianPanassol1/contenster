import { useMemo, useRef } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';

const useGenPageKey = (): PageKey => {
  const { current } = useRef({
    key1: Math.random() * 100,
    key2: Math.random() * 100,
    key3: Math.random() * 100,
  });

  return useMemo(() => current, [current]);
};

const useMobileScreen = (): boolean =>
  useMediaQuery('only screen and (max-width : 768px)');

export { useGenPageKey, useMobileScreen };
