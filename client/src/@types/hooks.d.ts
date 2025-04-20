type NavigateFunction = (url?: string | number) => void;

interface ToastProps {
  anchorOrigin: {
    horizontal: 'right' | 'left' | 'center';
    vertical: 'top' | 'bottom';
  };
  action: (snackId: string | number) => JSX.Element;
}

interface PageKey {
  key1: number;
  key2: number;
  key3: number;
}

interface RouteParams {
  id: string;
  type: string;
  slug: string;
}

interface UseGETResponse<T> {
  data: T | undefined;
  isLoading: boolean;
  refresh: (key?: string) => Promise<void>;
}

interface UsePOSTResponse<T> {
  data: T | undefined;
  isLoading: boolean;
  refresh: (key?: string) => Promise<void>;
}
