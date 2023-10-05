import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import {
  HomePage,
  LeftPannel,
  HomeVideosUnorderedListContainer,
  NavigationOption,
  ContactUs,
  SocialMedia,
  Description,
} from './styledComponents'
import HomeVideos from '../HomeVideos'

/*  const navigationOptions = [
  {
    id: 'HOME',
    displayText: 'Home',
  },
  {
    id: 'TRENDING',
    displayText: 'Trending',
  },
  {
    id: 'GAMING',
    displayText: 'Gaming',
  },
  {
    id: 'SAVED VIDEOS',
    displayText: 'Saved Videos',
  },
]
*/
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
    //  activeNavigationId: 'HOME',
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

  onSuccessApi = lightMode => {
    const {homeVideosData} = this.state
    return (
      <HomeVideosUnorderedListContainer bgColor={lightMode}>
        {homeVideosData.map(videoDetails => (
          <HomeVideos videoDetails={videoDetails} />
        ))}
      </HomeVideosUnorderedListContainer>
    )
  }

  renderLeftPannel = lightMode => (
    <LeftPannel bgColor={lightMode}>
      <ul className="leftPannelUnorderedList">
        <li className="leftPannelList">
          <Link to="/" className="pathRouteLink">
            <AiFillHome size={20} className="navigationIcon" />
            <NavigationOption textColor={lightMode}>Home</NavigationOption>
          </Link>
        </li>
        <li className="leftPannelList">
          <Link to="/trending" className="pathRouteLink">
            <AiTwotoneFire size={20} className="navigationIcon" />
            <NavigationOption textColor={lightMode}>Trending</NavigationOption>
          </Link>
        </li>
        <li className="leftPannelList">
          <Link to="/gaming" className="pathRouteLink">
            <SiYoutubegaming size={20} className="navigationIcon" />
            <NavigationOption textColor={lightMode}>Gaming</NavigationOption>
          </Link>{' '}
        </li>
        <li className="leftPannelList">
          <Link to="/saved-videos" className="pathRouteLink">
            <MdPlaylistAdd size={20} className="navigationIcon" />
            <NavigationOption textColor={lightMode}>
              Saved Videos
            </NavigationOption>
          </Link>{' '}
        </li>
      </ul>
      <div>
        <ContactUs textColor={lightMode}>CONTACT US</ContactUs>
        <a href="https://www.facebook.com" target="self">
          <SocialMedia
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
        </a>
        <a href="https://www.twitter.com" target="self">
          <SocialMedia
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
        </a>
        <a href="https://www.linkedin.com" target="self">
          <SocialMedia
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </a>
        <Description textColor={lightMode}>
          Enjoy! Now to see your channels and recommendations!
        </Description>
      </div>
    </LeftPannel>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderSomething = lightMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.onSuccessApi(lightMode)
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
            <HomePage bgColor={lightMode} data-testid="home">
              <Header />
              <div className="homeContainer">
                {this.renderLeftPannel(lightMode)}
                {this.renderSomething(lightMode)}
              </div>
            </HomePage>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
