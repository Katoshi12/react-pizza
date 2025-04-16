import { ProfileData } from "../pages/Profile";
import { useCallback } from "react";

const STORAGE_KEY = 'form'

export const useProfileStorage = () => {
  const getProfileData = useCallback((): ProfileData | undefined => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : undefined
  }, [])

  const setProfileData = useCallback((data: ProfileData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  return {getProfileData, setProfileData};
}