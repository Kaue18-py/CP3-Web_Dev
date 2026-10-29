import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

// A home entra no pacote inicial; as outras páginas só são baixadas quando acessadas
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<p className="px-4 py-16 text-muted">carregando...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
