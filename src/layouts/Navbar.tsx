import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/book-catalog-logo.png';
import { useAppSelector } from '@/redux/hook';

export default function Navbar() {
  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLogedIn);
  console.log(isLoggedIn);

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
                  <Link to="/books">Products</Link>
                </Button>
              </li>
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
                  <Button variant="ghost">
                    <Link to="/logout">Logout</Link>
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
