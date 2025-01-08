import { expect, it } from "vitest";

import { getInjection } from "@/di/container";

const createDocumentVersionUseCase = getInjection(
  "ICreateDocumentVersionUseCase"
);
const dateTimeService = getInjection("IDateTimeService");

it("should create document version", async () => {
  await expect(
    createDocumentVersionUseCase("1", "New version", "https://filepath.com")
  ).resolves.toMatchObject({
    id: "",
    versionNumber: "New version",
    fileUrl: "https://filepath.com",
    expiresAt: dateTimeService.getCurrentDateTimePlusDays(365),
    validation: null,
  });
});
