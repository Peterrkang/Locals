import { FETCH_CHATROOM, ADD_MESSAGE } from '../actions/type';
import _ from 'lodash';


export default function(state={}, action){

  switch(action.type){
    case FETCH_CHATROOM:
      const newPosts = _.mapKeys(action.payload.messages, 'id');
      return {...state, messages: newPosts, user: action.payload.user, title: action.payload.title };
    case ADD_MESSAGE:
      return {...state, [action.payload.id]: action.payload.message, user: action.payload.user, title: action.payload.title };
    default:
      return state;
  }

}
