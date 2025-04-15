import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { CategoryIcon } from "./icons/categories/CategoryIcon";
import { BankAccountIcon } from "./icons/BankAccountIcon";
import { useDashboard } from "../pages/Dashboard/components/DashboardContext/useDashboard";

export function Fab() {
  const { openNewAccountModal } = useDashboard()

  return (
    <div className="right-4 bottom-4 fixed">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
