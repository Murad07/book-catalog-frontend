import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/book-catalog-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { logoutUser } from '@/redux/features/user/userSlice';

export default function Navbar() {
  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLogedIn);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">All Books</Link>
                </Button>
              </li>
              {isLoggedIn && (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/create-book">Add Book</Link>
                  </Button>
                </li>
              )}
              <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>
              <li>
                <Cart />
              </li>
              <li className="ml-5">
                {isLoggedIn ? (
                  // User is logged in, show logout button
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  // User is not logged in, show login button
                  <Button variant="ghost">
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
