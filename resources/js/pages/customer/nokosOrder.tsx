import CustomerDashboard from '@/components/customer/customerDashboard'
import React from 'react'
import NokosAdaOtpOrder from './service/nokosAdaOtp'
// import NokosVirtusimOrder from './service/nokosVirtusim'

export default function NokosOrder() {
  return (
    <CustomerDashboard>
      <div className="flex flex-col gap-12">
        <NokosAdaOtpOrder/>
        {/* <NokosVirtusimOrder/> */}
      </div>
    </CustomerDashboard>
  )
}
