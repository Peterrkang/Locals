import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import eventReducer from './event_reducer';
import activeReducer from './active_reducer';
import chatReducer from './chat_reducer';
import modalReducer from './modal_reducer';
import searchReducer from './search_reducer';
import locationReducer from './location_reducer';




const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  events: eventReducer,
  activeEvent: activeReducer,
  chat: chatReducer,
  modal: modalReducer,
  search: searchReducer,
  location: locationReducer
});

export default rootReducer;
