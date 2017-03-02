import { SEARCH_EVENTS } from '../actions/type';


export default function(state={}, action){

  switch(action.type){
    case SEARCH_EVENTS:
      return action.payload
    default:
      return state
  }
}
