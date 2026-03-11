import { titles } from '@/constants';

export const tokenManager = (() => {
  const STORAGE_KEY = titles.ACCESS_TOKEN;
  let _token: string | null =
    typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

  return {
    getToken(): string | null {
      return (
        _token ??
        (typeof window !== 'undefined'
          ? localStorage.getItem(STORAGE_KEY)
          : null)
      );
    },

    setToken(token: string) {
      _token = token;
      if (typeof window !== 'undefined')
        localStorage.setItem(STORAGE_KEY, token);
    },

    clear() {
      _token = null;
      if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    },
  };
})();
