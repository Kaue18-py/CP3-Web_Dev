import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from '../components/layout/Layout'
import LoginPage from '../pages/LoginPage'

// A tela de login é a entrada do site e vai no pacote inicial;
// as outras páginas só são baixadas quando o visitante entra nelas
const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
