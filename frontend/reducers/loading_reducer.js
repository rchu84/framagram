// import { START_LOADING_ALL_POKEMON, START_LOADING_SINGLE_POKEMON, RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON } from '../actions/pokemon_actions';
// import { RECEIVE_ERRORS } from '../actions/error_actions';

const initialState = { index: false, detail: false, explore: false, user: false, form: false };

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    // case RECEIVE_ERRORS:
    //   nextState.detail = false;
    //   return nextState;
    // case RECEIVE_ALL_POKEMON:
    //   nextState.index = false;
    //   return nextState;
    // case RECEIVE_SINGLE_POKEMON:
    //   nextState.detail = false;
    //   return nextState;
    // case START_LOADING_ALL_POKEMON:
    //   nextState.index = true;
    //   return nextState;
    // case START_LOADING_SINGLE_POKEMON:
    //   nextState.detail = true;
    //   return nextState;
    default:
      return state;
  }
};

export default loadingReducer;