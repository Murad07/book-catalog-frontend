import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { addToRead } from '@/redux/features/read/readSlice';

interface IProps {
  book: IProduct;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (book: IProduct) => {
    dispatch(addToCart(book));
    toast({
      description: 'Book Added',
    });
  };
  const handleAddToRead = (book: IProduct) => {
    dispatch(addToRead(book));
    toast({
      description: 'Book Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img
            src="https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg"
            alt="book"
          />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p>Author: {book?.author}</p>
        <p className="text-sm">Genre: {book?.genre}</p>
        <p className="text-sm">Publication Date: {book?.publicationDate}</p>

        <div className="flex flex-row ">
          <Button variant="default" onClick={() => handleAddProduct(book)}>
            Add to Wishlist
          </Button>
          <Button
            className="ml-2"
            variant="default"
            onClick={() => handleAddToRead(book)}
          >
            Read
          </Button>
        </div>
      </div>
    </div>
  );
}
