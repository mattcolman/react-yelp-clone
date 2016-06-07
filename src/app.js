import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
// import styles from './styles.module.css'
import 'font-awesome/css/font-awesome.css'

import {browserHistory, Router, Route} from 'react-router'

import App from 'containers/App/App'

import makeRoutes from 'routes'

const routes = makeRoutes()
const mountNode = document.querySelector('#root');
ReactDOM.render(
  <App history={browserHistory} routes={routes} />, mountNode);