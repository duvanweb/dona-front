import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '@/presentation/hooks/use-auth'

// Requiere sesión; si no, redirige a /login recordando el destino
export function ProtectedRoute() {
  const session = useSession()
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

// Solo para invitados (login, registro, recuperar clave)
export function PublicOnlyRoute() {
  const session = useSession()
  if (session) return <Navigate to="/" replace />
  return <Outlet />
}
