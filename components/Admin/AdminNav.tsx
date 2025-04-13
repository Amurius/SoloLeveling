"use client"
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Link } from "@nextui-org/react";
import NavBar from "@/components/navbar/NavBar";
import { getCookies } from "@/app/actions/action";

export default function AdminNav() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    server_getCookies()
  }, [])

  const { mutate: server_getCookies } = useMutation({
    mutationFn: getCookies,
    onSuccess: (res) => {
      setUser(res);
    },
  })
  const DropDownContent = ({ color, variant }: { color: any, variant: any }) => (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button color={color} variant={variant} className=' lg:text-5xl md:text-3xl text-xl text-purple-500 h-max p-2 '>
          Menu de gestion
        </Button>
      </DropdownTrigger>
      <DropdownMenu color={color} variant={variant}>
        <DropdownSection aria-label="Users" showDivider>
          <DropdownItem key="utilisateurs" textValue="utilisateurs">
            <Link href="/administration/users" className=' lg:text-2xl md:text-xl text-lg text-purple-200 w-full'>
              Utilisateurs
            </Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Monstres" showDivider>
          <DropdownItem key="monstres" textValue="addMonstres">
            <Link href="/administration/monstres" className=' lg:text-2xl md:text-xl text-lg text-purple-200 w-full'>
              Ajouter et modifier des Monstres
            </Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Classes" showDivider>
          <DropdownItem key="classes" textValue="addClasses">
            <Link href="/administration/classes" className=' lg:text-2xl md:text-xl text-lg text-purple-200 w-full'>
              Ajouter et modifier des classes
            </Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Compétences" >
          <DropdownItem key="competences" textValue="addCompetences">
            <Link href="/administration/competences" className=' lg:text-2xl md:text-xl text-lg text-purple-200 w-full'>
              Ajouter et modifier des competences
            </Link>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )

  if (user && user.admin === 1) {

    return (
      <>
        <main className=" p-4 ">
          <DropDownContent color="secondary" variant="bordered" />
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className=" h-screen w-full flex justify-center items-center">
          <p className=" text-4xl sm:text-5xl md:text-6xl xl:text-9xl">Page non attribué</p>
        </main>
      </>
    );
  }
}