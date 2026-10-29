import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from '../components/layout/Layout'
import HomePage from '../pages/HomePage'

// A home entra no pacote inicial; as outras páginas só são baixadas quando acessadas
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
