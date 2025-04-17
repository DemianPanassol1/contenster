type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface DecodedJWT {
  exp: number;
  [key: string]: unknown;
}

interface FetchOptions {
  method?: HTTPMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

interface ErrorObject {
  id: string;
  code: number;
  message: string;
  errorType: string;
}
