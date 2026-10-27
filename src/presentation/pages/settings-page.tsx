import { Settings as SettingsIcon } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Configuración</h1>
        <p className="text-sm text-muted-foreground">Ajustes de la aplicación.</p>
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex items-center gap-3">
          <SettingsIcon className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Contenido de ejemplo. Reemplaza con ajustes reales.
          </p>
        </div>
      </div>
    </div>
  )
}
