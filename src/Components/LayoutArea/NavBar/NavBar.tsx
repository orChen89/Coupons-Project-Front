import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import Logo from "..//..//..//Assets/Logo/download.png"
import { BaseUserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import CustomerDropDown from "./DropDown/CustomerDropDown";
import Role from "../../../Models/Role";
import CompanyDropDown from "./DropDown/CompanyDropDown";
import AdminDropDown from "./DropDown/AdminDropDown";


function Navbar() {

  const [user, setUser] = useState<BaseUserModel>();

  useEffect(() => {

    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);

    });

    return () => {
      unsubscribe();
    }
  }, []);

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };


  return (

    <>
      <nav className='navbar'>
        <NavLink to="/home"><img className="logo" src={Logo} /></NavLink>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        </Link>       
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className='nav-item'>
            <NavLink to='/home' className='nav-linksHome' onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>

          {user !== null && <>
            <li
              className='nav-item'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >

              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >

                Dashboard <i className='fas fa-caret-down' />

              </Link>
              {
                user?.role === Role.Customer && <>

                  {dropdown && <CustomerDropDown />}
                </>
              }

              {
                user?.role === Role.Company && <>

                  {dropdown && <CompanyDropDown />}
                </>
              }

              {
                user?.role === Role.Admin && <>

                  {dropdown && <AdminDropDown />}
                </>
              }

            </li>
          </>}
          <li className='nav-item'>
            <Link
              to='/coupons'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Our Coupons

            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li>
          </li>
          <li className='nav-item'>
            <Link
              to='/about-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>       
        </ul>
      </nav>
    </>

  );
}

export default Navbar;