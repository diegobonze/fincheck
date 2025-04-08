import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionController () {
  const {
    areValuesNotVisible,
  } = useDashboard()

  return {
    areValuesNotVisible,
    transactions: [],
    isInitialLoading: false,
    isLoading: false,
  }
}
