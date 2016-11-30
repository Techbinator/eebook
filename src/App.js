import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import Search from './search'
import Layout from './layout'
import Store  from './store'

const store = Store.create();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={Layout}>
            <Route key="/" path="/" component={Search}/>
          </Route>
        </Router>
      </Provider>
    );
  }
};
