import { useNavigate } from 'react-router-dom'
import { Building2, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession } from '@/presentation/hooks/use-auth'
import { useAccountStore } from '@/stores/use-account-store'

export function UserMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()
  const logout = useAccountStore((s) => s.logout)

  if (!session) return null

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="max-w-56">
          <Building2 className="size-4" />
          <span className="hidden truncate sm:inline">{session.companyName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="space-y-1">
          <p className="truncate font-medium">{session.companyName}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {session.email}
          </p>
          <Badge variant="secondary" className="font-mono">
            {session.storeCode}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="size-4" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
