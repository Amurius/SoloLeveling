"use client"

import { getCookies } from "@/app/actions/action";
import NavBar from "@/components/navbar/NavBar";
import NavPersos from "@/components/navbar/NavPersos";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import TablePersos from "@/components/Table/TablePersos";
import PersoCreateModal from "@/components/Table/Modals/PersoCreateModal";
import { getPersosUser } from "@/app/actions/personnages";

export default function User() {
  const [user, setUser] = useState<any>(null);
  const [personnages, setPersonnages] = useState<any>(null);
  useEffect(() => {
    server_getCookies();
  }, [])
  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      setUser(res);
      server_getPersosUser({ "userID": res.id });
    },
  })
  const { mutate: server_getPersosUser } = useMutation({
    mutationFn: getPersosUser,
    onSuccess: (res) => {
      setPersonnages(JSON.parse(res))
    },
  })
  const columns = [
    { name: "NOM", uid: "per_nom" },
    { name: "CLASSE", uid: "cla_nom" },
    { name: "NIVEAU et XP", uid: "per_xp" },
    { name: "COMPETENCES", uid: "info_competence" },
    { name: "OBJETS", uid: "info_objets" },
    { name: "ACTIONS", uid: "actions" },
  ]
  if (user) {
    return (
      <>
        <NavBar />
        <div>
          {/* <NavPersos user={user}/> */}
          {personnages != null ?
            <TablePersos columns={columns} data={personnages} />
            :
            <>
              <main className=" h-[91vh] w-full flex justify-center items-center">
                <p className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"> Vous n'avez aucun personnages</p>
              </main>
            </>
          }
          <div className=" h-20 flex justify-center">
            <PersoCreateModal user={user} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <main className=" h-[91vh] w-full flex justify-center items-center">
          <p className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"> Vous n'êtes pas connectés </p>
        </main>
      </>
    )
  }
}