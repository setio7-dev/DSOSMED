import CustomerDashboard from '@/components/customer/customerDashboard'
import React from 'react'
import NokosAdaOtpOrder from './service/nokosAdaOtp'
import NokosJasaOtpOrder from './service/nokosJasaOtp'
// import NokosVirtusimOrder from './service/nokosVirtusim'

export default function NokosOrder() {
  return (
    <CustomerDashboard>
      <div className="flex flex-col gap-12">
        <NokosAdaOtpOrder/>
        {/* <NokosVirtusimOrder/> */}
        <NokosJasaOtpOrder/>
      </div>
    </CustomerDashboard>
  )
}
