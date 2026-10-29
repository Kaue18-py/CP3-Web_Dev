import { Link } from 'react-router'
import { buttonStyles } from './buttonStyles'

// Link com cara de botão: `to` para rotas do site, `href` para sites externos (abre em nova aba)
export function ButtonLink({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = buttonStyles(variant, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
      {children}
    </a>
  )
}
