import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  requirements: {
    id: string;
    name: string;
    description: string;
    progress: number;
  }[];
}

export function DataTable({ requirements }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requirements.map((requirement) => (
          <TableRow key={requirement.id}>
            <TableCell>{requirement.name}</TableCell>
            <TableCell>{requirement.description}</TableCell>
            <TableCell>
              <Progress value={requirement.progress} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
