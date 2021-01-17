import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBIFDnC0tFA-TYbv8Jhzj_DsLf7JRVogTg",
  authDomain: "robinhood-clone-34795.firebaseapp.com",
  projectId: "robinhood-clone-34795",
  storageBucket: "robinhood-clone-34795.appspot.com",
  messagingSenderId: "292441941127",
  appId: "1:292441941127:web:f80110f9dbe44029fa8422",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };


