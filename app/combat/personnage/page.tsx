"use client"
import { get1Perso } from "@/app/actions/personnages";
import ModalPerso from "@/components/Combat/ModalPerso";
import Portails from "@/components/Combat/Portails";
import {useGetNiveau} from "@/functions/getNiveau";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function CombatPerso() {
    const [load, setLoad] = useState<number>()
    const [perso, setPerso] = useState<any>(null);
    const [niveaux, setNiveaux] = useState<any>(null)
    const searchParams = useSearchParams();
    const idPerso = searchParams.get("perso");
    const getNiveau = (xp:any) => {
        var niveau = useGetNiveau({ xpPerso: xp })
        return niveau
    } 
    useEffect(() => {
        server_get1Perso({ persoID: idPerso })
        if (perso != null){
            setNiveaux(getNiveau(perso[0].per_xp))
        }
    }, [load])
    const { mutate: server_get1Perso } = useMutation({
        mutationFn: get1Perso,
        onSuccess(res) {
            if (JSON.parse(res).error) {
                alert('Tampered parameter')
            } else {
                setPerso(JSON.parse(res))
                setNiveaux(getNiveau(JSON.parse(res)[0].per_xp))                
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
                <div className=" h-full w-full flex items-center justify-center">
                <div className=" flex gap-x-6">
                    <Portails perso={perso[0]} />
                </div>
                </div>
            </>
        );
    }
}