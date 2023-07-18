import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';
import AddBook from '@/pages/AddBook';
import EditBook from '@/pages/EditBook';
import { useAppSelector } from '@/redux/hook';

type PrivateRouteProps = {
  element: ReactNode;
  path: string;
};

// Higher-order component to protect routes that require authentication
const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const navigate = useNavigate();

  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLogedIn);

  if (!isLoggedIn) {
    navigate('/login');
    return (
      <>
        <p>Please login before Access</p>
      </>
    );
  } else {
    return element;
  }
};

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/create-book',
        element: <PrivateRoute path="/create-book" element={<AddBook />} />,
      },
      {
        path: '/edit-book/:id',
        element: <PrivateRoute path="/edit-book/:id" element={<EditBook />} />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
