import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
const firebaseConfig = {
  apiKey: 'AIzaSyC-yKbQFAOJpMDUD4TmZvRbtht4S1PHUkc',
  authDomain: 'let-s-tech.firebaseapp.com',
  databaseURL: 'https://let-s-tech-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'let-s-tech',
  storageBucket: 'let-s-tech.appspot.com',
  messagingSenderId: '433217818947',
  appId: '1:433217818947:web:cd0054e8dc7f78a6ab9ff6',
  measurementId: 'G-CLJL5FRMP2',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const realTimeDb = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const provider2 = new firebase.auth.GithubAuthProvider();
const storage = firebase.storage();

export { auth, provider, provider2, storage, db, realTimeDb };
export default db;
