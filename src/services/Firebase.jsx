import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

//chave de acesso do firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDX8Ssn868Ldbe1QCKjj6BNJzXucQLmEFY',
  authDomain: 'crm-dtd.firebaseapp.com',
  projectId: 'crm-dtd',
  storageBucket: 'crm-dtd.appspot.com',
  messagingSenderId: '166301832235',
  appId: '1:166301832235:web:56a386eba70f494a83066e'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
