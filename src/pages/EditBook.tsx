import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  useEditBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

interface UpdateBookInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
}

export default function EditBook() {
  const { register, handleSubmit } = useForm<UpdateBookInputs>();

  const history = useNavigate();

  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const bookData = book?.data;

  const [editBook] = useEditBookMutation();
  const accessToken = localStorage.getItem('accessToken') || '';

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedPublicationDate, setSelectedPublicationDate] = useState('');
  useEffect(() => {
    if (bookData?.genre) {
      setSelectedGenre(bookData.genre);
      setSelectedTitle(bookData.title);
      setSelectedAuthor(bookData.author);
      setSelectedPublicationDate(bookData.publicationDate);
    }
  }, [bookData?.genre]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
  };
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };
  const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAuthor(event.target.value);
  };
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPublicationDate(event.target.value);
    console.log(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: UpdateBookInputs) => {
    const mData = {
      title: selectedTitle,
      author: selectedAuthor,
      genre: selectedGenre,
      publicationDate: selectedPublicationDate,
    };
    try {
      const response: any = await editBook({ mData, id, accessToken });
      console.log(response);
      if (response?.error?.data?.errorMessages[0]?.message) {
        toast.error(response?.error?.data?.errorMessages[0]?.message);
      } else {
        toast.success(response?.data?.message);
      }

      setTimeout(() => {
        history(`/books`);
      }, 4000);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <ToastContainer />
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Edit Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[48vh] border border-gray-300 rounded-md p-10 overflow-auto">
            <div className="flex gap-5">
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="name">Title</Label>
                  <input
                    type="text"
                    value={selectedTitle}
                    className="border rounded px-2 py-2 w-full"
                    onChange={handleTitle}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Genre</Label>
                  <select
                    name="genre"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="border rounded mt-2 px-2 py-2 w-full"
                  >
                    <option value="Story">Story</option>
                    <option value="Programming">Programming</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-Fiction</option>
                    <option value="Non-fiction">Business</option>
                  </select>
                </div>
              </div>
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="name">Author</Label>
                  <input
                    type="text"
                    value={selectedAuthor}
                    className="border rounded px-2 py-2 w-full"
                    onChange={handleAuthor}
                    required
                  />
                </div>
                <div className="w-full flex flex-col mt-2">
                  <Label htmlFor="name" className="mb-4">
                    Publication Date
                  </Label>
                  <input
                    type="date"
                    value={selectedPublicationDate}
                    className="border rounded px-2 py-2 w-full"
                    onChange={handleDate}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button className="w-full">Update</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
