"use client"
import { get1Perso } from "@/app/actions/personnages";
import ModalPerso from "@/components/Combat/ModalPerso";
import Portails from "@/components/Combat/Portails";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function CombatPerso() {
    const [perso, setPerso] = useState(null);
    const searchParams = useSearchParams();
    const idPerso = searchParams.get("perso");
    useEffect(() => {
        server_get1Perso({ persoID: idPerso })
    }, [])
    const { mutate: server_get1Perso } = useMutation({
        mutationFn: get1Perso,
        onSuccess(res) {
            if (JSON.parse(res).error) {
                alert('Tampered parameter')
            } else {
                setPerso(JSON.parse(res))
            }
        }
    })
    if (perso != null) {
        return (
            <>
                <div className=" absolute w-screen h-screen">
                    <div className=" flex h-screen items-end">
                        <ModalPerso data={perso[0]} />
                    </div>
                    <Button color="danger" variant="flat" className=" text-4xl py-8 absolute left-0 top-0"><Link href='/accueil'>EXIT</Link></Button>
                </div>
                <div className=" h-full w-full flex items-center justify-center">
                <div className=" flex ">
                    <Portails perso={perso[0]} />
                </div>
                </div>
            </>
        );
    }
}