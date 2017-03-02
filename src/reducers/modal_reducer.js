import { OPEN_MODAL } from '../actions/type'

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case OPEN_MODAL:
      return action.payload;
    default:
      return state;
  }
}
