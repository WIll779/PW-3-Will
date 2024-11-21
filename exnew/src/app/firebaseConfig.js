import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBEyByvJq-1i5euRn6Oh1pC-m9x1eB0eBs",
  authDomain: "meuprimeirofirebase-d50fe.firebaseapp.com",
  projectId: "meuprimeirofirebase-d50fe",
  storageBucket: "meuprimeirofirebase-d50fe.firebasestorage.app",
  messagingSenderId: "928685046602",
  appId: "1:928685046602:web:6c74ea002b160783d9dfb3"
};
//inicializando o firebase
  const app = initializeApp(firebaseConfig);
//inicializando o firestore e analytics
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };

