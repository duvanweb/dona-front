import { Home, Package, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'
import { SidebarNavLink } from './sidebar-nav-link'

interface SidebarContentProps {
  onNavigate?: () => void
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const { t } = useTranslation()
  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <p className="px-3 pb-2 pt-1 text-xs font-medium text-muted-foreground">
        {t('nav.section')}
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <SidebarNavLink to="/" label={t('nav.home')} icon={Home} onNavigate={onNavigate} />
        </li>
        <li>
          <SidebarNavLink
            to="/products"
            label={t('nav.products')}
            icon={Package}
            onNavigate={onNavigate}
          />
        </li>
        <li>
          <SidebarNavLink
            to="/settings"
            label={t('nav.settings')}
            icon={Settings}
            onNavigate={onNavigate}
          />
        </li>
      </ul>
      <Separator className="my-2" />
      <div className="mt-auto px-3 text-xs text-muted-foreground">v0.0.0</div>
    </nav>
  )
}
