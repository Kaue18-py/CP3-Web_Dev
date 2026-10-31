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
      {/* Enquanto uma página lazy carrega, só o Header fica na tela. O Footer entra junto com o
          conteúdo: se ele aparecesse antes, seria empurrado para baixo quando a página chegasse
          (salto de layout medido no Lighthouse: CLS 0,18) */}
      <Suspense
        fallback={
          <main id="conteudo" className="flex-1">
            <p className="mx-auto max-w-5xl px-4 py-16 text-muted">carregando...</p>
          </main>
        }
      >
        <main id="conteudo" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}
