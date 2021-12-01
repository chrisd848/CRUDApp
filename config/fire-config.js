import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA8M2-XqzI5rx4iuA8TFxah81ABY7bgEYg",
  authDomain: "crudapp-bc666.firebaseapp.com",
  projectId: "crudapp-bc666",
  storageBucket: "crudapp-bc666.appspot.com",
  messagingSenderId: "47869362358",
  appId: "1:47869362358:web:821633294ecd5e1d63a617"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;