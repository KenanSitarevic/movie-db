import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home'
import DetailedView from "./components/DetailedView";
import PageNotFound from './components/PageNotFound';

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
    
    // loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },

    errorElement: <PageNotFound />,
  },
  {
    element: <DetailedView />,
    path: "/movie/:id",

    errorElement: <PageNotFound />,
  },
  {
    element: <DetailedView />,
    path: "/show/:id",

    errorElement: <PageNotFound />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;