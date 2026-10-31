import { Minus, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useCounterStore } from '@/stores/use-counter-store'

export function HomePage() {
  const { t } = useTranslation()
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border bg-card p-8 text-card-foreground shadow-sm">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t('common.appName')}</h1>
        <p className="text-sm text-muted-foreground">
          React + Vite + TypeScript + Tailwind + shadcn/ui + Zustand
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          React 19
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          shadcn/ui
        </span>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Zustand
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <span className="text-5xl font-bold tabular-nums">{count}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={decrement}
            aria-label={t('home.decrement')}
          >
            <Minus />
          </Button>
          <Button onClick={increment}>
            <Plus />
            {t('home.increment')}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={reset}
            aria-label={t('home.reset')}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {t('home.footer')}
      </p>
    </div>
  )
}
