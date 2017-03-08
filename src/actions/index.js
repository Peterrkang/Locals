import axios from 'axios';
import { browserHistory } from 'react-router';
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


const ROOT_URL = 'https://locals-server.herokuapp.com';
let TOKEN_CONFIG = {
  headers: { Authorization: localStorage.getItem('token') }
};

export function signinUser({ email, password }) {
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        TOKEN_CONFIG = {
          headers: { Authorization: localStorage.getItem('token') }
        };
        browserHistory.push('/events');
      })
      .catch(()=> {
        dispatch(authError("Bad Login Info"));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return { type: UNAUTH_USER };
}

export function signupUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        TOKEN_CONFIG = {
          headers: { Authorization: localStorage.getItem('token') }
        };
        browserHistory.push('/events');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error))
      });
  }
}


export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchEvents(){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/events`, TOKEN_CONFIG)
    .then(response => {
        dispatch({
          type: FETCH_EVENTS,
          payload: response.data
        });
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function createEvent({title, address, description}, {lat, lng}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/events`, { title, address, description, lat, lng }, TOKEN_CONFIG)
      .then(response => {
        dispatch({
          type: NEW_EVENT,
          payload: {title, address, description, lat, lng }});
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function selectEvent(event){
  return {
    type: SELECTED_EVENT,
    payload: event
  };
}

export function fetchChatRoom(id){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/events/${id}/chatroom`, TOKEN_CONFIG)
    .then(response => {
        dispatch({
          type: FETCH_CHATROOM,
          payload: response.data
        });
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function addMessage({message, id, user}){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/events/${id}/chatroom`,{ message, id } , TOKEN_CONFIG)
    .then(response => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { message, user, id }
        });
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function openModal(modal){
  return{
    type: OPEN_MODAL,
    payload: modal
  }
}

export function searchEvents(term){
  return{
    type: SEARCH_EVENTS,
    payload: term
  }
}
