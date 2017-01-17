import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import eventReducer from './event_reducer';
import activeReducer from './active_reducer';
import chatReducer from './chat_reducer';




const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  events: eventReducer,
  activeEvent: activeReducer,
  chat: chatReducer
});

export default rootReducer;
