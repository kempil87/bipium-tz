import { useCallback, useEffect, useState } from "react";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readStorageValue = (key) => {
  if (!key || !canUseStorage()) {
    return;
  }

  try {
    const raw = window.localStorage.getItem(key);

    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return;
  }
};

const writeStorageValue = (key, value) => {
  if (!key || !canUseStorage()) {
    return;
  }

  try {
    const serialized = JSON.stringify(value);

    if (window.localStorage.getItem(key) === serialized) {
      return;
    }

    window.localStorage.setItem(key, serialized);
  } catch {
    return;
  }
};

export const useLocalStorage = (storageKey, initialValue = "") => {
  const [value, setValue] = useState(() => {
    return readStorageValue(storageKey) ?? initialValue;
  });

  const dispatch = useCallback(
    (newValue) => {
      setValue(newValue);
      writeStorageValue(storageKey, newValue);
    },
    [storageKey],
  );

  useEffect(() => {
    if (!storageKey || !canUseStorage()) {
      return;
    }

    const handleStorage = (event) => {
      if (
        event.key !== storageKey ||
        event.storageArea !== window.localStorage
      ) {
        return;
      }

      if (event.newValue == null) {
        setValue("");

        return;
      }

      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        return;
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [storageKey]);

  return [value, dispatch];
};
