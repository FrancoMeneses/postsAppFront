import { NavLink } from "react-router-dom"
import '../styles/navbar.css'
import { usePosts } from "../context/appContext"
import { useState } from "react"

export function Navbar() {
  const { loggedUser, signOut } = usePosts()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (!open) {
      document.getElementById('ul-logged').classList.remove('hideMenu')
      setOpen(true)
    }
    if (open) {
      document.getElementById('ul-logged').classList.add('hideMenu')
      setOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <h3>Posts App</h3>
      <div className="navbar-a">
        <NavLink end to="/">Home</NavLink>
        {
          loggedUser !== null ?
            <div className="container-logged">
              <button className="btn-logged" onClick={handleOpen}>
                <p>
                {loggedUser.username}
                </p>
              </button>
              <div id="ul-logged" className="ul-logged hideMenu">
                <NavLink end to="/newpost">New Post</NavLink>
                <NavLink className="li-logged">My Posts</NavLink>
                <NavLink className="li-logged">My Account</NavLink>
                <button className="li-logged" type="button" onClick={signOut}>Sign Out</button>
              </div>
            </div>
            :
            <NavLink end to="/login" className="navbar-a-login">Login</NavLink>
        }
      </div>
    </nav>
  )
}