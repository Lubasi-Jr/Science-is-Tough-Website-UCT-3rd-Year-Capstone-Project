import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log("session onAuthStateChange: ", session);
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

{/*sgns user out of website*/}
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("error: ", error);
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, signOut, session }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
