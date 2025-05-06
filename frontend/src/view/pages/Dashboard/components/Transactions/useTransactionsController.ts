import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTrancastions";
import { TransactionFilters } from "../../../../../app/services/transactions/getAll";
import { Transaction } from "../../../../../entities/Transaction";

export function useTransactionController () {
  const {
    areValuesNotVisible,
  } = useDashboard()

  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false)
  const [transactionBeingEdit, setTransactionBeingEdit] = useState<null | Transaction>(null)

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const {
    transactions,
    isFetching,
    isLoading,
    refetchTransactions,
  } = useTransactions(filters)

  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if(value == filters[filter]) return

      setFilters(prevState => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleApplyFilters({ bankAccountId, year }: { bankAccountId: string | undefined; year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
    setIsFilterModalOpen(false)
  }

  function handleOpenFilterModal() {
    setIsFilterModalOpen(true)
  }

  function handleCloseFilterModal() {
    setIsFilterModalOpen(false)
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditTransactionModalOpen(true)
    setTransactionBeingEdit(transaction)
  }

  function handleCloseEditModal() {
    setTimeout(() => setIsEditTransactionModalOpen(false), 50)
    setTimeout(() => setTransactionBeingEdit(null), 50)
  }

  return {
    areValuesNotVisible,
    transactions,
    isInitialLoading: isLoading,
    isLoading: isFetching,
    isFilterModalOpen,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditTransactionModalOpen,
    transactionBeingEdit,
  }
}
