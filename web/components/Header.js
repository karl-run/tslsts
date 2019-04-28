import Link from 'next/link'

import css from './Header.scss'

const Header = () => (
  <header className={css.header}>
    <div className={css.left}>
      <div className={css.title}>tslsts</div>
      <div className={css.subtext}>Statisikk over solgte Tesla i Norge</div>
    </div>
    <div className={css.right}>
      <Link href="https://github.com/karl-run/tslsts">
        <a target="_blank" rel="noopener">
          Kildekode
        </a>
      </Link>
    </div>
  </header>
)

export default Header
