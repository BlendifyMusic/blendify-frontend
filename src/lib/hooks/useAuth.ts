'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseAuth } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
