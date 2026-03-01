import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.file'],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

type FirebaseUser = FirebaseAuthTypes.User | null;

interface AuthContextValue {
  user: FirebaseUser;
  getAccessToken: () => Promise<string>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const firebaseAuth = getAuth();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const getAccessToken = async (): Promise<string> => {
    if (!GoogleSignin.getCurrentUser()) {
      await GoogleSignin.signInSilently();
    }
    const { accessToken } = await GoogleSignin.getTokens();
    return accessToken;
  };

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    if (!idToken) throw new Error('Google Sign-In returned no ID token.');
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(firebaseAuth, credential);
  };

  const signOut = async () => {
    await firebaseSignOut(firebaseAuth);
    await GoogleSignin.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, getAccessToken, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>.');
  return ctx;
}

export { statusCodes };
