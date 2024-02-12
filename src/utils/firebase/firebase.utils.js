import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
     } from 'firebase/auth';
import {
  doc,
  getFirestore,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA1STphKAxTrH8UOvpXQvWJAiW5-aBRBqE",
    authDomain: "crwn-project-db-c2fdd.firebaseapp.com",
    projectId: "crwn-project-db-c2fdd",
    storageBucket: "crwn-project-db-c2fdd.appspot.com",
    messagingSenderId: "687427965561",
    appId: "1:687427965561:web:4ce87e83b33f695cb6faa8"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
  export const db = getFirestore();
  
  
  export const createUserDocumentFromAuth = async (
    userAuth,
    adittionalInformation = {},
    ) => {
      
    if(!userAuth) return;
    const userDocRef = doc(db,'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...adittionalInformation
        });
      } catch (error) {
      console.log('error creating user', error.message);
      }
    }
    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return ;
    return await createUserWithEmailAndPassword(auth, email, password)
  };
  export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return ;
    return await signInWithEmailAndPassword(auth, email, password)
  };
  export const signOutUser = async () => signOut(auth);
  
  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);