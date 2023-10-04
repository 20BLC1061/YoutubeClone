import './index.css'
import {Component} from 'react'

import {FaMoon} from 'react-icons/fa'
import {BsSun} from 'react-icons/bs'

import ThemeContext from '../../context/ThemeContext'

class Home extends Component {
  state = {}

  renderHeader = () => (
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
                {lightMode ? <FaMoon size={25} /> : <BsSun size={25} />}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profileIcon"
              />
              <button type="button" className="logOutBtn">
                Log out
              </button>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return <div>{this.renderHeader()}Home</div>
  }
}

export default Home
