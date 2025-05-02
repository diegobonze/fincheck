export interface Transaction {
  categoryId: string
  bankAccountId: string
  id: string
  name: string
  value: number
  date: Date
  type: 'INCOME' | 'EXPENSE'
}
