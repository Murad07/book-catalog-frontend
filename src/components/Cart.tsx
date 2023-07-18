import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { HiOutlineTrash } from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeFromCart } from '@/redux/features/cart/cartSlice';
import { addToRead } from '@/redux/features/read/readSlice';
import { toast } from './ui/use-toast';

export default function Cart() {
  const { books } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToRead = (book: IProduct) => {
    dispatch(addToRead(book));
    toast({
      description: 'Book Added',
    });
  };
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
              <div className="w-[40%] border-r pr-5 shrink-0">
                <img
                  src="https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg"
                  alt=""
                  className="h-full"
                />
              </div>
              <div className="w-[40%] px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{book?.title}</h1>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
              <div className="border-l pl-5 flex flex-col ">
                <Button
                  onClick={() => dispatch(removeFromCart(book))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
                <Button
                  variant="default"
                  className="mt-2 bg-blue-500 hover:bg-blue-400"
                  onClick={() => handleAddToRead(book)}
                >
                  Read
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
