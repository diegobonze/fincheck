import { useCallback, useState } from "react";
import { DashboardContext } from "./useDashboard";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesNotVisible, setAreValuesNotVisible] = useState<boolean>(() => {
    const storageValue = localStorage.getItem(localStorageKeys.VALUE_NOT_VISIBLE)

    return storageValue ? JSON.parse(storageValue) : false
  })

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(true)

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
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
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
