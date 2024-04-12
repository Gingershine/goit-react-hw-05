import { NavLink, Outlet } from "react-router-dom"
import css from "./Navigation.module.css"

const Navigation = () => {
  return (
      <div>
          <header className={css.header}>
              <ul className={css.list}>
                  <li>
                      <NavLink className={css.link} to='/'>Home</NavLink>
                  </li>
                  <li>
                      <NavLink className={css.link} to='/movies'>Movies</NavLink>
                  </li>
              </ul>
          </header>
          <main>
              <Outlet/>
          </main>
    </div>
  )
}

export default Navigation