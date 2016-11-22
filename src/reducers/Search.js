import axios from 'axios';

const initialSearch = { 
  origin: "",
  destin: "",
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
        origin: action.payload
      };

    case 'DESTIN':
      return { 
        ...state,
        destin: action.payload
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
    type: 'ORIGIN',
    payload: value
  };
}

export function selectOrigin(value) {
  return {
    type: 'DESTIN',
    payload: value
  };
}

export function retrieveRoutes() {
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