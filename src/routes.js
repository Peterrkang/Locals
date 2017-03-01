import {  Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Events from './components/events';
import RequireAuth from './components/auth/require_auth';
import Home from './components/home';
import EventForm from './components/event_form';
import ChatRoom from './components/chat_room';


export default (

  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="signin" component={SignIn} />
    <Route path="signout" component={SignOut} />
    <Route path="signup" component={SignUp} />
    <Route path="events" component={RequireAuth(Events)} />
    <Route path="events/new" component={RequireAuth(EventForm)} />
    <Route path="events/:id/chatroom" component={RequireAuth(ChatRoom)} />
  </Route>

);
