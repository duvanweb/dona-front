import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold tabular-nums">404</p>
      <p className="text-muted-foreground">Página no encontrada.</p>
      <Link to="/" className="text-primary underline-offset-4 hover:underline">
        Volver al inicio
      </Link>
    </div>
  )
}
