import { expect, it } from "vitest";

import { getInjection } from "@/di/container";

const getRequirementsUseCase = getInjection("IGetRequirementsUseCase");

it("should return requirements", async () => {
  await expect(getRequirementsUseCase()).resolves.toMatchObject([
    {
      id: "climate-change-action-plan",
      name: "Climate change action plan oversight",
      description:
        "Internal monitoring and governance are in place to oversee the implementation and effectiveness of the action plan related to climate change adaptation and mitigation, ensuring objectives are met and improvements are made",
    },
  ]);
});
