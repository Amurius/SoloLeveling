"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { useGetNiveau } from "@/functions/getNiveau";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TablePersos({ columns, data }: {
  columns: any, data: any
}) {
  const GetNiveau = (xp: any) => {
    var niveau = useGetNiveau({ xpPerso: xp })
    return niveau
  }
  type Personnage = typeof data[0];
  console.log(data[0]);
  const renderCell = React.useCallback((user: Personnage, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Personnage];
    switch (columnKey) {
      case "per_nom":
        return (
          <div className="capitalize"  >
            <p className="lg:text-2xl text-lg capitalize text-purple-700">{cellValue.replaceAll('_', ' ')}</p>
          </div>
        );
      case "cla_nom":
        return (
          <div className="flex flex-col">
            <p className="lg:text-2xl text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "per_xp":
        var niveau = GetNiveau(cellValue);
        var xpRestant = niveau.xpRestant
        var xpSuivant = niveau.xpNivSuivant
        var xp = "";
        var xpPerso = "";
        if (xpSuivant < 1000) {
        }
        else if (xpSuivant < (10 ** 6)) {
          xp = Math.trunc(xpSuivant) / 100 + "K"
        }
        else if (xpSuivant < (10 ** 9)) {
          xp = Math.trunc(xpSuivant / 1000) / 1000 + "M"
        }
        else if (xpSuivant < (10 ** 12)) {
          xp = Math.trunc(xpSuivant / (10 ** 6)) / 1000 + "B"
        }
        else if (xpSuivant < (10 ** 15)) {
          xp = Math.trunc(xpSuivant / (10 ** 9)) / 1000 + "T"
        }
        else if (xpSuivant < (10 ** 18)) {
          xp = Math.trunc(xpSuivant / (10 ** 12)) / 1000 + "Quad"
        }
        else if (xpSuivant < (10 ** 21)) {
          xp = Math.trunc(xpSuivant / (10 ** 15)) / 1000 + "Quint"
        }
        else if (xpSuivant < (10 ** 24)) {
          xp = Math.trunc(xpSuivant / (10 ** 18)) / 1000 + "SEX"
        }
        else {
          xp = Math.trunc(xpSuivant / (10 ** 21)) / 1000 + "GOD"
        }
        if (xpRestant < 1000) {
        }
        else if (xpRestant < (10 ** 6)) {
          xpPerso = Math.trunc(xpRestant) / 1000 + "K"
        }
        else if (xpRestant < (10 ** 9)) {
          xpPerso = Math.trunc(xpRestant / 1000) / 1000 + "M"
        }
        else if (xpRestant < (10 ** 12)) {
          xpPerso = Math.trunc(xpRestant / (10 ** 6)) / 1000 + "B"
        }
        else if (xpRestant < (10 ** 15)) {
          xpPerso = Math.trunc(xpRestant / (10 ** 9)) / 1000 + "T"
        }
        else if (xpRestant < (10 ** 18)) {
          xpPerso = Math.trunc(xpRestant / (10 ** 12)) / 1000 + "Quad"
        }
        else if (xpRestant < (10 ** 21)) {
          xpPerso = Math.trunc(xpRestant / (10 ** 15)) / 1000 + "Quint"
        }
        else if (xpRestant < (10 ** 24)) {
          xpPerso = Math.trunc(xpRestant / (10 ** 18)) / 1000 + "SEX"
        } else {
          xpPerso = Math.trunc(xpRestant / (10 ** 21)) / 1000 + "GOD"
        }
        return (
          <>
            <div className="capitalize flex justify-between" >
              <p className="lg:text-2xl text-sm capitalize ">{"Niv. " + niveau.niveau}</p>
              <p className="lg:text-2xl text-sm capitalize ">{xpPerso + " / " + xp}</p>
            </div>
          </>
        );
      case "info_competence":
        return (
          <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">ModalCompetences</p>
          </div>
        );
      case "info_objets":
        return (
          <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">ModalObj</p>
          </div>
        );
      case "actions":
        return (
          <div>
            <Button variant="flat" color="danger"><DeleteIcon /></Button>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  if (data) {
    return (
      <>
        <Table isHeaderSticky
          selectionMode="single"
          classNames={{
            base: "max-h-[80vh] py-6 ",
            table: "overflow-scroll"
          }}>
          <TableHeader columns={columns}>
            {(column: any) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={data}
            isLoading={false}
            loadingContent={<Spinner label="Loading..." />}>
            {(item: any) => (
              <TableRow key={item.per_id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  }
}