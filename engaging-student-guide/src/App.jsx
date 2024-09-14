//import NavBar from "./components/NavBar.jsx";

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient.js";
import Login from "./routes/Login.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login />;
  } else {
    // if logged in
    return (
      <>
        
        <div id="body">
          <Outlet />
        </div>
      </>
    );
  }
}

export default App;
