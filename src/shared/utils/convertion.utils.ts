export const parseNum = ({ value }: { value: any }): number =>
  value === null || value === undefined || isNaN(Number.parseInt(value))
    ? null
    : Number.parseInt(value);

export const parseBool = ({ value }: { value: any }): boolean => {
  if (typeof value === 'boolean') return value;
  if (value === '1' || value === 1) return true;
  if (value === '0' || value === 0) return false;
  try {
    return Boolean(JSON.parse(value));
  } catch {
    return null;
  }
};

export const parseString = ({ value }: { value: any }): string => {
  if (typeof value !== 'string' || !value.trim()) return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const requiredField = (field: string, message?: string) => ({
  message: message || `Campo "${field}" é obrigatório`,
});

export const miliToString = (timestamp: number): string | null => {
  if (!Number.isFinite(timestamp) || timestamp < 0) return null;

  if (timestamp < 1000) {
    return `${timestamp}ms`;
  } else if (timestamp < 60000) {
    return `${(timestamp / 1000).toFixed(2)}s`;
  } else if (timestamp < 3600000) {
    const min = Math.floor(timestamp / 60000);
    const sec = Math.floor((timestamp % 60000) / 1000);
    return `${min}m${sec}s`;
  }
  const hr = Math.floor(timestamp / 3600000);
  const min = Math.floor((timestamp % 3600000) / 60000);
  return `${hr}h${min}m`;
};

export const bytesToString = (bytes: number): string | null => {
  if (!Number.isFinite(bytes) || bytes < 0) return null;

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${bytes.toFixed(2)}${units[unitIndex]}`;
};
