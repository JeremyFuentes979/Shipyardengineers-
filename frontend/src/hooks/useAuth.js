import { useState, useEffect } from 'react';
import api from '../api/client';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    // Future: call /api/auth/me to validate the token
    setLoading(false);
  }, []);

  return { user, loading };
}