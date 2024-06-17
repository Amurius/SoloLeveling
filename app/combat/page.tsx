"use client"
import { getCookies } from "@/app/actions/action";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getPersosUser } from "../actions/personnages";
import { useSearchParams } from "next/navigation";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Link } from "@nextui-org/react";

export default function Combat() {

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
  type Personnage = typeof personnages[0]
  if (user != null && personnages != null) {
    return (
      <>
        <div className=" h-full w-full flex justify-center items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className=" text-5xl text-purple-300 p-10"
              >
                Choisit ton personnage
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {
                personnages.map((personnage:Personnage) => (
                  <DropdownItem key={personnage.per_id}><Link  href={"/combat/personnage?idPerso=" + personnage.per_id} className=' lg:text-2xl md:text-xl text-lg text-purple-100 w-full'>{personnage.per_nom + " /  Classe: " + personnage.cla_nom}</Link></DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
          </div>
          
      </>
    );
  }
}