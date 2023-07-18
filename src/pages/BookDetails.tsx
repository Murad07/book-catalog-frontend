import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IProduct } from '@/types/globalTypes';
import { addToCart } from '@/redux/features/cart/cartSlice';

export default function BookDetails() {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLogedIn);
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const bookData = book?.data;

  // Step 2: Create a state variable to track the confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Step 4: Function to handle the actual deletion
  const [deleteBook] = useDeleteBookMutation();
  const accessToken = localStorage.getItem('accessToken') || '';

  const handleDelete = async () => {
    // console.log(bookId);
    try {
      const response: any = await deleteBook({ id: id, accessToken });
      console.log(response);
      if (response?.error?.data?.errorMessages[0]?.message) {
        toast.error(response?.error?.data?.errorMessages[0]?.message);
      } else {
        toast.success(response?.data?.message);
      }

      setTimeout(() => {
        history('/books');
      }, 4000);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleAddProduct = (book: IProduct) => {
    dispatch(addToCart(book));
    toast.success('Book Added');
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <ToastContainer />
        <div className="w-[40%]">
          <img
            src="https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg"
            alt=""
          />
        </div>
        <div className="w-[40%] space-y-3">
          <h1 className="text-3xl font-semibold">{bookData?.title}</h1>
          <p className="text-xl">Author: {bookData?.author}</p>
          <p className="text-xl">Genre: {bookData?.genre}</p>
          <p className="text-xl">
            Publication Date: {bookData?.publicationDate}
          </p>

          <Button variant="default" onClick={() => handleAddProduct(bookData)}>
            Add to Wishlist
          </Button>
        </div>
        {isLoggedIn && (
          <div className="w-[20%] space-y-3">
            <div>
              <Button>
                <Link to={`/edit-book/${id}`}>Edit</Link>
              </Button>
            </div>
            {/* Step 3: Show the confirmation dialog when clicking the Delete button */}
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-400"
              onClick={() => setShowConfirmation(true)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Step 5: Conditionally show the confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-xl">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-end mt-4">
              <Button
                className="mr-2"
                onClick={() => setShowConfirmation(false)} // Cancel button to hide the confirmation dialog
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete(); // Call the function to handle the actual deletion
                  setShowConfirmation(false); // Hide the confirmation dialog after deletion
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <BookReview id={id!} />
    </>
  );
}
