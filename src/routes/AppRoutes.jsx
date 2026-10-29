import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

// A home entra no pacote inicial; as outras páginas só são baixadas quando acessadas
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<p className="text-muted px-4 py-16">carregando...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
