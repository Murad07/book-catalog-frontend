import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToCart,
  removeFromCart,
  removeOne,
} from '@/redux/features/cart/cartSlice';

export default function Cart() {
  const { books, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          {/* <HiOutlineShoppingCart size="25" /> */}
          Wishlist
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
        </SheetHeader>
        <div className="space-y-5">
          {books.map((book) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={book.title}
            >
              <div className="border-r pr-5 shrink-0">
                <img
                  src="https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg"
                  alt=""
                  className="h-full"
                />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{book?.title}</h1>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button
                  onClick={() => dispatch(removeFromCart(book))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
