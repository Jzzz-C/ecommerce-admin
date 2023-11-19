"use client";

import { FC, useState } from "react";
import { BillboardColumnProps } from "./column/billboard-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DeleteModal from "./delete-modal";
import axios from "axios";

interface CellActionProps {
  item: BillboardColumnProps;
}

const CellAction: FC<CellActionProps> = ({ item }) => {
  const router = useRouter();
  const params = useParams();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsDeleting(false);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(item.id);
  };

  const onUpdate = () => {
    router.push("/" + params.storeId + "/billboards/" + item.id);
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const res = await axios.delete(
        "/api/" + params.storeId + "/billboards/" + item.id
      );

      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <DeleteModal
        title={"Delete" + " " + item.name.toLowerCase() + " " + "billboard"}
        description="Your are sure to delete this billboard"
        isOpen={isDeleting}
        isLoading={isLoading}
        onClose={onClose}
        onDelete={onDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-6 h-5">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onCopy} className="flex items-center">
              <Copy className="w-4 h-4 mr-3" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUpdate} className="flex items-center">
              <Edit className="w-4 h-4 mr-3" />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleting(true)}
              className="flex items-center"
            >
              <Trash className="w-4 h-4 mr-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
