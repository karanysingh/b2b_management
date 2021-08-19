// import firebaseConfig from '../config';
import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyBs88w_zHrP0E_vNtTqUj44mSEGELXIhtk",
	authDomain: "b2bmanagement-8ec55.firebaseapp.com",
	projectId: "b2bmanagement-8ec55",
	storageBucket: "b2bmanagement-8ec55.appspot.com",
	messagingSenderId: "153920582068",
	appId: "1:153920582068:web:1089962182b0045e8d82e1"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
