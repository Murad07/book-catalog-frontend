'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/redux/features/user/userApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/redux/hook';
import { loginUser } from '@/redux/features/user/userSlice';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const history = useNavigate();

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    // console.log(data);
    try {
      const response: any = await login(data);
      console.log(response);
      if (response?.error?.data?.errorMessages[0]?.message) {
        toast.error(response?.error?.data?.errorMessages[0]?.message);
      } else {
        toast.success(response?.data?.message);
        dispatch(loginUser(response?.data?.data?.accessToken));
      }

      setTimeout(() => {
        history('/');
      }, 4000);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {/* {errors.email && <p>{errors.email.message}</p>} */}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>
          <Button>Login with email</Button>
        </div>
      </form>
    </div>
  );
}
