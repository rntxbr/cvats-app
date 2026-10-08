import { useEffect, useState } from "react";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "@/app/lib/redux/local-storage";
import { setResume } from "@/app/lib/redux/resumeSlice";
import { setSettings } from "@/app/lib/redux/settingsSlice";
import { type AppDispatch, type RootState, store } from "@/app/lib/redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  const [saveFailed, setSaveFailed] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const flush = () => {
      if (!timer) return;
      clearTimeout(timer);
      timer = undefined;
      setSaveFailed(!saveStateToLocalStorage(store.getState()));
    };
    const unsubscribe = store.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(flush, 250);
    });
    window.addEventListener("pagehide", flush);
    return () => {
      flush();
      unsubscribe();
      window.removeEventListener("pagehide", flush);
    };
  }, []);
  return saveFailed;
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      dispatch(setResume(state.resume));
    }
    if (state.settings) {
      dispatch(setSettings(state.settings));
    }
  }, [dispatch]);
};
