import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccount } from '../../../../../entities/BankAccount';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useAccountsController } from './useAccountsController';

interface AccountCardsProps {
  data: BankAccount
}

export function AccountCards({ data }: AccountCardsProps) {
  const { color, name, currentBalance, type } = data
  const { areValuesNotVisible, openEditAccountModal } = useAccountsController()

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950 cursor-pointer"
      style={{ borderColor: color }}
      role='button'
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className='text-gray-800 font-medium tracking-[-0.5px] mt-4 block'>
          {name}
        </span>
      </div>

      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[-0.5px] block',
          areValuesNotVisible && 'blur-sm'
        )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className='text-gray-600 text-sm'>
          Saldo Atual
        </small>
      </div>
    </div>
  )
}
