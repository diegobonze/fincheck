import { createContext, useContext } from "react";

interface DashboardContextValue {
  areValuesNotVisible: boolean;
  toggleValuesVisibility(): void
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  openNewAccountModal(): void
  closeNewAccountModal(): void
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
  closeNewTransactionModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function useDashboard() {
  return useContext(DashboardContext)
}
