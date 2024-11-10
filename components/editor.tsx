
'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Editor() {
  const [documents, setDocuments] = useState([]);

  const createDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, 'documents'), {
        name: 'New Document',
        content: 'Sample content',
      });
      console.log('Document written with ID: ', docRef.id);
      setDocuments((prevDocs) => [...prevDocs, { id: docRef.id, name: 'New Document' }]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <button onClick={createDocument}>Create Document</button>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
}
