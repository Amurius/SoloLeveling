import getNiveau from "@/functions/getNiveau";
import { Image } from "@nextui-org/react";

export default function Portails({ perso }: { perso: any }) {
  var niveaux = getNiveau({ xpPerso: perso.per_xp });

  if (niveaux.niveau >= 10) {
    return (
      <>
        <Image src="/Images/Gates.jpg" alt="noFound" width={10}></Image>

      </>
    );
  } else if (niveaux.niveau >= 20) {
    return (
      <>

      </>
    );
  } else if (niveaux.niveau >= 30) {
    return (
      <>

      </>
    );
  } else if (niveaux.niveau >= 50) {
    return (
      <>

      </>
    );
  } else if (niveaux.niveau >= 75) {
    return (
      <>

      </>
    );
  } else if (niveaux.niveau >= 100) {
    return (
      <>

      </>
    );
  } else if (niveaux.niveau >= 150) {
    return (
      <>

      </>
    );
  } else {
    return (
      <>
        <Image src="/Gates.jpg" width={300} isBlurred radius="full"></Image>
      </>
    );
  }
}