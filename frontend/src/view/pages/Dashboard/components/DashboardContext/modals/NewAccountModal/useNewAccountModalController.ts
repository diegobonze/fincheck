import { useDashboard } from "../../useDashboard";

export function useNewAccountModalController() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    isColorsDropdownOpen,
    closeColorsDropdown,
  } = useDashboard()

  return {
    closeNewAccountModal,
    isNewAccountModalOpen,
    isColorsDropdownOpen,
    closeColorsDropdown,
  }
}
