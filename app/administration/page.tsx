"use client"
import { useEffect, useState } from "react";
import { getCookies } from "../actions/action";
import { useMutation } from "react-query";
import AdminNav from "@/components/Admin/AdminNav";
import NavBar from "@/components/navbar/NavBar";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    server_getCookies()
  }, [])

  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      setUser(res);
    },
  })

  if (user && user.admin === 1) {

    return (
      <>
      <NavBar/>
      <AdminNav/>
      </>
    );
  } else {
    return (
      <>
        <main className=" h-screen w-full flex justify-center items-center">
          <p className=" text-4xl sm:text-5xl md:text-6xl xl:text-9xl">Page non attribuée</p>
        </main>
      </>
    );
  }
}