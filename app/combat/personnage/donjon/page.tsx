"use client"
import { get1Perso } from "@/app/actions/personnages";
import ModalPerso from "@/components/Combat/ModalPerso";
import {useGetNiveau} from "@/functions/getNiveau";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";


export default function Donjon() {
  const searchParams = useSearchParams();
  const idPerso = searchParams.get("perso");
  const gateNum = searchParams.get("gate");
  const [load, setLoad] = useState<number>()
  const [perso, setPerso] = useState<any>(null);
  const [niveaux, setNiveaux] = useState<any>(null)
  useEffect(() => {
      server_get1Perso({ persoID: idPerso })
      if (perso != null){
          setNiveaux(useGetNiveau({ xpPerso: perso[0].per_xp }))
      }
  }, [load])
  const { mutate: server_get1Perso } = useMutation({
      mutationFn: get1Perso,
      onSuccess(res) {
          if (JSON.parse(res).error) {
              alert('Tampered parameter')
          } else {
              setPerso(JSON.parse(res))
              setNiveaux(useGetNiveau({ xpPerso: JSON.parse(res)[0].per_xp }))                
          }
      }
  })
  if (perso != null && niveaux != null) {
    return (
      <>
        <div className=" absolute w-screen h-screen">
          <div className=" flex h-screen items-end">
            <ModalPerso data={perso[0]} setLoad={setLoad} niveaux={niveaux}/>
          </div>
          <Button color="danger" variant="flat" className=" text-4xl py-8 absolute left-0 top-0"><Link href='/accueil'>EXIT</Link></Button>
        </div>
        <div className="flex items-center justify-center">
          <button>
          <Image src="/combat/porteDonjon.png" isZoomed width={150} height={150} radius="none" className=" top-0"/>
          </button>
        </div>
        </>
    );
  }
}