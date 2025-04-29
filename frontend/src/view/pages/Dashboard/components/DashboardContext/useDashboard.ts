import { createContext, useContext } from "react";
import { BankAccount } from "../../../../../entities/BankAccount";

interface DashboardContextValue {
  areValuesNotVisible: boolean;
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  isEditAccountModalOpen: boolean
  accountBeingEdited: null | BankAccount
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  toggleValuesVisibility(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
  closeNewTransactionModal(): void
  openEditAccountModal(bankAccount: BankAccount): void
  closeEditAccountModal(): void
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function useDashboard() {
  return useContext(DashboardContext)
}
