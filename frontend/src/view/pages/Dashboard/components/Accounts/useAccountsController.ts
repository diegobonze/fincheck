import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWindowWidth()

  const {
    areValuesNotVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    openEditAccountModal,
  } = useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { accounts, isFetching }  = useBankAccounts()

  const currancyBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts, ])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesNotVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currancyBalance,
    openEditAccountModal,
  }
}
