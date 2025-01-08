"use server";

import { getInjection } from "@/di/container";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";

export async function getDocumentById(id: string) {
  const getDocumentByIdController = getInjection("IGetDocumentByIdController");

  let document;
  try {
    document = await getDocumentByIdController(id);
    return document;
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { error: "Document not found" };
    }
    if (err instanceof InputParseError) {
      return { error: "Error in input data" };
    }
    return {
      error:
        "An error happened while fetching a document. The developers have been notified. Please try again later.",
    };
  }
}
