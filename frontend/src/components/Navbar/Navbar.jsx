import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'


const Navbar = ({ user, setUser }) => {

  const navigate = useNavigate()
  const Logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    
    navigate('/')
  }

  return (
    <div className='navbar'>
      <div className="left-nav">
      <NavLink to='/'><img src="https://s7template.com/tf/bmarketo/assets/img/logo.png" alt="Bmerketo" /></NavLink>
      </div>
      <div className="right-nav">
        <ul className='nav-links'>
          <li><NavLink to='/'>HOME</NavLink><i className="fa-solid fa-plus fa-sm"></i> </li>
          <li><NavLink to='/productlist'>PRODUCTS</NavLink><i className="fa-solid fa-plus fa-sm"></i></li>
          
        
          {user ? (
              <>
              <li><NavLink to='/user' className='textLight'>User</NavLink></li>
              <li><button onClick={Logout} className='textLight btn-logout'>Logout</button></li>
              </>

            ) : (
              <li><NavLink to='/login' className='textLight'>Login</NavLink></li>
            )

          }
        
        </ul>

      </div>
    </div>
  )
}

export default Navbar