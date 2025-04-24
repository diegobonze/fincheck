import { useCallback, useState } from "react";
import { DashboardContext } from "./useDashboard";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesNotVisible, setAreValuesNotVisible] = useState<boolean>(() => {
    const storageValue = localStorage.getItem(localStorageKeys.VALUE_NOT_VISIBLE)

    return storageValue ? JSON.parse(storageValue) : false
  })

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)

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

  return (
    <DashboardContext.Provider
      value={{
        areValuesNotVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        newTransactionType,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
