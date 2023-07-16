import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useEditBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

interface UpdateBookInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
}

export default function EditBook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateBookInputs>();

  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const bookData = book?.data;

  const [editBook] = useEditBookMutation();
  const accessToken = localStorage.getItem('accessToken') || '';

  const onSubmit = async (data: UpdateBookInputs) => {
    // console.log(data);
    try {
      const response: any = await editBook({ data, id, accessToken });
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
        <h1 className="mb-2">Edit Book</h1>
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
                    defaultValue={bookData?.title}
                    {...register('title', {
                      validate: (value) => {
                        return (
                          isDirty || value.trim() !== '' || 'Title is required'
                        );
                      },
                    })}
                    className="mt-2"
                  />
                  {isDirty && errors.title && <p>{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="name">Genre</Label>
                  <Input
                    type="text"
                    id="genre"
                    autoCapitalize="none"
                    autoCorrect="off"
                    defaultValue={bookData?.genre}
                    {...register('genre', {
                      validate: (value) => {
                        return (
                          isDirty || value.trim() !== '' || 'Genre is required'
                        );
                      },
                    })}
                    className="mt-2"
                  />
                  {isDirty && errors.genre && <p>{errors.genre.message}</p>}
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
                    {...register('author', {
                      validate: (value) => {
                        return (
                          isDirty || value.trim() !== '' || 'Author is required'
                        );
                      },
                    })}
                    className="mt-2"
                    defaultValue={bookData?.author}
                  />
                  {isDirty && errors.author && <p>{errors.author.message}</p>}
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
                      validate: (value) => {
                        return (
                          isDirty ||
                          value.trim() !== '' ||
                          'Publication Date is required'
                        );
                      },
                    })}
                    defaultValue={bookData?.publicationDate}
                  />
                  {isDirty && errors.publicationDate && (
                    <p>{errors.publicationDate.message}</p>
                  )}
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
