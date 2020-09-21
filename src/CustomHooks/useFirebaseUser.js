import { useState, useEffect } from "react";
import firebase from "../Firebase/firebase";

const useFirebaseUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.authChange((currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return user;
};

export default useFirebaseUser;
