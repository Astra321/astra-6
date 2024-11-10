
'use client';

import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
const storage = getStorage(app);

export default function Cover() {
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    const fetchCoverUrl = async () => {
      try {
        const coverRef = ref(storage, 'covers/coverImage.jpg');
        const url = await getDownloadURL(coverRef);
        setCoverUrl(url);
      } catch (error) {
        console.error('Error fetching cover image URL:', error);
      }
    };

    fetchCoverUrl();
  }, []);

  return (
    <div>
      {coverUrl && <img src={coverUrl} alt="Cover Image" />}
    </div>
  );
}
