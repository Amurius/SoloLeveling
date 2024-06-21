import useGetNiveau from "@/functions/getNiveau";
import { Button, Image, Link } from "@nextui-org/react";

export default function Portails({ perso }: { perso: any }) {
  var niveaux = useGetNiveau({ xpPerso: perso.per_xp });
  console.log(perso.per_id);
  if (niveaux.niveau < 10) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=1"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang F</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 20) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=1"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang F</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=2"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang E</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 30) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=1"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang F</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=2"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang E</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=3"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang D</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 50) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=1"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang F</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=2"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang E</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=3"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang D</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=4"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang C</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 75) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=2"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang E</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=3"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang D</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=4"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang C</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=5"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4" >Portail de rang B</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 100) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=3"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang D</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=4"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang C</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=5"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4" >Portail de rang B</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=6"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang A</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau < 150) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=4"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang C</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=5"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4" >Portail de rang B</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=6"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang A</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=7"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang S</h4>
        </Link>
      </>
    );
  } else if (niveaux.niveau >= 150) {
    return (
      <>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=5"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4" >Portail de rang B</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=6"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang A</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=7"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang S</h4>
        </Link>
        <Link className=" flex flex-col cursor-pointer" href={"/combat/personnage/donjon?perso="+ perso.per_id+"&gate=8"}>
          <Image src="/Gates.jpg" width={300} isBlurred radius="full" />
          <h4 className=" py-4">Portail de rang Nation</h4>
        </Link>
      </>
    );
  }
}