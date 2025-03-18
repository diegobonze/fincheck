import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCards } from "./AccountCards";
import { AccountsCardsNavigation } from './AccountsCardsNavigation';

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5px] block">
          Saldo total
        </span>

        <div className="flex items-center gap-2">
          <strong className="text-white tracking-[-0.5px] text-2xl">
            R$1000,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
          >
            <div className="flex justify-between items-center mb-4" slot="container-start">
              <strong className="text-white text-lg tracking-[-1px] font-bold">
                Minhas contas
              </strong>

              <AccountsCardsNavigation />
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
      </div>
    </div>
  )
}
