"use client"
import React from 'react';
import { Input } from '@nextui-org/react'
import { useState } from 'react';
import { EyeFilledIcon } from "@/components/SignIn/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/SignIn/EyeSlashFilledIcon";
import { Button, ButtonGroup } from "@nextui-org/react";
import { postSignIn } from '@/app/action';
import { useMutation } from 'react-query';

export default function FormSign() {
  const [isVisible, setIsVisible] = useState(false);
  const [formulaire, setFormulaire] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: null,
  })
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const setDonnees = (e:any) => {
    const { name, value } = e.target;
    setFormulaire(conteneur => ({
      ...conteneur,
      [name]: value,
    }));
  } 

  const [value, setValue] = React.useState("");
  const [psw, setPsw] = React.useState("");
  const [pswConfirm, setpswConfirm] = React.useState("");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePsw = (value: string) => value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*£§_-]).{8,}$/)

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);
  const isInvalidPsw = React.useMemo(() => {
    if (psw === "") return false;
    return validatePsw(psw) ? false : true;
  }, [psw]);
  const isLikePsw = React.useMemo(() => {
    return psw === pswConfirm ? false : true;
  },[pswConfirm,psw]);
  
  const { data, isLoading, mutate: server_getUser } = useMutation({
    mutationFn: postSignIn,
    onSuccess: (res) => {
      if (res?.error == 'password'){
        alert("Mot de passe incorrect")
      }else if (res?.error == 'email'){
        alert("email incorrect")
      } else if (res?.success){
        window.location.replace("http://localhost:3000/accueil")
      }
    },
  })
  return (
    <>
      <p className=' text-center text-purple-800 sm:m-16 lg:text-7xl md:text-5xl text-4xl m-6 my-24'>Inscrivez vous !</p>
      <form className=' 2xl:w-6/12 xl:w-7/12 md:min-w-96 sm:min-w-60 '>
        <div className=' xl:m-8 md:p-6 md:border-2 rounded-lg  border-zinc-900 sm:my-2'>
          <div className=' my-4 flex gap-2'>
            <Input
              isRequired
              size='lg'
              type="text"
              label="Nom"
              name='nom'
              className=" min-w-20"
              color='secondary'
              onChange={setDonnees}
            />
            <Input
              isRequired
              size='lg'
              type="text"
              label="Prénom"
              name='prenom'
              color='secondary'
              onChange={setDonnees}
            />
          </div>
          <div className='mb-2'>
            <Input
              isClearable
              isRequired
              size='lg'
              value={value}
              type="email"
              name='email'
              label="Email"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "secondary"}
              errorMessage="Please enter a valid email"
              onValueChange={setValue}
              onChange={setDonnees}
            />
          </div>
          <div className=' mb-4 flex gap-2'>
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
              isInvalid={isInvalidPsw}
              color={isInvalidPsw ? "danger" : "secondary"}
              errorMessage="Must contain a : lowercase and uppercase letter, number and special character."
              onValueChange={setPsw}
              onChange={setDonnees}
            />
            <Input
              isRequired
              size='lg'
              label="Confirm password"
              name='passwordconfirm'
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
              isInvalid={isLikePsw}
              color={isLikePsw ? "danger" : "secondary"}
              errorMessage="Passwords do not match."
              onValueChange={setpswConfirm}
              onChange={setDonnees}
            />
          </div>
        </div>
        <div className=' w-full flex justify-center my-20'>
          <Button onClick={() => server_getUser({ "formulaire": formulaire })} radius='full' size='lg' className=' bg-gradient-to-tl from-purple-950 to-purple-700 shadow-lg self-center text-3xl text-black'>
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}