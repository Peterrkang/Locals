import { FETCH_LOCATION } from '../actions/type'



export default function(state = {}, action){
  switch(action.type){
    case FETCH_LOCATION:
      return {lat: action.payload.lat, lng: action.payload.lng};
    default:
      return state;
  }
}
