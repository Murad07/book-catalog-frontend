import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IProduct } from '@/types/globalTypes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';

export default function Books() {
  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLogedIn);
  const { data, isLoading, error } = useGetBooksQuery('');

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedPublicationYear, setSelectedPublicationYear] = useState('all');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handlePublicationYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPublicationYear(event.target.value);
  };

  const booksData = data?.data?.filter((book: IProduct) => {
    const bookTitle = book.title.toLowerCase();
    const bookAuthor = book.author.toLowerCase();
    const bookGenre = book.genre.toLowerCase();
    const query = searchQuery.toLowerCase();

    const genreFilter = selectedGenre === 'all' || book.genre === selectedGenre;
    const publicationYearFilter =
      selectedPublicationYear === 'all' ||
      book.publicationDate.substring(0, 4) === selectedPublicationYear;
    return (
      (bookTitle.includes(query) ||
        bookAuthor.includes(query) ||
        bookGenre.includes(query)) &&
      genreFilter &&
      publicationYearFilter
    );
  });

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        {isLoggedIn && (
          <Button variant="default">
            <Link to="/create-book">Add New</Link>
          </Button>
        )}
        <div className="space-y-3">
          <h1 className="text-2xl uppercase">Search</h1>
          <input
            type="text"
            placeholder="Search books..."
            className="border rounded px-2 py-1 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl uppercase">Genre</h1>
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="all">All Genres</option>
            <option value="Story">Story</option>
            <option value="Programming">Programming</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-Fiction</option>
            <option value="Non-fiction">Business</option>
            {/* Add other genre options as needed */}
          </select>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl uppercase">Publication Year</h1>
          <select
            value={selectedPublicationYear}
            onChange={handlePublicationYearChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="all">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            {/* Add other publication year options as needed */}
          </select>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IProduct) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
