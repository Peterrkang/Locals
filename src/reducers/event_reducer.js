import _ from 'lodash';
import {
  NEW_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT
} from '../actions/type';

const INITIAL_STATE={};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_EVENTS:
      return {...state, ...action.payload};
    case NEW_EVENT:
      return {...state, [action.payload.newEventKey]: action.payload};
    case DELETE_EVENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
