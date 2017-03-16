import { FETCH_CHATROOM, NEW_MESSAGE } from '../actions/type';
import _ from 'lodash';


export default function(state={}, action){
  switch(action.type){
    case FETCH_CHATROOM:
      return action.payload;
    case NEW_MESSAGE:
      return {...state, [action.payload.newMessageKey]: action.payload };
    default:
      return state;
  }

}
