"use client"
import { getMonstres } from '@/app/actions/monstres';
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/NavBar";
import TableMonstres from '@/components/Table/TableMonstres';

export default function monstres() {
  const [monstres, setMonstres] = useState<any>();
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
  },[])
  const { mutate: server_getMonstres } = useMutation({
    mutationFn: getMonstres,
    onSuccess: (res) => {            
      setMonstres(JSON.parse(res))
    },
  })
  if (monstres) {
    return (
      <>
      <NavBar />
      <div>
        <TableMonstres columns={columns} data={monstres}/>
      </div>
    </>
  );
}
}