import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useAddReviewMutation,
  useGetReviewQuery,
} from '@/redux/features/books/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [addReview] = useAddReviewMutation();
  const accessToken = localStorage.getItem('accessToken') || '';

  const { data, isLoading, error, refetch } = useGetReviewQuery(id);
  const myData = data?.data;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reviewData = {
      book: id,
      reviewText: inputValue,
    };

    setInputValue('');

    try {
      const response: any = await addReview({ reviewData, accessToken });

      response?.error?.data?.errorMessages[0]?.message
        ? toast.error(response?.error?.data?.errorMessages[0]?.message)
        : toast.success(response?.data?.message);

      if (response?.data?.success) {
        refetch();
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          id="reviewText"
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {myData?.map((comment: any, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {comment.reviewBy.email.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <p>{comment.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
