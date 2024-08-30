import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Challenges from "./routes/Challenges.jsx";
import Favourites from "./routes/Favourites.jsx";
import Home from "./routes/Home.jsx";
import Quiz from "./routes/Quiz.jsx";
import Memory from "./routes/Memory.jsx";
import SignUp from "./routes/SignUp.jsx";
import Login from "./routes/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404: page could not be found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/quizzes",
        element: <Quiz />,
      },

      {
        path: "/distract",
        element: <Memory />,
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
