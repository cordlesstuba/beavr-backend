import { PrismaClient } from "@prisma/client";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

interface DocumentRow {
  Document: string;
  name: string;
  description: string;
}

interface RequirementRow {
  "Requirement name": string;
  "Requirement description": string;
  Documents: string;
}
const prisma = new PrismaClient();

function parseCsvFile<T>(filePath: string): Promise<T[]> {
  const rows: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data: T) => {
        rows.push(data);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

async function resetDatabase() {
  await prisma.requirement.deleteMany();
  await prisma.document.deleteMany();
}

async function main() {
  resetDatabase();

  const documentsFile = path.join(__dirname, "data", "documents.csv");
  const documents = await parseCsvFile<DocumentRow>(documentsFile);

  for (const doc of documents) {
    await prisma.document.create({
      data: {
        key: doc.Document,
        name: doc.name,
        description: doc.description,
      },
    });
  }

  const requirementsFile = path.join(__dirname, "data", "requirements.csv");
  const requirements = await parseCsvFile<RequirementRow>(requirementsFile);
  for (const req of requirements) {
    const docKeys = req.Documents.split(",").map((key) => key.trim());

    await prisma.requirement.create({
      data: {
        name: req["Requirement name"],
        description: req["Requirement description"],
        documents: {
          connect: docKeys.map((key) => ({ key })),
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
