import { FETCH_CHATROOM, ADD_MESSAGE } from '../actions/type';
import _ from 'lodash';


export default function(state={}, action){
  switch(action.type){
    case FETCH_CHATROOM:
      return action.payload;
    case ADD_MESSAGE:
      return {...state, [action.payload.newMessageKey]: action.payload };
    default:
      return state;
  }

}
