import axios from 'axios'
import config from '../json/config'

const initialSearch = { 
  originCode: "",
  destinCode: "",
  numJourneys: 2,
  error:  false,
  routes: [] 
};

/**
 * Search data
 * @param {Object} state  The global state object
 * @param {Object} action The requested action
 */
export default function Search(state = initialSearch, action) {
  switch (action.type) {
    case 'ROUTES_PENDING':
      return {
        ...state,
        error:  null,
        routes: []
      };

    case 'ROUTES_FULFILLED':
      return {
        ...state,
        routes: action.payload.data.routes
      };

    case 'ROUTES_REJECTED':
      return {
        ...state,
        error:  true,
        routes: []
      };

    case 'ORIGIN':
      return { 
        ...state,
        originCode: action.payload
      };

    case 'DESTIN':
      return { 
        ...state,
        destinCode: action.payload
      };

    case 'TOGGLE_RETURN':
      return { 
        ...state,
        numJourneys: (state.numJourneys === 2 ? 1 : 2)
      };

    default:
      return state;
  }
}

export function selectDestin(value) {
  return {
    type: 'DESTIN',
    payload: value
  };
}

export function selectOrigin(value) {
  return {
    type: 'ORIGIN',
    payload: value
  };
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
    payload: axios.get("http://vitela.2e-systems.com:9035/routes?lang=en")
  };
}

export function toggleReturn() {
  return {
    type: 'TOGGLE_RETURN'
  };
}