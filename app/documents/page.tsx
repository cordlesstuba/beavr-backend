import { Header } from "@/components/Header";
import { getInjection } from "@/di/container";
import { DataTable } from "./components/DataTable";
import { DialogNewVersion } from "./components/DialogNewVersion";
import { DocumentPanel } from "./components/DocumentPanel";

export default async function DocumentsPage() {
  const getDocumentsController = getInjection("IGetDocumentsController");

  const documents = await getDocumentsController();

  return (
    <div>
      <Header />
      <DataTable documents={documents} />
      <DocumentPanel />
      <DialogNewVersion />
    </div>
  );
}
