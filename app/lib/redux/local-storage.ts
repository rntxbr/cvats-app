import type { RootState } from "@/app/lib/redux/store";
import { validateState } from "@/app/lib/redux/validate-state";

// Reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

const LOCAL_STORAGE_KEY = "open-resume-state";

export const loadStateFromLocalStorage = () => {
  try {
    const stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stringifiedState) return undefined;
    return validateState(JSON.parse(stringifiedState));
  } catch (_e) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: RootState) => {
  try {
    const stringifiedState = JSON.stringify({ ...state, version: 1 });
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);
    return true;
  } catch (_e) {
    return false;
  }
};

export const getHasUsedAppBefore = () => Boolean(loadStateFromLocalStorage());
