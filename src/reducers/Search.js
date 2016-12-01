const initialSearch = {
  originCode: "",
  destinCode: "",
  numJourneys: 2,
  departureDate: "",
  returnDate: "",
  numAdt: 1,
  numChd: 0,
  numInf: 0
};

/**
 * Search data
 * @param {Object} state  The global state object
 * @param {Object} action The requested action
 */
export default function Search(state = initialSearch, action) {
  switch (action.type) {
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

    case 'DEPARTURE_DATE':
      return {
        ...state,
        departureDate: action.payload
      };

    case 'RETURN_DATE':
      return {
        ...state,
        returnDate: action.payload
      };

    case 'TOGGLE_RETURN':
      return {
        ...state,
        numJourneys: (state.numJourneys === 2 ? 1 : 2)
      };

    case 'RESET_SEARCH':
      return initialSearch;

    case 'PAX_NUM':
      const paxType = action.payload.paxType;
      const paxNum = (action.payload.operation == "+") ? state[paxType] + 1 :  state[paxType] - 1;
      let newState = {};
      newState[paxType] = paxNum;
      return {
        ...state,
        ...newState
      };

      break;

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

export function selectDepartureDate(value) {
  return {
    type: 'DEPARTURE_DATE',
    payload: value
  };
}

export function selectReturnDate(value) {
  return {
    type: 'RETURN_DATE',
    payload: value
  };
}

export function setPaxNum( paxType, operation) {
  return {
    type: 'PAX_NUM',
    payload: {paxType: paxType, operation: operation}
  }
}

export function toggleReturn() {
  return {
    type: 'TOGGLE_RETURN'
  };
}

export function resetSearch() {
  return {
    type: 'RESET_SEARCH'
  };
}
