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

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img
            src="https://webneel.com/sites/default/files/images/download/thumb/old-book-with-blank-cover%201_0.jpg"
            alt=""
          />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{bookData?.title}</h1>
          <p className="text-xl">Author: {bookData?.author}</p>
          <p className="text-xl">Genre: {bookData?.genre}</p>
          <p className="text-xl">
            Publication Date: {bookData?.publicationDate}
          </p>

          <Button>Add to Wishlist</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
