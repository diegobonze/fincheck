import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionController () {
  const {
    areValuesNotVisible,
  } = useDashboard()

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(true)

  function handleOpenFilterModal() {
    setIsFilterModalOpen(true)
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpen(false)
  }

  return {
    areValuesNotVisible,
    transactions: [],
    isInitialLoading: false,
    isLoading: false,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
  }
}
