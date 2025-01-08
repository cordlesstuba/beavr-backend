import { expect, it } from "vitest";

import { getInjection } from "@/di/container";

const getDocumentByIdUseCase = getInjection("IGetDocumentByIdUseCase");
const dateTimeService = getInjection("IDateTimeService");

it("should return document", async () => {
  await expect(getDocumentByIdUseCase("1")).resolves.toMatchObject({
    id: "1",
    name: "Doc1",
    description: "Description 1",
    versions: [
      {
        id: "v1",
        versionNumber: "1.0",
        fileUrl: "http://example.com/file1",
        expiresAt: dateTimeService.getCurrentDateTimePlusDays(365),
        validation: {
          id: "val1",
          validatedAt: dateTimeService.getCurrentDateTime(),
          remarks: "Valid",
        },
      },
      {
        id: "v2",
        versionNumber: "1.1",
        fileUrl: "http://example.com/file2",
        expiresAt: dateTimeService.getCurrentDateTimeMinusDays(365),
        validation: null,
      },
    ],
  });
});
