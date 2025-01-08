"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGlobalStore } from "@/store/global";

import { ChevronRight } from "lucide-react";

interface DataTableProps {
  documents: {
    id: string;
    name: string;
    description: string;
    status: string;
  }[];
}

export function DataTable({ documents }: DataTableProps) {
  const { onDocumentPanelOpen } = useGlobalStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow
            key={document.id}
            onClick={() => onDocumentPanelOpen(document.id)}
          >
            <TableCell>{document.name}</TableCell>
            <TableCell>{document.description}</TableCell>
            <TableCell>{document.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronRight />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
