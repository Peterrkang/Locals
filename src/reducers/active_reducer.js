import { SELECTED_EVENT } from '../actions/type';


export default function(state={}, action){

  switch(action.type){
    case SELECTED_EVENT:
      return action.payload
    default:
      return state
  }
}
