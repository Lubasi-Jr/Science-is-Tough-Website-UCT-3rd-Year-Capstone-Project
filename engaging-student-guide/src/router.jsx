import { createBrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
import Challenges from "./routes/Challenges.jsx";
import Favourites from "./routes/Favourites.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Quiz from "./routes/Quiz.jsx";
import Game from "./routes/Game.jsx";
import SignUp from "./routes/SignUp.jsx";
import Login from "./routes/Login.jsx";
//import Content from "./routes/Content.jsx";
import ProtectedPage from "./routes/ProtectedPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedPage />,
    errorElement: <div>404: page could not be found</div>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/weekly",
        element: <Challenges />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },

      {
        path: "/distract",
        element: <Game />,
     },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
