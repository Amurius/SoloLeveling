"use client"
import { getCookies } from '@/app/actions/action' ;
import {getMonstres } from '@/app/actions/monstres';
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import AdminNav from '@/components/Admin/AdminNav';
import TableMonstresAdmin from '@/components/Table/TableMonstresAdmin';

export default function Monstres() {
  const [monstres, setMonstres] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const columns = [
    { name: "NOM", uid: "mon_nom" },
    { name: "RANG", uid: "mon_rang" },
    { name: "Base Hp", uid: "sta_hp" },
    { name: "BaseDmg", uid: "sta_atk_dmg" },
    { name: "Base Atk Speed", uid: "sta_atk_speed" },
    { name: "Base Mana", uid: "sta_mana" },
    { name: "Base Luck", uid: "sta_chance" },
    { name: "ACTIONS", uid: "mon_id" },
  ];
  useEffect(() => {
    server_getMonstres()
    server_getCookies()
  }, [])
  const { mutate: server_getMonstres } = useMutation({
    mutationFn: getMonstres,
    onSuccess: (res) => {
      setMonstres(JSON.parse(res))
    },
  })

  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      setUser(res);
    },
  })

  if (monstres && user && user.admin === 1) {
    return (
      <>
        <NavBar />
        <div className=" w-full flex py-6">
          <AdminNav />
          <TableMonstresAdmin columns={columns} data={monstres} />
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