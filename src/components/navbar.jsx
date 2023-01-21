import { NavLink } from "react-router-dom"

export function Navbar() {
  return (
    <nav className="navbar">
      <p>Posts App</p>
      <div className="navbar-a">
        <NavLink end to="/" className="navbar-a-navlink">Home</NavLink>
        <NavLink end to="/newpost" className="navbar-a-navlink">New Post</NavLink>
      </div>
    </nav>
  )
}