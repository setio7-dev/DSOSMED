import AdminDashboard from '@/components/admin/adminDashboard'
import NokosManagement from './service/nokosManagement'
import SuntikManagement from './service/suntikManagement'

export default function ServiceManagement() {
  return (
    <AdminDashboard title="Pengaturan Layanan">
      <div className="flex flex-col gap-12">
        <NokosManagement/>
        <SuntikManagement/>
      </div>
    </AdminDashboard>
  )
}
