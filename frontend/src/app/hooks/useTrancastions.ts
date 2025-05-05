import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactions";
import { TransactionFilters } from "../services/transactions/getAll";

export function useTransactions(filter: TransactionFilters) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll(filter)
  })

  return {
    transactions: data ?? [],
    isFetching,
    isLoading,
    refetchTransactions: refetch,
  }
}
