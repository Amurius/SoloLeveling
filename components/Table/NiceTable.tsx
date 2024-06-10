"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { EyeIcon } from "@/components/Table/EyeIcon"
import { EditIcon } from "@/components/Table/EditIcon"
import { DeleteIcon } from "@/components/Table/DeleteIcon"
import { useAsyncList } from "@react-stately/data";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function NiceTable({ columns, data }: {
  columns: any, data: any
}) {
  type User = typeof data[0];
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "us_prenom":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.us_pp }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "us_admin":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue == 1 ? "oui" : "non"}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{user.us_admin}</p> */}
          </div>
        );
      case "us_email":
        return (
          <div className="capitalize" color={statusColorMap[user.us_email]} >
            <p className="lg:text-xl text-sm capitalize ">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const hasMore = page < 9;

  if (data) {
    return (
      <>
        <Table isHeaderSticky
          classNames={{
            base: "max-h-[90vh] ",
            table: "overflow-scroll"
          }}>
          <TableHeader columns={columns}>
            {(column:any) => (
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
              <TableRow key={item.us_id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  }
}