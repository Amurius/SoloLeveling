import { getSalle } from "@/app/actions/donjon";
import { useState } from "react";
import { useMutation } from "react-query";


export default function  Salle({gateId,peroID}:{gateId:number,peroID:number}){
  const [salle,setSalle] = useState();
  const { mutate: server_getSalle } = useMutation({
    mutationFn: getSalle,
    onSuccess(res) {
      console.log(res);
    }
  })
  
    return (
        <div>
            
        </div>
    );
}