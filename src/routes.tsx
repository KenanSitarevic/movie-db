import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home'
import DetailedView from "./components/DetailedView";
import PageNotFound from './components/PageNotFound';

export const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",

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