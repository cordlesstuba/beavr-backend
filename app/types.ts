export type Validation = {
  id: string;
  validatedAt: string;
  remarks: string | null;
};

export type Version = {
  id: string;
  versionNumber: string;
  fileUrl: string;
  expiresAt: string;
  validation: Validation | null;
};

export type Document = {
  id: string;
  name: string;
  description: string;
  versions: Version[];
};

export type Requirement = {
  id: string;
  name: string;
  description: string;
  progress: number;
};
