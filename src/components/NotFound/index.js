import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundSubTitle,
} from './styledComponents'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {lightMode} = value

      const notFoundImage = lightMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <>
          <Header />
          <NotFoundContainer bgColor={lightMode}>
            <NotFoundImage src={notFoundImage} alt="not found" />
            <NotFoundHeading textColor={lightMode}>
              Page Not Found
            </NotFoundHeading>
            <NotFoundSubTitle textColor={lightMode}>
              We are sorry, the page you requested could not be found
            </NotFoundSubTitle>
          </NotFoundContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
