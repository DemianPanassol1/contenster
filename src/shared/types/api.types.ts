export interface ErrorItem {
  id: string;
  message: string;
  errorType: string;
}

export interface ResponseFormat<T> {
  lang: string;
  requestId: string;
  statusCode: number;
  status: string;
  body: T | null;
  errors: {
    count: number;
    items: ErrorItem[];
  };
  datetime: string;
  requestTime: string;
}

export interface IToOptions {
  value: string;
  label: string;
}
