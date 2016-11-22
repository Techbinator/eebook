import { combineReducers } from 'redux'
import Layout from './reducers/Layout'
import Search from './reducers/Search'

export default combineReducers({
  Search,
  Layout
});