import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesNotVisible: boolean;
  toggleValuesVisibility(): void
  isNewAccountModalOpen: boolean
  openNewAccountModal(): void
  closeNewAccountModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function useDashboard() {
  return useContext(DashboardContext)
}
