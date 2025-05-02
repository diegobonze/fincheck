import { useCallback, useState } from "react";
import { DashboardContext } from "./useDashboard";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";
import { BankAccount } from "../../../../../entities/BankAccount";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesNotVisible, setAreValuesNotVisible] = useState<boolean>(() => {
    const storageValue = localStorage.getItem(localStorageKeys.VALUE_NOT_VISIBLE)

    return storageValue ? JSON.parse(storageValue) : false
  })

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null)

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setTimeout(() => {setIsNewAccountModalOpen(false)}, 50)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesNotVisible(prevState => {
      const newValue = !prevState

      localStorage.setItem(localStorageKeys.VALUE_NOT_VISIBLE, JSON.stringify(!prevState))

      return newValue
    })
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {

    setTimeout(() => {setAccountBeingEdited(null)}, 50)
    setTimeout(() => {setIsEditAccountModalOpen(false)}, 50)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        areValuesNotVisible,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
