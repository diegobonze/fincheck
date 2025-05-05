import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined)
  const [selectedDate, setSelectedDate] = useState(new Date().getFullYear())

  const { accounts } = useBankAccounts()

  function handleSetSelectedBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState == bankAccountId
      ? undefined
      : bankAccountId
    ))
  }

  function handleSelectedDate(step: number) {
    setSelectedDate(prevState => prevState + step)
  }

  return {
    handleSetSelectedBankAccount,
    selectedBankAccountId,
    handleSelectedDate,
    selectedDate,
    accounts,
  }
}
