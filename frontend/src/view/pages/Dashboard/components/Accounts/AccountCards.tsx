import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useAccountsController } from './useAccountsController';

interface AccountCardsProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT'
}

export function AccountCards({ color, name, balance, type }: AccountCardsProps) {
  const { areValuesNotVisible } = useAccountsController()

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
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
          {formatCurrency(balance)}
        </span>
        <small className='text-gray-600 text-sm'>
          Saldo Atual
        </small>
      </div>
    </div>
  )
}
