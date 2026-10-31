import { Home, Package, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SidebarNavLink } from './sidebar-nav-link'

interface SidebarContentProps {
  onNavigate?: () => void
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      <p className="px-3 pb-2 pt-1 text-xs font-medium text-muted-foreground">
        Navegación
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <SidebarNavLink to="/" label="Inicio" icon={Home} onNavigate={onNavigate} />
        </li>
        <li>
          <SidebarNavLink
            to="/products"
            label="Productos"
            icon={Package}
            onNavigate={onNavigate}
          />
        </li>
        <li>
          <SidebarNavLink
            to="/settings"
            label="Configuración"
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
