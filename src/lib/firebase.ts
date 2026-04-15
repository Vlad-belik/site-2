import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// All keys removed or replaced with generic mocks for visual-only environment
const firebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "tired-threads.firebaseapp.com",
  projectId: "tired-threads",
  storageBucket: "tired-threads.appspot.com",
  messagingSenderId: "0000000000",
  appId: "1:0000000000:web:0000000000"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
