const initialState = {
	menu: null,
  leftSection: 'map'
};
/**
 * Layout data
 * @param {Object} state  The global state object
 * @param {Object} action The requested action
 */
export default function Layout(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_SIDE_MENU':
      return {
        ...state,
        menu: action.payload
      };

    default:
      return state;
  }
}
