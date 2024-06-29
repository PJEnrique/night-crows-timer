import React, { useContext, useEffect, useState } from "react";
import firebase from "../firebase"; // Adjust path as per your project structure
import { firestore } from "../firebase"; // Assuming you have initialized firestore in firebase.js

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userExpiration, setUserExpiration] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch user's expirationDate from Firestore
        const userRef = firestore.collection('users').doc(user.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          const userData = doc.data();
          setUserExpiration(userData.expirationDate.toDate()); // Convert Firestore timestamp to Date object
        }
      } else {
        setUserExpiration(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Check expiration periodically
    const interval = setInterval(async () => {
      if (currentUser && userExpiration && userExpiration < new Date()) {
        try {
          await handleForceLogout(currentUser.uid); // Trigger force logout if expired
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentUser, userExpiration]); // Dependencies for the effect

  const handleForceLogout = async (uid) => {
    // Sign out the user from Firebase Auth
    await firebase.auth().signOut();

    // Optionally, update Firestore to mark the user as expired or handle cleanup tasks
    // This could include setting a flag like `isExpired` to true in the user document

    // Example cleanup:
    // await firestore.collection('users').doc(uid).update({
    //   isExpired: true,
    // });
  };

  const signInWithEmailAndPassword = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // No need to check expiration here; it will be handled in the useEffect hook
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Store user data in Firestore with 1 month expiration
      await firestore.collection('users').doc(user.uid).set({
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example: 1 minute from now (for testing)
      });

      return { user };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = () => {
    return firebase.auth().signOut();
  };

  const value = {
    currentUser,
    userExpiration,
    signInWithEmailAndPassword,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
