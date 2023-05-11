import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";


// Хедер

function Header({ loggedIn, handleSignout, email }) {

  const navigate = useNavigate();
  const location = useLocation()

  function signOut() {
    auth.signout()
      .then(() => {
        handleSignout()
        navigate('/signin')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function getLocation() {
    return location.pathname
  }

  return (
    <header className="header page__header">
      <div className="header__logo" />
      {!loggedIn && getLocation() === '/signup' && <Link className="header__button header__button_page_login" to="/signin"> Войти</Link>}
      {!loggedIn && getLocation() === '/signin' && <Link className="header__button header__button_page_login" to="/signup"> Регистрация</Link>}

      {loggedIn &&
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__text">{email}</li>
            <li><button className="header__button" onClick={signOut}>Выйти</button></li>
          </ul>
        </nav>
      }

    </header>
  );
}

export default Header;
