import { Hexagon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/stores/use-sidebar-store'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/presentation/components/language-switcher/language-switcher'
import { UserMenu } from '@/presentation/components/user-menu/user-menu'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { t } = useTranslation()
  const toggle = useSidebarStore((s) => s.toggle)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggle}
          aria-label={t('nav.openMenu')}
        >
          <Menu />
        </Button>

        <div className="flex items-center gap-2 font-semibold">
          <Hexagon className="size-5 text-primary" />
          <span className="text-base">{t('common.appName')}</span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
