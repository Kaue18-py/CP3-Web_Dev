import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:bg-primary focus:px-3 focus:py-2 focus:text-background"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        {/* Header e Footer continuam na tela enquanto uma página lazy carrega */}
        <Suspense
          fallback={<p className="mx-auto max-w-4xl px-4 py-16 text-muted">carregando...</p>}
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
