import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import {HomePage} from './styledComponents'
import HomeVideos from '../HomeVideos'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    search: '',
    apiStatus: apiStatusConstants.initial,
    //  searchInput: '',
    homeVideosData: [],
  }

  componentDidMount() {
    this.renderHomeVideosApi()
  }

  renderHomeVideosApi = async () => {
    const {search} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(item => ({
        channel: {
          name: item.channel.name,
          profileImageUrl: item.channel.profile_image_url,
        },
        id: item.id,
        publishedAt: item.published_at,
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        homeVideosData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onFailureApi = () => <div>Hello</div>

  onSuccessApi = () => {
    const {homeVideosData} = this.state
    return (
      <ul className="homeVideosUnorderedListContainer">
        {homeVideosData.map(videoDetails => (
          <HomeVideos videoDetails={videoDetails} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderSomething = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.onSuccessApi()
      case apiStatusConstants.failure:
        return this.onFailureApi()
      default:
        return null
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
              {this.renderSomething()}
            </HomePage>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
