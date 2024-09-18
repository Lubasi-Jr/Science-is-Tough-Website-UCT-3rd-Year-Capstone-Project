import NavBar from "./components/NavBar.jsx";

import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";
import Login from "./routes/Login.jsx";

function App() {
  const { session } = useAuth();

  if (!session) {
    return <Login />;
  } else {
    return (
      <>
        <NavBar />
        <div id="body">
          <Outlet />
        </div>
      </>
    );
  }
}

export default App;
