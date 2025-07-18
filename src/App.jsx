import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import { WatchPage } from "./components/WatchPage";
import { MainContainer } from "./components/MainContainer";
import SearchPage from "./components/SearchPage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Header />
          <Body />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
