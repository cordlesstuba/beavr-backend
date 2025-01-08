import { Header } from "@/components/Header";
import { getInjection } from "@/di/container";
import { DataTable } from "./DataTable";

export default async function RequirementsPage() {
  const getRequirementsController = getInjection("IGetRequirementsController");

  const requirements = await getRequirementsController();

  return (
    <div>
      <Header />
      <DataTable requirements={requirements} />
    </div>
  );
}
