"use client"
import FormSign from '@/components/SignIn/FormSign';
import NavBar from "@/components/navbar/NavBar"
import { use } from 'react';

export default function SignIn() {

  return (
    <>
      <NavBar />
      <div className=' flex justify-center items-center h-auto flex-col sm:m-10 m-2'>
        <FormSign />
      </div>
    </>
  );
}