import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiMail} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="headerContainer">
      <Link to="/" className="linkContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="headerWebsiteLogo"
        />
      </Link>
      <div className="iconsContainerForSmallDevices">
        <Link to="/">
          <AiFillHome className="headerIcons" />
        </Link>
        <Link to="/jobs">
          <HiMail className="headerIcons" />
        </Link>
        <FiLogOut className="headerIcons" onClick={onClickLogoutButton} />
      </div>
      <ul className="homeAndJobsContainer">
        <Link to="/" className="HomeLink">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="HomeLink">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logoutButton"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
