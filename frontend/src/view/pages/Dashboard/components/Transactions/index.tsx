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

export function Transactions() {
  const {
    areValuesNotVisible,
    transactions,
    isInitialLoading,
    isLoading
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
          <header>
            <div className="flex items-center justify-between">
              <TransactionDropdown />

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
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

            {(hasTransactions && !isLoading) && (
              <>
                <div className="bg-white rounded-2xl flex items-center justify-between p-4 gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/06/2025</span>
                    </div>
                  </div>

                  <span className={cn(
                    "text-red-800 tracking-[-0.5px] font-medium",
                    areValuesNotVisible && 'blur-sm'
                  )}>
                    {formatCurrency(123)}
                  </span>
                </div>

                <div className="bg-white rounded-2xl flex items-center justify-between p-4 gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/06/2025</span>
                    </div>
                  </div>

                  <span className="text-green-800 tracking-[-0.5px] font-medium">
                    {formatCurrency(123)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
