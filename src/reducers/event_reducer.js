import _ from 'lodash';
import {
  NEW_EVENT,
  FETCH_EVENTS,
  FETCH_EVENT,
  DELETE_EVENT
} from '../actions/type';

const INITIAL_STATE={};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_EVENTS:
      const newPosts = _.mapKeys(action.payload, 'id')
      return {...state, ...newPosts};
    case NEW_EVENT:
      return {...state, error: action.payload };
    case FETCH_EVENT:
      return {...state , [action.payload.id]: action.payload };
    case DELETE_EVENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }

}
