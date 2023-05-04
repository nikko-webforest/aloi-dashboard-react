import { useEffect, useState } from "react";

export function useSession(key, initialState) {
  const [value, __setValue] = useState(() => {
    const item = sessionStorage.getItem(key);
    const session = JSON.parse(item);

    if (session !== null) return session;

    const data = typeof initialState === "function" ? initialState(session) : initialState || null;

    if (data !== null) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }

    return data;
  });

  const setValue = (v) => {
    sessionStorage.setItem(key, JSON.stringify(v));
    __setValue(v);
  };

  return [value, setValue];
}

export default useSession;
