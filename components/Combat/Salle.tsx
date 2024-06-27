import { getSalle } from "@/app/actions/donjon";
import { get1Perso } from "@/app/actions/personnages";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";


export default function Salle({ gateId, persoID }: { gateId: string | null, persoID: string | null }) {
  const [salle, setSalle] = useState();
  const { mutate: server_getSalle } = useMutation({
    mutationFn: getSalle,
    onSuccess(res) {
      console.log(res);
    }
  })
  useEffect(() => {
    server_get1Perso({ persoID: persoID })
  }, [])
  const { mutate: server_get1Perso } = useMutation({
    mutationFn: get1Perso,
    onSuccess(res) {
      if (JSON.parse(res).error) {
        alert('Tampered parameter')
      } else {
        server_getSalle({gateID:gateId,perso:JSON.parse(res)})
      }
    }
  })
  return (
    <div>
      <button>
        <Image src="/combat/porteDonjon.png" isZoomed width={150} height={150} radius="none" className=" top-0" />
      </button>
    </div>
  );
}