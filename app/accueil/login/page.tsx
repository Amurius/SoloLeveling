"use client"
import FormLogin from '@/components/SignIn/FormLogin';
import NavBar from '@/components/navbar/NavBar';
import { use } from 'react';

export default function Login() {

  return (
    <>
      <NavBar />
      <div className=' flex justify-center items-center h-auto flex-col sm:m-10 m-2'>
        <FormLogin />
      </div>
    </>
  );
}