import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCkIMAjTRW11H4g1qea_M5MpN1Mv217MRA',
  authDomain: 'Locals.firebaseio.com',
  databaseURL: 'https://locals-53319.firebaseio.com/'
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
