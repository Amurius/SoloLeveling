import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image } from "@nextui-org/react";
import getNiveau from "@/functions/getNiveau";
import { NextComponentType } from "next";
import { useMutation } from "react-query";
import { updatePointsPerso } from "@/app/actions/personnages";

export default function ModalPerso({ data, setLoad, niveaux }: { data: any, setLoad: any, niveaux: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [maxPoints, setMaxPoints] = useState<number>((niveaux.niveau - 1) * 3 - data.per_points_attribues)
  const [formulaire, setFormulaire] = useState({
    hp: 0,
    mana: 0,
    dmg: 0,
    atkspeed: 0,
    chance: 0,
  })
  const [points, setPoints] = useState<number>((niveaux.niveau - 1) * 3 - data.per_points_attribues)
  
  const addPoint = (e: any) => {
    if (points > 0) {
      setPoints(points - 1);
      const { name , value } = e.target;
      var data = formulaire[name] as number;
      data = parseInt(value) + data
      setFormulaire(conteneur => ({
        ...conteneur,
        [name]: data,
      }));
    } else {
      alert("Vous n'avez plus de points")
    }
  }
  const removePoint = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (points < maxPoints && formulaire[e.target.name] > 0) {
      setPoints(points + 1);
      const { name, value } = e.currentTarget;
      var data = formulaire[name] as number;
      data = data - parseInt(value)
      setFormulaire(conteneur => ({
        ...conteneur,
        [name]: data,
      }));
    } else {
      alert("vous ne pouvez plus pas retirer de points")
    }
  }
  const { mutate: server_updatePointsPerso } = useMutation({
    mutationFn: updatePointsPerso,
    onSuccess(res) {
      setLoad(Math.random())
    }
  })
  if (maxPoints) {
    return (
      <>
        <Tooltip content="Infos Perso">
          <Button onPress={() => { onOpen(); setPoints((niveaux.niveau - 1) * 3 - data.per_points_attribues); setMaxPoints((niveaux.niveau - 1) * 3 - data.per_points_attribues) }} variant="ghost" className=" text-3xl py-8 my-2" size="md" color="secondary">{data.per_nom}</Button>
        </Tooltip>
        <Modal isOpen={isOpen} backdrop="blur" size="2xl" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
          <ModalContent className=" select-none max-h-screen">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600">{data.per_nom + " :   niv." + niveaux.niveau}</ModalHeader>
                <ModalBody>
                  {
                    <>
                      <div className=" flex flex-col gap-y-6">
                        <div>
                          <h4 className=" text-purple-300 text-4xl">{"Classe : " + data.cla_nom}</h4>
                          {points ? <h4>{"Points restant : " + points}</h4> : <h4>Aucun point restant</h4>}
                        </div>
                        <div>
                          <Image className=" rounded-none w-3/4" src="/imagesMonstres/barreHp.png" />
                          <div className=" flex">
                            <h4>{data.sta_hp} HP +</h4>
                            {formulaire ? <h4>{formulaire.hp}</h4> : <></>}
                            <Button size="sm" color="success" variant="flat" className=" text-3xl ms-6" name="hp" value={10} onClick={(e) => removePoint(e)}>-</Button>
                            <Button size="sm" color="success" variant="flat" className=" text-3xl ms-1" name="hp" value={10} onClick={(e) => addPoint(e)}>+</Button>
                          </div>
                        </div>
                        <div>
                          {
                            data.sta_mana == 0 ?
                              <>
                                <Image className=" rounded-none w-2/4" src="/imagesMonstres/barre0Mana.jpg" />
                                <div className=" flex">
                                  <h4>{data.sta_mana} Mana + </h4>
                                  {formulaire ? <h4>{formulaire.mana}</h4> : <></>}
                                  <Button size="sm" color="primary" variant="flat" className=" text-3xl ms-6" name="mana" value={5} onClick={(e) => removePoint(e)}>-</Button>
                                  <Button size="sm" color="primary" variant="flat" className=" text-3xl ms-1" name="mana" value={5} onClick={(e) => addPoint(e)}>+</Button>
                                </div>
                              </>
                              :
                              <>
                                <Image className=" rounded-none w-2/4" src="/imagesMonstres/barreMana.png" />
                                <div className=" flex">
                                  <h4>{data.sta_mana} Mana + </h4>
                                  {formulaire ? <h4>{formulaire.mana}</h4> : <></>}
                                  <Button size="sm" color="primary" variant="flat" className=" text-3xl ms-6" name="mana" value={5} onClick={(e) => removePoint(e)}>-</Button>
                                  <Button size="sm" color="primary" variant="flat" className=" text-3xl ms-1" name="mana" value={5} onClick={(e) => addPoint(e)}>+</Button>
                                </div>
                              </>
                          }
                        </div>
                        <div>
                          <Image className=" rounded-none w-1/3" src="/imagesMonstres/barreDmg.png" />
                          <div className=" flex">
                            <h4>{data.sta_atk_dmg} Dégats +</h4>
                            {formulaire ? <h4>{formulaire.dmg}</h4> : <></>}
                            <Button size="sm" color="danger" variant="flat" className=" text-3xl ms-6" name="dmg" value={2} onClick={(e) => removePoint(e)}>-</Button>
                            <Button size="sm" color="danger" variant="flat" className=" text-3xl ms-1" name="dmg" value={2} onClick={(e) => addPoint(e)}>+</Button>
                          </div>
                        </div>
                        <div className="flex">
                          <h4>{data.sta_atk_speed} d'attaque speed + </h4>
                          {formulaire ? <h4>{formulaire.atkspeed}</h4> : <></>}
                          <Button size="sm" variant="flat" className=" text-3xl ms-6" name="atkspeed" value={1} onClick={(e) => removePoint(e)}>-</Button>
                          <Button size="sm" variant="flat" className=" text-3xl ms-1" name="atkspeed" value={1} onClick={(e) => addPoint(e)}>+</Button>
                        </div>
                        <div className=" flex w-max gap-x-2 items-center">
                          <img className=" w-8" src="/imagesMonstres/chance.png" />
                          {formulaire["chance"] + data.sta_chance < 100 ? <><h4 className=" w-full">{data.sta_chance + " % de chance +"}</h4><h4>{formulaire.chance}</h4></> : <h4 className=" w-full">{data.sta_chance + "+ " + formulaire.chance + " % de chance : MAXED"}</h4>}
                          <Button size="sm" variant="flat" className=" text-3xl" name="chance" value={1} onClick={(e) => removePoint(e)}>-</Button>
                          {formulaire["chance"] + data.sta_chance < 100 ? <Button size="sm" variant="flat" className=" text-3xl" name="chance" value={1} onClick={(e) => addPoint(e)}>+</Button> : <></>}
                        </div>
                        <div>
                          <h4>Compétence :</h4>
                          <div>
                            <h5 className=" text-purple-400">{data.com_nom.replaceAll('_', ' ')} : {data.com_dmg}% des dégats, {data.com_cout} Mana</h5>
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
                  <Button color="danger" variant="light" onPress={() => {
                    onClose(); setFormulaire({
                      hp: 0,
                      mana: 0,
                      dmg: 0,
                      atkspeed: 0,
                      chance: 0,
                    })
                  }}>
                    Close
                  </Button>
                  <Button onPress={() => {
                    if (confirm("Voulez-vous vraiement mettre à jour ces données ?")) {
                      server_updatePointsPerso({ "persoID": data.per_id, "formulaire": formulaire, "pointsAttr": data.per_points_attribues + (maxPoints - points) })
                      onClose()
                      setFormulaire({
                        hp: 0,
                        mana: 0,
                        dmg: 0,
                        atkspeed: 0,
                        chance: 0,
                      })
                    } else {
                    }
                  }}>
                    Valider ?
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
