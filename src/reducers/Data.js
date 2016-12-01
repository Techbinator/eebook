import axios from 'axios'
import config from '../json/config'

const initialSearch = {
  routes: [],
  error:  false,
  passengers: {},
  dates:  {}
};

/**
 * Search data
 * @param {Object} state  The global state object
 * @param {Object} action The requested action
 */
export default function Data(state = initialSearch, action) {
  switch (action.type) {
    case 'ROUTES_PENDING':
      return {
        ...state,
        error:  null,
        routes: initialSearch.routes,
        passengers: initialSearch.passengers,
        dates: initialSearch.dates
      };

    case 'ROUTES_FULFILLED':
      return {
        ...state,
        routes: action.payload.data.routes,
        passengers: action.payload.data.passengers,
        dates: action.payload.data.dates
      };

    case 'ROUTES_REJECTED':
      return {
        ...state,
        error:  true,
        routes: initialSearch.routes,
        passengers: initialSearch.passengers,
        dates: initialSearch.dates
      };

    default:
      return state;
  }
}

export function retrieveRoutes() {
  if (config.isOffline) {
    return {
      type: 'ROUTES_FULFILLED',
      payload: require('../json/destinations.json')
    }
  }

  return {
    type:    'ROUTES',
    payload: axios.get("http://tudor.2e-systems.com:9035/routes?lang=en")
  };
}
