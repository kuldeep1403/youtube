import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import { WatchPage } from "./components/WatchPage";
import { MainContainer } from "./components/MainContainer";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);

  return (
    <div className="">
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
