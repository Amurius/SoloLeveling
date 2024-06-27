"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import MonstreInfoModal from "./Modals/MonstreInfoModal";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableMonstres({ columns, data }: {
  columns: any, data: any
}) {  
  var ligne = 0;
  type Monstre = typeof data[0];
  const renderCell = React.useCallback((user: Monstre, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Monstre];
    switch (columnKey) {
      case "mon_nom":
        return (
          <div className="capitalize"  >
            <p className="lg:text-2xl text-lg capitalize text-purple-700">{cellValue.replaceAll('_',' ')}</p>
          </div>
        );
      case "mon_rang":
        switch (cellValue) {
          case 0:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">F</p>
              </div>
            );
            break;
          case 1:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">E</p>
              </div>
            );
            break;
          case 2:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">D</p>
              </div>
            );
            break;
          case 3:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">C</p>
              </div>
            );
            break;
            case 4:
              return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">B</p>
              </div>
            );
            break;
            case 5:
              return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">A</p>
              </div>
            );
            break;
            case 6:
              return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">S</p>
              </div>
            );
            break;
            case 7:
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">Nation</p>
              </div>
            );
            break;
            default:
              return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">Unknown</p>
              </div>
            );
        }
        case "sta_hp":
          return (
          <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
        case "sta_atk_dmg":
          return (
            <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
        case "sta_atk_speed":
          return (
            <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
        case "sta_mana":
          return (
            <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
        case "sta_chance":
          return (
            <div className="capitalize" >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
        case "mon_id":              
        ligne++;
        if(ligne > data.length){
          ligne = 0;
        }        
        return (
          <div className="relative flex items-center gap-2">
            <MonstreInfoModal data={data[ligne]} />
          </div>
        );
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
            base: "max-h-[90vh] ",
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
              <TableRow key={item.mon_id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  }
}