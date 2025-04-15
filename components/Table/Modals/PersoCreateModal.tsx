"use client"

import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "../EditIcon";
import { useMutation } from "react-query";
import { createPerso } from "@/app/actions/personnages";
import { useEffect, useState } from "react";
import { getClasses } from "@/app/actions/classes";
import React from "react";
import { createImage } from "@/app/actions/image";

export default function PersoCreateModal({ user }: { user: any }) {
  const [classes, setClasses] = useState<any>()
  const [nom, setNom] = useState<string>("")
  const [classe, setClasse] = useState<string>("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: server_createPerso } = useMutation({
    mutationFn: createPerso,
    onSuccess(res) {
      if (res.error) {
        alert("Veuillez renseigner tous les champs")
      } else {
        alert("Création réussie !")
        onOpenChange();
      }
    }
  })
  useEffect(() => { server_getClasses(); }, []);
  const { mutate: server_getClasses } = useMutation({
    mutationFn: getClasses,
    onSuccess(res) {
      setClasses(JSON.parse(res))
    }
  })
  type Classe = typeof classes[0];
  const selectClasse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClasse(e.target.value);
  }
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNom(e.target.value);
  }
  
//  const { mutate:server_createImage} = useMutation({
//   mutationFn:createImage,

//  })
  return (
    <>
        <Button onPress={onOpen} onClick={() => {
          setNom("");
          setClasse("");
        }} variant="light" className=" text-xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl text-purple-400 py-8">Nouveau personnage : <EditIcon /></Button>
      <Modal isOpen={isOpen} backdrop="blur" size="2xl" onOpenChange={onOpenChange}>
        <ModalContent className=" select-none max-h-screen min-h-80">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600">Nouveau personnage !</ModalHeader>
              <ModalBody className=" justify-center">
                {
                  <>
                    <div className=" flex justify-between gap-x-6">
                      <div className=" flex flex-col text-center">
                        <Input label="Nommez votre personnage" size="lg" className="font-gothic min-w-52" isRequired onChange={(e) => setValue(e)} />
                        {/* <Image className=" max-h-128" src={"/imagesMonstres" + data.mon_img} />
                        <h4>{data.mon_description}</h4> */}
                      </div>
                      <div className=" flex flex-col justify-evenly w-1/2">
                        <Select label="Sélectionnez votre classe" size="lg" isRequired onChange={(e) => selectClasse(e)}>
                          {classes.map((classe: Classe) => (
                            <SelectItem key={classe.cla_id}>
                              {classe.cla_nom}
                            </SelectItem>
                          ))
                          }
                        </Select>
                      </div>
                    </div>
                  </>
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" variant="bordered" onPress={() => server_createPerso({ "nom": nom, "classeID": classe, "userID": user.id })}>
                  Créer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}