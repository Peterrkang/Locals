import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBPcm4EA0qIK51YnanpLSV4bwlzaITQGII",
  authDomain: "locals-server.firebaseapp.com",
  databaseURL: "https://locals-server.firebaseio.com"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
