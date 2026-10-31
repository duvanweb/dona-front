import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/presentation/hooks/use-theme'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { toggle } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={t('theme.toggle')}>
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  )
}
