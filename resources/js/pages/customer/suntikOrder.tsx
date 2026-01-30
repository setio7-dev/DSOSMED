import React from 'react'
import SuntikMedanpedia from './service/suntikMedanpedia'
import CustomerDashboard from '@/components/customer/customerDashboard'

export default function SuntikOrder() {
  return (
    <CustomerDashboard>
        <SuntikMedanpedia/>
    </CustomerDashboard>
  )
}
