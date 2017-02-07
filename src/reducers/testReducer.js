/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {BABYLIST_RESPONSE} from '../actions/const';

const initialState = {};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  console.log("action=====action===",action.type)
  switch (action.type) {

    case BABYLIST_RESPONSE:
      console.log("返回返回======")
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        datashow:1,
        action: action,
      });
      break;


    default:
      /* Return original state if no actions were consumed. */
       return state;
      break;
  }
}

module.exports = reducer;
