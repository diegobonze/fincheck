import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCards } from "./AccountCards";
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesNotVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
  } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full'>
          <Spinner className='text-teal-950/50 fill-white w-10 h-10' />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong className={cn(
                "text-white tracking-[-0.5px] text-2xl",
                areValuesNotVisible && 'blur-md'
              )}>
                {formatCurrency(1000)}
              </strong>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesNotVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length == 0 && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white text-lg tracking-[-1px] font-bold">
                    Minhas contas
                  </strong>

                  <button
                    onClick={openNewAccountModal}
                    className='cursor-pointer mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600
                    flex flex-col items-center justify-center w-full gap-4 text-white'
                  >
                    <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                      <PlusIcon className='w-6 h-6' />
                    </div>
                    <span className='tracking-[-0.5px] font-medium w-32 text-center'>
                      Cadastre uma nova conta
                    </span>
                  </button>
                </div>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                  onSlideChange={swiper => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }}
                >
                  <div className="flex justify-between items-center mb-4" slot="container-start">
                    <strong className="text-white text-lg tracking-[-1px] font-bold">
                      Minhas contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  <SwiperSlide>
                    <AccountCards
                      color="#7950f2"
                      name="Nubank"
                      balance={1000}
                      type="CASH"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCards
                      color="#333"
                      name="XP"
                      balance={1000}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCards
                      color="#0f0"
                      name="Carteira"
                      balance={1000}
                      type="CASH"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
