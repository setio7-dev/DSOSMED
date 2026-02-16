import AdminDashboard from '@/components/admin/adminDashboard'
import React from 'react'
import AdaOtpManagement from './service/adaOtpManagement'
import VirtusimManagement from './service/virtusimManagement'
import MedanPediaManagement from './service/medanpediaManagement'
import JasaOtpManagement from './service/jasaOtpManagement'

export default function ServiceManagement() {
  return (
    <AdminDashboard title="Pengaturan Layanan">
      <div className="flex flex-col gap-12">
        <AdaOtpManagement/>
        <VirtusimManagement/>
        <JasaOtpManagement/>
        <MedanPediaManagement/>
      </div>
    </AdminDashboard>
  )
}
