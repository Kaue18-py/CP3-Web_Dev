// Páginas do portfólio: usadas no menu do Header e nos botões da página inicial
export const NAV_ITEMS = [
  {
    to: '/inicio',
    label: 'início',
    description: 'painel principal',
  },
  {
    to: '/sobre',
    label: 'sobre',
    description: 'quem é o Kauê, o que ele estuda e as tecnologias que usa',
  },
  {
    to: '/projetos',
    label: 'projetos',
    description: 'alvos encontrados: projetos puxados direto do GitHub',
  },
]

// Na página inicial o menu mostra todas as páginas, menos a própria
export const MENU_ITEMS = NAV_ITEMS.filter((item) => item.to !== '/inicio')
