export interface ErrorItem {
  id: string;
  message: string;
  status: string;
  datetime: string;
}

export interface ResponseFormat<T> {
  version: string;
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
