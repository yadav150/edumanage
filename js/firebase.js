// ============================================================
// FIREBASE CONFIG & INIT
// ============================================================

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove, update, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLX-DBrAZZgi7OGRW3-oeno0PJsZ9hzEg",
  authDomain: "its-me-ame.firebaseapp.com",
  databaseURL: "https://its-me-ame-default-rtdb.firebaseio.com",
  projectId: "its-me-ame",
  storageBucket: "its-me-ame.firebasestorage.app",
  messagingSenderId: "832380884001",
  appId: "1:832380884001:web:0c9239588ceb8d8995bf60",
  measurementId: "G-L12EEJG7L9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ============================================================
// AUTH – Admin Login
// ============================================================

function loginAdmin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// ============================================================
// CRUD WRAPPERS
// ============================================================

// READ – get all records from a path
function getAllData(path) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        resolve(arr);
      } else {
        resolve([]);
      }
    }, (error) => reject(error));
  });
}

// CREATE – push new record
function createData(path, data) {
  const newRef = push(ref(db, path));
  return set(newRef, data).then(() => ({ id: newRef.key, ...data }));
}

// UPDATE – update existing record by id
function updateData(path, id, data) {
  const itemRef = ref(db, `${path}/${id}`);
  return update(itemRef, data);
}

// DELETE – remove record
function deleteData(path, id) {
  const itemRef = ref(db, `${path}/${id}`);
  return remove(itemRef);
}

// GET ONE – fetch single record
function getOneData(path, id) {
  const itemRef = ref(db, `${path}/${id}`);
  return get(itemRef).then(snapshot => snapshot.val());
}

// ============================================================
// EXPORTS
// ============================================================

export { db, auth, loginAdmin, getCurrentUser, getAllData, createData, updateData, deleteData, getOneData };
