import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";

const useAuth = () => {
  const [user, setUser] = useState<any>(); // Inicializamos con null

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, []);

  const signIn = async (email: any, password: any, setLoading: any) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = (): void => {
    auth.signOut().then(() => {
      setUser(null); // Actualizamos el estado cuando el usuario cierra sesión
    });
  };

  return {
    user,
    signIn,
    signOut,
  };
};

export default useAuth;