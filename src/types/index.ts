export interface Experiment {
  id: string;
  name: string;
  description?: string;
  status:
    | "provisioning"
    | "provisioning_failed"
    | "active"
    | "stale"
    | "archived"
    | "published";
  visibility: "private" | "public";
  embargoIntervalDays: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  data?: any; // Define the structure of data if known
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentMember {
  experimentId: string;
  userId: string;
  role: "admin" | "member";
  joinedAt: string;
}
