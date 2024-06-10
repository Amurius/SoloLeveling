"use client"
import NavBar from "@/components/navbar/NavBar";
import AdminNav from "@/components/Admin/AdminNav";
import NiceTable from "@/components/Table/NiceTable";
import { useMutation } from "react-query";
import { getCookies, getUsers } from "@/app/action";
import { useEffect, useState } from "react";

export default function Utilisateur() {
  const columns = [
    { name: "NAME", uid: "us_prenom" },
    { name: "EMAIL", uid: "us_email" },
    { name: "ADMIN", uid: "us_admin" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  useEffect(() => {
    server_getCookies()
    server_getUsers()
  }, [])

  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      if (res.error) {

      }
      else {
        setUser(res);
      }
    },
  })
  const { mutate: server_getUsers } = useMutation({
    mutationFn: getUsers,
    onSuccess: (res) => {
      setUsers(JSON.parse(res));
    },
  })
  
  if (users && user && user.admin === 1) {
    return (
      <>
        <NavBar />
        <div className=" w-full flex py-6">
          <AdminNav />
          <NiceTable columns={columns} data={users} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <main className=" h-screen w-full flex justify-center items-center">
          <p className=" text-4xl sm:text-5xl md:text-6xl xl:text-9xl">Page non attribué</p>
        </main>
      </>
    );
  }
}
