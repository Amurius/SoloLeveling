"use client"
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon } from "@/components/SignIn/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/SignIn/EyeSlashFilledIcon";
import React from 'react';
import { postLogin } from '@/app/actions/action';
import { useMutation } from 'react-query';

export default function FormLogin() {
  const [formulaire, setFormulaire] = React.useState({
    email: "",
    password: null,
  })

  const setDonnees = (e: any) => {
    const { name, value } = e.target;
    setFormulaire(conteneur => ({
      ...conteneur,
      [name]: value,
    }));
  }
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { data, isLoading, mutate: server_postLogin } = useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      if (res?.error == 'password'){
        alert("Mot de passe incorrect")
      } else if (res?.success){
        window.location.replace("/accueil")
      }
    },
  })

  return (
    <>
      <p className=' text-center text-purple-800 sm:m-16 lg:text-7xl md:text-5xl text-4xl m-6 my-24'>Reprenez votre aventure !</p>
      <form className=' 2xl:w-6/12 xl:w-7/12 md:min-w-96 sm:min-w-60 '>
        <div className=' xl:m-8 md:p-6 md:border-2 rounded-lg  border-zinc-900 sm:my-2'>
          <Input
            isClearable
            isRequired
            size='lg'
            value={formulaire.email}
            type="email"
            name='email'
            label="Email"
            color="secondary"
            errorMessage="Please enter a valid email"
            onChange={setDonnees}
          />
          <Input
            isRequired
            size='lg'
            label="Password"
            name='password'
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            color="secondary"
            errorMessage="Must contain a : lowercase and uppercase letter, number and special character."
            onChange={setDonnees}
          />
        </div>
        <div className=' w-full flex justify-center my-20'>
        <Button onClick={() => server_postLogin({ "formulaire": formulaire })} radius='full' size='lg' className=' bg-gradient-to-tl from-purple-950 to-purple-700 shadow-lg self-center text-3xl text-black'>
          Login
        </Button>
        </div>
      </form>

    </>
  );
}