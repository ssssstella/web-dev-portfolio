import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const APIKEY = process.env.APIKEY;
const AUTHDOMAIN = process.env.AUTHDOMAIN;
const PROJECTID = process.env.PROJECTID;
const STORAGEBUCKET = process.env.STORAGEBUCKET;
const MESSAGINGSENDERID = process.env.MESSAGINGSENDERID;
const APPID = process.env.APPID;

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