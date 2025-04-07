import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesNotVisible: boolean;
  toggleValuesVisibility(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function useDashboard() {
  return useContext(DashboardContext)
}
