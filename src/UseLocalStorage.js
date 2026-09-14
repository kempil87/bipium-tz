import { useCallback, useEffect, useState } from "react";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const isEmptyValue = (value) => {
  return value === "" || value === null || value === undefined;
};

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

const writeStorageValue = (key, value, shouldClearEmpty) => {
  if (!key || !canUseStorage()) {
    return;
  }

  try {
    if (shouldClearEmpty && isEmptyValue(value)) {
      window.localStorage.removeItem(key);

      return;
    }

    const serialized = JSON.stringify(value);

    if (window.localStorage.getItem(key) === serialized) {
      return;
    }

    window.localStorage.setItem(key, serialized);
  } catch {
    return;
  }
};

export const useLocalStorage = (storageKey, options = {}) => {
  const { initialValue = "", shouldClearEmpty = false } = options;

  const [value, setValue] = useState(() => {
    return readStorageValue(storageKey) ?? initialValue;
  });

  const dispatch = useCallback(
    (newValue) => {
      setValue(newValue);
      writeStorageValue(storageKey, newValue, shouldClearEmpty);
    },
    [storageKey, shouldClearEmpty],
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
        setValue(initialValue);

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
  }, [initialValue, storageKey]);

  return [value, dispatch];
};
