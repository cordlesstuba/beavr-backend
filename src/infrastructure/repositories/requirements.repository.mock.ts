import { getInjection } from "@/di/container";
import { RequirementMapper } from "@/src/application/mappers/RequirementMapper";
import { IRequirementsRepository } from "@/src/application/repositories/requirements.repository.interface";
import { Requirement } from "@/src/entities/requirements";

export class MockRequirementsRepository implements IRequirementsRepository {
  private dateTimeService = getInjection("IDateTimeService");

  private _requirements = [
    {
      id: "climate-change-action-plan",
      name: "Climate change action plan oversight",
      description:
        "Internal monitoring and governance are in place to oversee the implementation and effectiveness of the action plan related to climate change adaptation and mitigation, ensuring objectives are met and improvements are made",
      documents: [
        {
          versions: [
            {
              id: "v1",
              versionNumber: "1.0",
              fileUrl: "https://beavr.com/file1",
              expiresAt: this.dateTimeService.getCurrentDateTimePlusDays(365),
              validation: {
                id: "val1",
                validatedAt: this.dateTimeService.getCurrentDateTime(),
                remarks: "Valid",
              },
            },
          ],
        },
      ],
    },
  ];
  constructor() {}

  async getRequirements(): Promise<Requirement[]> {
    return this._requirements.map(RequirementMapper.toDomain);
  }
}
