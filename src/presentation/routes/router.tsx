import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/presentation/layouts/root-layout'
import { HomePage } from '@/presentation/pages/home-page'
import { SettingsPage } from '@/presentation/pages/settings-page'
import { ProductsPage } from '@/presentation/pages/products-page'
import { ProductCreatePage } from '@/presentation/pages/product-create-page'
import { NotFoundPage } from '@/presentation/pages/not-found-page'

export const router = createBrowserRouter([
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
])
