import banner from '@/assets/images/banner.png';
import Footer from '@/layouts/Footer';
import { useGetTopBooksQuery } from '@/redux/features/books/bookApi';
import { IProduct } from '@/types/globalTypes';
import BookCard from '@/components/BookCard';

export default function Home() {
  const { data } = useGetTopBooksQuery(undefined);
  const booksData = data?.data;

  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            Unleash Your <br /> Imagination
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Where Words Come Alive!
          </p>
          <div className="text-primary mt-20">
            <p>Embark on a Literary Journey</p>
            <p>Your Gateway to Boundless Knowledge!</p>
          </div>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" />
        </div>
      </div>
      <div className="mb-10">
        <div className="flex flex-col items-center justify-center mx-20">
          <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-5">
            TOP TEN BOOKS
          </h1>
          <div className="col-span-12 grid grid-cols-4 gap-10 pb-5">
            {booksData?.map((book: IProduct) => (
              <BookCard book={book} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
