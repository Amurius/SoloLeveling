import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image, Input } from "@nextui-org/react";
import { EditIcon } from "../EditIcon";

export default function MonstreEditModal({ data }: { data: any }) {
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
        <Button onPress={onOpen} variant="light"><EditIcon /></Button>
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
                        <textarea>{data.mon_description}</textarea>
                      </div>
                      <div className=" flex flex-col justify-evenly w-1/2">
                        <div>
                          <Input className=" text-purple-300 text-4xl" label="Rang" defaultValue={rang}/>
                        </div>
                        <div>
                          <Image className=" rounded-none w-3/4" src="/imagesMonstres/barreHp.png" />
                          <Input defaultValue={data.sta_hp} label='HP'/>
                        </div>
                        <div>
                          {
                            data.sta_mana == 0 ?
                              <>
                                <Image className=" rounded-none w-2/4" src="/imagesMonstres/barre0Mana.jpg" />
                                <Input defaultValue={data.sta_mana} label="Mana"/>
                              </>
                              :
                              <>
                                <Image className=" rounded-none w-2/4" src="/imagesMonstres/barreMana.png" />
                                <Input defaultValue={data.sta_mana} label="Mana"/>
                              </>
                          }
                        </div>
                        <div>
                          <Image className=" rounded-none w-1/3" src="/imagesMonstres/barreDmg.png" />
                          <Input defaultValue={data.sta_atk_dmg} label="Dégats"/>
                        </div>
                        <div>
                          <Input defaultValue={data.sta_atk_speed} label="d'attaque speed"/>
                        </div>
                        <div className=" flex w-1/2 gap-x-2 items-center">
                          <img className=" w-1/6" src="/imagesMonstres/chance.png"/>
                          <Input className=" w-full" defaultValue={data.sta_chance} label="% de chance"/>
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
