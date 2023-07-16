import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleBookQuery } from '@/redux/features/books/bookApi';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleBookQuery(id);

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
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>

          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
