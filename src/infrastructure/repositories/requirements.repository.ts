import prisma from "@/lib/prisma";
import { RequirementMapper } from "@/src/application/mappers/RequirementMapper";
import { IRequirementsRepository } from "@/src/application/repositories/requirements.repository.interface";
import { Requirement } from "@/src/entities/requirements";

export class RequirementsRepository implements IRequirementsRepository {
  async getRequirements(): Promise<Requirement[]> {
    const requirements = await prisma.requirement.findMany({
      include: {
        documents: {
          include: {
            versions: {
              where: {
                deletedAt: null,
              },
              include: {
                validation: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });
    return requirements.map(RequirementMapper.toDomain);
  }
}
