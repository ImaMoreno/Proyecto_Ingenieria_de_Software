import "./navbar.css"
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
        <span className="logo" style={{color:"white",textDecoration:"none"}}>RESERVAS ONLINE</span>
        </Link>
        <div className="navItems">
          <Link to="/register" className="navButton">Registro</Link>
          <Link to="/login" className="navButton">Acceder</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar