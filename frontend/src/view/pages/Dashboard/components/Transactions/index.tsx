import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "./../../../../../assets/empty-state.svg"
import { TransactionDropdown } from "./TransactionDropdown";
import { FiltersModal } from './FiltersModal';
import { FormatDate } from '../../../../../app/utils/formatDate';

export function Transactions() {
  const {
    areValuesNotVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFilterModalOpen,
    filters,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleChangeFilters,
    handleApplyFilters,
  } = useTransactionController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">

      {isInitialLoading && (
        <div className='flex justify-center items-center w-full h-full'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFilterModalOpen}
            onClose={handleCloseFilterModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFilterModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
                initialSlide={filters.month}
                slidesPerView={3}
                centeredSlides
              >
                <SliderNavigation />

                {MONTHS.map((month, index) =>
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                <Spinner className='w-10 h-10' />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="h-full flex flex-col items-center justify-center">
                <img src={emptyStateImage} />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação.
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) &&
              transactions.map(transaction => (
                <div key={transaction.id} className="bg-white rounded-2xl flex items-center justify-between p-4 gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon
                      type={transaction.type === "EXPENSE" ? 'expense' : 'income'}
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">{transaction.name}</strong>
                      <span className="text-sm text-gray-600">{FormatDate(new Date(transaction.date))}</span>
                    </div>
                  </div>

                  <span className={cn(
                    "tracking-[-0.5px] font-medium",
                    transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                    areValuesNotVisible && 'blur-sm'
                  )}>
                    {transaction.type === 'EXPENSE' ? '-' : '+'}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
