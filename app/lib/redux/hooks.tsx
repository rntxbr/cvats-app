import { useEffect } from "react";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { deepMerge } from "@/app/lib/deep-merge";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "@/app/lib/redux/local-storage";
import { initialResumeState, setResume } from "@/app/lib/redux/resumeSlice";
import { initialSettings, type Settings, setSettings } from "@/app/lib/redux/settingsSlice";
import { type AppDispatch, type RootState, store } from "@/app/lib/redux/store";
import type { Resume } from "@/app/lib/redux/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      // We merge the initial state with the stored state to ensure
      // backward compatibility, since new fields might be added to
      // the initial state over time.
      const mergedResumeState = deepMerge(initialResumeState, state.resume) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(initialSettings, state.settings) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  }, [dispatch]);
};
