import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

import "firebase/firestore";

const configuration = {
  apiKey: "AIzaSyCyWnjvwkmy7gXTWZ_SxLlDUDwCnGGV4Fk",
  authDomain: "solochef-9c443.firebaseapp.com",
  projectId: "solochef-9c443",
  storageBucket: "solochef-9c443.appspot.com",
  messagingSenderId: "774252336764",
  appId: "1:774252336764:web:a5614f669d40c11cd39bf9",
};

const app = initializeApp(configuration);

const db = getFirestore(app);

export default db;
