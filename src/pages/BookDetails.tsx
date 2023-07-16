import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const bookData = book?.data;

  // Step 2: Create a state variable to track the confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Step 4: Function to handle the actual deletion
  const handleDelete = () => {
    // Perform the deletion logic here
    // ...
    // Once the deletion is complete, you may want to redirect the user to another page or update the UI accordingly
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
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

          <Button>Add to Wishlist</Button>
        </div>
        <div className="w-[20%] space-y-3">
          <div>
            <Button>Edit</Button>
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

      <ProductReview id={id!} />
    </>
  );
}
