import './index.css'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import {LogOutBtn, IconButton} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {lightMode, switchMode} = value
        const loginLogo = lightMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        return (
          <div className="header">
            <img src={loginLogo} alt="nxt watch logo" className="websiteLogo" />
            <div className="navOptions">
              <button
                type="button"
                onClick={switchMode}
                className="themeButton"
              >
                {lightMode ? (
                  <FaMoon size={23} />
                ) : (
                  <BiSun size={30} color="#ffffff" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profileIcon"
              />
              <IconButton iconColor={lightMode}>
                <GiHamburgerMenu size={25} />
              </IconButton>
              <LogOutBtn
                outline={lightMode}
                color="#ffffff"
                onClick={onClickLogOut}
              >
                Log out
              </LogOutBtn>
              <IconButton iconColor={lightMode} onClick={onClickLogOut}>
                <FiLogOut size={25} />
              </IconButton>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
