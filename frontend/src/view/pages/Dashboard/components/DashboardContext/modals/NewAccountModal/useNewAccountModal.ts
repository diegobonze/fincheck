import { useDashboard } from "../../useDashboard";

export function useNewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen
  } = useDashboard()

  return {
    closeNewAccountModal,
    isNewAccountModalOpen,
  }
}
