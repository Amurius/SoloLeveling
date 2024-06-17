import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image } from "@nextui-org/react";
import { EyeIcon } from "../EyeIcon";
import ModalPerso from "@/components/Combat/ModalPerso";
import { DeleteIcon } from "../DeleteIcon";
import { useMutation } from "react-query";
import { deletePerso, getPersosUser } from "@/app/actions/personnages";

export default function PersosModal({ data }: { data: number }) {
  const [personnage, setPersonnage] = React.useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: server_deletePerso } = useMutation({
    mutationFn: deletePerso,
    onSuccess(res) {
      
    }
  })
  useEffect(() => {
    server_getPersosUser({ userID: data })
  }, [])
  const { mutate: server_getPersosUser } = useMutation({
    mutationFn: getPersosUser,
    onSuccess: (res) => {
      setPersonnage(JSON.parse(res))
    },
  })
  if (personnage) {
    return (
      <>
        <Tooltip content="Infos Perso">
          <Button onPress={onOpen} variant="ghost" ><EyeIcon /></Button>
        </Tooltip>
        <Modal isOpen={isOpen} backdrop="blur" size="md" onOpenChange={onOpenChange}>
          <ModalContent className=" select-none max-h-screen">
            {(onClose) => (
              <>
                {personnage.map((perso: any) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600">{perso.per_nom}</ModalHeader>
                    <ModalBody>
                      <div className=" flex justify-between">
                        <Button className=" text-xl">{perso.per_nom}</Button>
                        <Tooltip content="Supprimer">
                          <Button onPress={() => server_deletePerso(perso.per_id)} color="danger"><DeleteIcon /></Button>
                        </Tooltip>
                      </div>
                    </ModalBody >
                  </>
                ))
                }
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
