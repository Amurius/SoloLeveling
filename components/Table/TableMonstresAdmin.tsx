"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import MonstreInfoModal from "./Modals/MonstreInfoModal";
import MonstreEditModal from "./Modals/MonstreEditModal";
import { DeleteIcon } from "./DeleteIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableMonstresAdmin({ columns, data }: {
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
            <MonstreEditModal data={data[ligne]} />
            <Button color="danger" variant="flat"><DeleteIcon/></Button>
          </div>
        );
        default:
        return cellValue;
    }
  }, []);

  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search", { signal });
      let json = await res.json();

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });
  const hasMore = page < 9;

  if (data) {
    return (
      <>
        <Table isHeaderSticky
          selectionMode="single"
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  Load More
                </Button>
              </div>
            ) : null
          }
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