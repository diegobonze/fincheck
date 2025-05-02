import { CrossCircledIcon } from '@radix-ui/react-icons'
import { NumericFormat } from 'react-number-format'
import { cn } from '../../app/utils/cn'

interface InputCurrencyProps {
  error?: string
  value?: string | number
  onChange?(value: string): void
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=','
        onValueChange={(event) => onChange?.(event.value)}
        value={value}
        className={cn(
          'border-gray-800 text-[32px] tracking-[-1px] font-bold outline-none w-full',
          error && 'text-red-900',
        )}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
