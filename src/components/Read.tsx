import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { HiOutlineTrash } from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  removeFromRead,
  markAsFinished,
} from '@/redux/features/read/readSlice';

export default function Read() {
  const { books } = useAppSelector((state) => state.read);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          {/* <HiOutlineShoppingRead size="25" /> */}
          Read List
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Reading Book List</SheetTitle>
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
              <div className="border-l pl-5 flex flex-col">
                {book.isFinished && (
                  <Button
                    variant="destructive"
                    className="mb-2 bg-green-500 hover:bg-green-400"
                  >
                    Finished
                  </Button>
                )}
                {!book.isFinished && (
                  <Button
                    onClick={() => dispatch(markAsFinished(book))}
                    variant="destructive"
                    className="mb-2 bg-blue-300 hover:bg-blue-200"
                  >
                    Reading
                  </Button>
                )}
                <Button
                  onClick={() => dispatch(removeFromRead(book))}
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
