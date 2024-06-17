"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { EditIcon } from "../EditIcon";
import { useMutation } from "react-query";
import { updateMonster } from "@/app/actions/monstres";

export default function MonstreEditModal({ sendMonstres }: { sendMonstres: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formulaire, setFormulaire] = useState({
        id: null,
        staID: null,
        nom: null,
        desc: null,
        rang: null,
        hp: null,
        mana: null,
        dmg: null,
        atkspeed: null,
        chance: null,
        dropRate: null,
    });
    // if (data != null) {
    //     switch (data.mon_rang) {
    //         case 0:
    //             var rang = "F";
    //             break;
    //         case 1:
    //             var rang = "E";
    //             break;
    //         case 2:
    //             var rang = "D";
    //             break;
    //         case 3:
    //             var rang = "C";
    //             break;
    //         case 4:
    //             var rang = "B";
    //             break;
    //         case 5:
    //             var rang = "A";
    //             break;
    //         case 6:
    //             var rang = "S";
    //             break;
    //         case 7:
    //             var rang = "Nation";
    //             break;
    //         default:
    //             var rang = "Unkown";
    //             break;
    //     }

    // }
    const setDonnees = (e: any) => {
        const { name, value } = e.target;
        setFormulaire(conteneur => ({
            ...conteneur,
            [name]: value,
        }));
    }
    const { data, isLoading, mutate: server_updateMonster } = useMutation({
        mutationFn: updateMonster,
        onSuccess: (res) => {
            // if (res.success){
            //     window.location.reload();
            // }
            console.log(res);

        },
    })

    return (
        <>
            <Tooltip content="Details">
                <Button onPress={onOpen} onClick={() => {
                    setFormulaire({
                        id: sendMonstres.mon_id,
                        staID: sendMonstres.mon_sta_id,
                        nom: sendMonstres.mon_nom,
                        desc: sendMonstres.mon_description,
                        rang: sendMonstres.mon_rang,
                        hp: sendMonstres.sta_hp,
                        mana: sendMonstres.sta_mana,
                        dmg: sendMonstres.sta_atk_dmg,
                        atkspeed: sendMonstres.sta_atk_speed,
                        chance: sendMonstres.sta_chance,
                        dropRate: null,
                    })
                }} variant="light"><EditIcon /></Button>
            </Tooltip>
            <Modal isOpen={isOpen} backdrop="blur" size="4xl" onOpenChange={onOpenChange}>
                <ModalContent className=" select-none max-h-screen">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-3xl xl:text-7xl lg:text-5xl text-purple-600"><Input onChange={setDonnees} defaultValue={sendMonstres.mon_nom.replaceAll('_', ' ')} label='Nom' name="nom"/></ModalHeader>
                            <ModalBody>
                                {
                                    <>
                                        <div className=" flex justify-between gap-x-6">
                                            <div className=" flex flex-col text-center">
                                                <Image className=" max-h-128" src={"/imagesMonstres" + sendMonstres.mon_img} />
                                                <textarea name="desc" onChange={setDonnees}>{sendMonstres.mon_description}</textarea>
                                            </div>
                                            <div className=" flex flex-col justify-evenly w-1/2">
                                                <div>
                                                    <Input type="number" className=" text-purple-300 text-4xl" label="Rang : 0 = F" name="rang" defaultValue={sendMonstres.mon_rang} onChange={setDonnees} />
                                                </div>
                                                <div>
                                                    {/* <Image className=" rounded-none w-3/4" src="/imagesMonstres/barreHp.png" /> */}
                                                    <Input type="number" defaultValue={sendMonstres.sta_hp} label='HP' name="hp" onChange={setDonnees} />
                                                </div>
                                                <div>
                                                    {
                                                        sendMonstres.sta_mana == 0 ?
                                                            <>
                                                                {/* <Image className=" rounded-none w-2/4" src="/imagesMonstres/barre0Mana.jpg" /> */}
                                                                <Input type="number" defaultValue={sendMonstres.sta_mana} label="Mana" name="mana" onChange={setDonnees} />
                                                            </>
                                                            :
                                                            <>
                                                                {/* <Image className=" rounded-none w-2/4" src="/imagesMonstres/barreMana.png" /> */}
                                                                <Input type="number" defaultValue={sendMonstres.sta_mana} label="Mana" name="mana" onChange={setDonnees} />
                                                            </>
                                                    }
                                                </div>
                                                <div>
                                                    {/* <Image className=" rounded-none w-1/3" src="/imagesMonstres/barreDmg.png" /> */}
                                                    <Input type="number" defaultValue={sendMonstres.sta_atk_dmg} label="Dégats" name="dmg" onChange={setDonnees} />
                                                </div>
                                                <div>
                                                    <Input type="number" defaultValue={sendMonstres.sta_atk_speed} label="d'attaque speed" name="atkspeed" onChange={setDonnees} />
                                                </div>
                                                <div className=" flex w-1/2 gap-x-2 items-center">
                                                    {/* <img className=" w-1/6" src="/imagesMonstres/chance.png" /> */}
                                                    <Input type="number" className=" w-full" defaultValue={sendMonstres.sta_chance} label="% de chance" endContent="%" name="chance" onChange={setDonnees} />
                                                </div>
                                                <div>
                                                    <Select label="Loot">
                                                        <SelectItem key={'key'}>
                                                            loots...
                                                        </SelectItem>
                                                    </Select>
                                                    <Input type="number" label="% de drop chance" name="dropRate" onChange={setDonnees} endContent="%" />
                                                </div>
                                                <div>
                                                    <Input type="file" label="Image monstre" labelPlacement="outside-left" name="imgMonstre"/>
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
                                <Button color="secondary" variant="bordered" onPress={(e) => {
                                    if (confirm("Voulez-vous vraiement mettre à jour ces données ?")) {
                                        server_updateMonster({ "form": formulaire });
                                    } else { 
                                    }
                                }}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
