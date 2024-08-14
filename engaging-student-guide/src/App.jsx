import NavBar from "./components/NavBar.jsx";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <div id="body">
        <Outlet />
      </div>
    </>
  );
}

export default App;
