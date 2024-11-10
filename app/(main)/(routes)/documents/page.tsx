
'use client';

import { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
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

interface Document {
  id: string;
  name: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, 'documents'));
      const docsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Document[];
      setDocuments(docsList);
    };

    fetchDocuments();
  }, []);

  const createDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, 'documents'), {
        name: 'New Document',
      });
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
