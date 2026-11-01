import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/presentation/layouts/root-layout'
import { AuthLayout } from '@/presentation/layouts/auth-layout'
import { ProtectedRoute, PublicOnlyRoute } from '@/presentation/routes/guards'
import { HomePage } from '@/presentation/pages/home-page'
import { SettingsPage } from '@/presentation/pages/settings-page'
import { ProductsPage } from '@/presentation/pages/products-page'
import { ProductCreatePage } from '@/presentation/pages/product-create-page'
import { LoginPage } from '@/presentation/pages/login-page'
import { RegisterPage } from '@/presentation/pages/register-page'
import { ForgotPasswordPage } from '@/presentation/pages/forgot-password-page'
import { NotFoundPage } from '@/presentation/pages/not-found-page'

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/new', element: <ProductCreatePage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
