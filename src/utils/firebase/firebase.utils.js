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
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA1STphKAxTrH8UOvpXQvWJAiW5-aBRBqE",
    authDomain: "crwn-project-db-c2fdd.firebaseapp.com",
    projectId: "crwn-project-db-c2fdd",
    storageBucket: "crwn-project-db-c2fdd.appspot.com",
    messagingSenderId: "687427965561",
    appId: "1:687427965561:web:4ce87e83b33f695cb6faa8"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  
  export const db = getFirestore(firebaseApp);
  
  export const addCollectionAndDocuments = async (
    collectionKey,
    objcetsToAdd,
    field
    ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    objcetsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  };
  
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    
    
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot)=> docSnapshot.data())
    

  }
  
  
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
    return userSnapshot;
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
  
  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth,callback);
  
  export const getCurrentUser = () => {
    return new Promise ((resolve, reject )=> {
      const unsubscribe = onAuthStateChanged(
        auth, (userAuth) => {
          unsubscribe();
          resolve(userAuth);
          
        },
        reject
      )
    })
  }