import { Outlet } from 'react-router-dom'
import { LanguageSwitcher } from '@/presentation/components/language-switcher/language-switcher'
import { ThemeToggle } from '@/presentation/components/navbar/theme-toggle'

export function AuthLayout() {
  return (
    <div className="relative grid min-h-screen place-items-center bg-background p-4">
      <div className="absolute top-4 right-4 flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}
