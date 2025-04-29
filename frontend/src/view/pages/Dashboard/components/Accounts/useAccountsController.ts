import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountService";

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

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity
  })

  const currancyBalance = useMemo(() => {
    if(!data) return 0

    return data.reduce((total, account) => total + account.currentBalance, 0)
  }, [data])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesNotVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal,
    currancyBalance,
    openEditAccountModal,
  }
}
