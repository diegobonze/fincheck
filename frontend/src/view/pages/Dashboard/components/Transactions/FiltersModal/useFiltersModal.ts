import { useState } from "react";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<null | string>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().getFullYear())

  function handleSetSelectedBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(prevState => (
      prevState == bankAccountId
      ? null
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
  }
}
