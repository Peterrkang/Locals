import { browserHistory } from 'react-router';
import { auth, database, timestamp, Events, Messages } from '../database';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_EVENTS,
  NEW_EVENT,
  SELECTED_EVENT,
  FETCH_CHATROOM,
  ADD_MESSAGE,
  OPEN_MODAL,
  SEARCH_EVENTS
} from './type';


export function signOutUser() {
  auth.signOut();
  localStorage.removeItem('user');
  browserHistory.push('/');
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password }){
  return function(dispatch){
    auth.createUserWithEmailAndPassword(email, password)
    .then( response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('user', response.email);
      browserHistory.push('/events');
    })
    .catch( error => {
      dispatch(authError(error.message))
    })
  }
}

export function signinUser({ email, password }) {
  return dispatch => {
    auth.signInWithEmailAndPassword(email, password)
    .then( response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('user', response.email);
      browserHistory.push('/events');
    })
    .catch( error => {
      dispatch(authError(error.message));
    })
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchEvents(){
  return dispatch => {
    Events.on('value', snapshot => {
      dispatch({
        type: FETCH_EVENTS,
        payload: snapshot.val()
      });
    })
  }
}

export function fetchChatRoom(eventId){
  return dispatch => {
    Messages.on('value', snapshot => {
      let messages = {};
      snapshot.forEach( childSnap => {
          if(childSnap.val().eventId == eventId){
            messages[childSnap.getKey()] = childSnap.val();
          }
      })
      dispatch({
        type: FETCH_CHATROOM,
        payload: messages
      });
    })
  }
}

export function createEvent({title, address, description}, {lat, lng}){
  const newEventKey = Events.push().key;
  return dispatch => {
    database.ref('events/' + newEventKey).set({ title, address, description, lat, lng })
      .then(() => {
        dispatch({
          type: NEW_EVENT,
          payload: {title, address, description, lat, lng, newEventKey}
        });
      })
      .catch(error => {
        console.log(error);
      })
    }
}

export function selectEvent(event){
  return {
    type: SELECTED_EVENT,
    payload: event
  };
}

export function searchEvents(term){
  return{
    type: SEARCH_EVENTS,
    payload: term
  }
}

export function openModal(modal){
  return{
    type: OPEN_MODAL,
    payload: modal
  }
}
