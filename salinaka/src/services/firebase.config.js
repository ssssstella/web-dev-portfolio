import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const APIKEY = process.env.REACT_APP_APIKEY;
const AUTHDOMAIN = process.env.REACT_APP_AUTHDOMAIN;
const PROJECTID = process.env.REACT_APP_PROJECTID;
const STORAGEBUCKET = process.env.REACT_APP_STORAGEBUCKET;
const MESSAGINGSENDERID = process.env.REACT_APP_MESSAGINGSENDERID;
const APPID = process.env.REACT_APP_APPID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);