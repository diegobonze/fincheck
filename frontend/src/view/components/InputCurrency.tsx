import { NumericFormat } from 'react-number-format'

export function InputCurrency() {
  return (
    <NumericFormat
    thousandSeparator='.'
    decimalSeparator=','
    className='border-gray-800 text-[32px] tracking-[-1px] font-bold outline-none w-full'
    defaultValue={0}
    />
  )
}
