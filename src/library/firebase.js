import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQNx-65emHudj-IEuMgFQpPH3nFnfVwDY",
  authDomain: "budget-4b200.firebaseapp.com",
  projectId: "budget-4b200",
  storageBucket: "budget-4b200.appspot.com",
  messagingSenderId: "84025222053",
  appId: "1:84025222053:web:411470d925dee48e1cbe4c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();
const provider = new GoogleAuthProvider();

export const checkIfUserExist = async (uid) => {
  const docRef = doc(database, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const createUserWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const addUserInDatabase = async (uid, data) => {
  try {
    return await setDoc(doc(database, "Users", uid), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addEntryInDatabase = async (uid, entryData) => {
  try {
    return await setDoc(
      doc(database, `Users/${uid}/Entry`, `${entryData.id}`),
      {
        ...entryData,
      }
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateEntryInDatabase = async (uid, curCardId, entriesData) => {
  try {
    return await updateDoc(
      doc(database, `Users/${uid}/Entry`, `${curCardId}`),
      entriesData
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const deleteEntryInDatabse = async (uid, entryId) => {
  try {
    return await deleteDoc(doc(database, `Users/${uid}/Entry`, `${entryId}`));
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const getUserEntryFromDatabase = async (uid) => {
  try {
    let userTasks = [];
    await (
      await getDocs(collection(database, `Users/${uid}/Entry`))
    ).forEach((doc) => {
      userTasks.push({ ...doc.data() });
    });
    return userTasks.reverse();
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const queryall = async()=>{
  const querySnapshot = await getDocs(collection(database, "Users"));
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
})};
