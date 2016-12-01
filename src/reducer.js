import { combineReducers } from 'redux'
import Layout from './reducers/Layout'
import Search from './reducers/Search'
import Data from './reducers/Data'

export default combineReducers({
  Data,
  Search,
  Layout
});
