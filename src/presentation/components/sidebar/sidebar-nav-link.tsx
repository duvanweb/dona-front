import { type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from 'cn'

interface SidebarNavLinkProps {
  to: string
  label: string
  icon: LucideIcon
  onNavigate?: () => void
}

export function SidebarNavLink({ to, label, icon: Icon, onNavigate }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground',
        )
      }
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </NavLink>
  )
}
