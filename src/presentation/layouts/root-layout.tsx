import { Outlet } from 'react-router-dom'
import { Navbar } from '@/presentation/components/navbar/navbar'
import { Sidebar } from '@/presentation/components/sidebar/sidebar'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
