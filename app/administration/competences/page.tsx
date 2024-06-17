"use client"
import { getCookies } from '@/app/actions/action' ;
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import AdminNav from '@/components/Admin/AdminNav';

export default function Competences() {
  const [competences, setCompetences] = useState<any>();
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
    server_getCookies()
  }, [])
  // const { mutate: server_getCompetences } = useMutation({
  //   mutationFn: ,
  //   onSuccess: (res) => {
  //     setCompetences(JSON.parse(res))
  //   },
  // })

  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      setUser(res);
    },
  })

  if (competences && user && user.admin === 1) {
    return (
      <>
        <NavBar />
        <div className=" w-full flex py-6">
          <AdminNav />
          {/* <TableMonstresAdmin columns={columns} data={competences} /> */}
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