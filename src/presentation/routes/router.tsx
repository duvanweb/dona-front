import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/presentation/layouts/root-layout'
import { HomePage } from '@/presentation/pages/home-page'
import { SettingsPage } from '@/presentation/pages/settings-page'
import { NotFoundPage } from '@/presentation/pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
