import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import {HomePage} from './styledComponents'

class Home extends Component {
  state = {
    search: '',
    searchInput: '',
  }

  componentDidMount() {
    this.renderHomeVideosApi()
  }

  renderHomeVideosApi = async () => {
    const {search} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'POST',
      Authorization: `Bearer ${Cookies.get('jwt_token')}`,
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      console.log('kumar')
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightMode} = value
          return (
            <HomePage bgColor={lightMode}>
              <Header />
            </HomePage>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
