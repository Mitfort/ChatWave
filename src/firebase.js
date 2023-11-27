import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBUqXTvRA0LFD6dKEAzsaS6XORsyPg1ZYY",
    authDomain: "chatwave-4f963.firebaseapp.com",
    projectId: "chatwave-4f963",
    storageBucket: "chatwave-4f963.appspot.com",
    messagingSenderId: "226444978992",
    appId: "1:226444978992:web:ea410da3db25f001b836f5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app); 
