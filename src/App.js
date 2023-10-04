import './App.css'

import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'

class App extends Component {
  state = {lightMode: true}

  themeChange = () => {
    this.setState(prevState => ({
      lightMode: !prevState.lightMode,
    }))
  }

  render() {
    const {lightMode} = this.state
    return (
      <ThemeContext.Provider value={{lightMode, switchMode: this.themeChange}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
