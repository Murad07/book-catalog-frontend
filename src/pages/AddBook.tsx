import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddBookMutation } from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

interface AddBookInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
}

export default function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookInputs>();

  const [addBook] = useAddBookMutation();
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIyMWI5ZmEwOGI4YmQyMDliNTdlZjMiLCJ1c2VyRW1haWwiOiJhcmFmQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5NDc1NjMwLCJleHAiOjE2ODk1NjIwMzB9.g8G6rZf8HHgdY4YfuMx6tmcWT4heMOZx1Yjn5B-jXNE';

  const onSubmit = async (data: AddBookInputs) => {
    console.log(data);
    try {
      const response: any = await addBook({ data, accessToken });
      console.log(response);
      if (response?.error?.data?.errorMessages[0]?.message) {
        toast.error(response?.error?.data?.errorMessages[0]?.message);
      } else {
        toast.success(response?.data?.message);
      }

      setTimeout(() => {
        // history('/');
      }, 4000);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <ToastContainer />
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Add New Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[48vh] border border-gray-300 rounded-md p-10 overflow-auto">
            <div className="flex gap-5">
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="name">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('title', { required: 'Title is required' })}
                    className="mt-2"
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                  <Input
                    type="text"
                    id="addedBy"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value="64b105444f75226531076cd2"
                    {...register('addedBy', { required: 'Title is required' })}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Genre</Label>
                  <Input
                    type="text"
                    id="genre"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('genre', { required: 'Genre is required' })}
                    className="mt-2"
                  />
                  {errors.genre && <p>{errors.genre.message}</p>}
                </div>
              </div>
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="name">Author</Label>
                  <Input
                    type="text"
                    id="author"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('author', { required: 'Author is required' })}
                    className="mt-2"
                  />
                  {errors.author && <p>{errors.author.message}</p>}
                </div>
                <div className="w-full flex flex-col mt-2">
                  <Label htmlFor="name" className="mb-4">
                    Publication Date
                  </Label>
                  <Input
                    type="date"
                    id="publicationDate"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register('publicationDate', {
                      required: 'Date is required',
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button className="w-full">AddBook</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
