import { initializeApp } from 'firebase/app';
import {
 getAuth, 
 signInWithRedirect, 
 signInWithPopup, 
 GoogleAuthProvider,
 createUserWithEmailAndPassword 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcYsK3PmFgOiZQnTevkISuIePWoAOmHRQ",
  authDomain: "cloth-app-ff357.firebaseapp.com",
  projectId: "cloth-app-ff357",
  storageBucket: "cloth-app-ff357.appspot.com",
  messagingSenderId: "418238280034",
  appId: "1:418238280034:web:2c98e7b81b23cf1d8ffc3b"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error bro', error.message);
    }
  }
  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
