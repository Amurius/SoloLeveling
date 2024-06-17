"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import getNiveau from "@/functions/getNiveau";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TablePersos({ columns, data }: {
  columns: any, data: any
}) {
  type Personnage = typeof data[0];
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
        var niveau = getNiveau({ "xpPerso": cellValue });
        return (
          <>
            <div className="capitalize flex justify-between" >
              <p className="lg:text-2xl text-sm capitalize ">{"Niv. "+niveau.niveau}</p>
              <p className="lg:text-2xl text-sm capitalize ">{niveau.xpRestant + "/" + niveau.xpNivSuivant}</p>
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