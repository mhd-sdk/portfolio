import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <MainPage />
      }
    ],
    { basename: `${import.meta.env.BASE_URL}` }
  );
  return <RouterProvider router={router} />;
};

export default Router;
