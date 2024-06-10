import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image } from "@nextui-org/react";
import { EyeIcon } from "../EyeIcon";

export default function MonstreInfoModal({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (data!=null) {
    switch (data.mon_rang) {
      case 0 : 
      var rang = "F";
      break;
      case 1 : 
      var rang = "E";
      break;
      case 2 : 
      var rang = "D";
      break;
      case 3 : 
      var rang = "C";
      break;
      case 4 : 
      var rang = "B";
      break;
      case 5 : 
      var rang = "A";
      break;
      case 6 : 
      var rang = "S";
      break;
      case 7 : 
      var rang = "Nation";
      break;
      default : 
      var rang = "Unkown";
      break;
    }
  }
  return (
    <>
      <Tooltip content="Details">
        <Button onPress={onOpen} variant="light"><EyeIcon /></Button>
      </Tooltip>
      <Modal isOpen={isOpen} backdrop="blur" size="4xl" onOpenChange={onOpenChange}>
        <ModalContent className=" select-none max-h-screen">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600">{data.mon_nom.replaceAll('_',' ')}</ModalHeader>
              <ModalBody>
                {
                  <>
                    <div className=" flex justify-between gap-x-6">
                      <div className=" flex flex-col text-center">
                        <Image className=" max-h-128" src={"/imagesMonstres" + data.mon_img} />
                        <h4>{data.mon_description}</h4>
                      </div>
                      <div className=" flex flex-col justify-evenly w-1/2">
                        <div>
                          <h4 className=" text-purple-300 text-4xl"> Rang {rang}</h4>
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
                          <img className=" w-1/6" src="/imagesMonstres/chance.png"/>
                          <h4 className=" w-full">{data.sta_chance} % de chance</h4>
                        </div>
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
