import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image } from "@nextui-org/react";

export default function ModalPerso({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Infos Perso">
        <Button onPress={onOpen} variant="ghost" className=" text-3xl py-8 my-2" size="md" color="secondary">{data.per_nom}</Button>
      </Tooltip>
      <Modal isOpen={isOpen} backdrop="blur" size="2xl" onOpenChange={onOpenChange}>
        <ModalContent className=" select-none max-h-screen">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600">{data.per_nom}</ModalHeader>
              <ModalBody>
                {
                  <>
                    <div className=" flex flex-col gap-y-6">
                      <div>
                        <h4 className=" text-purple-300 text-4xl"> Classe : {data.cla_nom}</h4>
                      </div>
                      <div>
                        <Image className=" rounded-none w-3/4" src="/imagesMonstres/barreHp.png" />
                        <h4>{data.sta_hp} HP</h4>
                      </div>
                      <div>
                        {
                          data.sta_mana == 0 ?
                            <>
                              <Image className=" rounded-none w-2/4" src="/imagesMonstres/barre0Mana.jpg" />
                              <h4>{data.sta_mana} Mana</h4>
                            </>
                            :
                            <>
                              <Image className=" rounded-none w-2/4" src="/imagesMonstres/barreMana.png" />
                              <h4>{data.sta_mana} Mana</h4>
                            </>
                        }
                      </div>
                      <div>
                        <Image className=" rounded-none w-1/3" src="/imagesMonstres/barreDmg.png" />
                        <h4>{data.sta_atk_dmg} Dégats</h4>
                      </div>
                      <div>
                        <h4>{data.sta_atk_speed} d'attaque speed</h4>
                      </div>
                      <div className=" flex w-1/2 gap-x-2 items-center">
                        <img className=" w-8" src="/imagesMonstres/chance.png" />
                        <h4 className=" w-full">{data.sta_chance} % de chance</h4>
                      </div>
                      <div>
                        <h4>Compétence :</h4>
                        <div>
                        <h5 className=" text-purple-400">{data.com_nom.replaceAll('_',' ')} : {data.com_dmg}% des dégats, {data.com_cout} Mana</h5>
                        </div>
                      </div>
                      <div>
                        <h4>Objets</h4>
                      </div>
                    </div>
                  </>
                }
              </ModalBody>
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
