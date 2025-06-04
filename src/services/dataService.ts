import { readFileSync } from "fs";
import { join } from "path";

import { Experiment, User } from "../types";

export class DataService {
  private experiments: Experiment[];
  private users: User[];

  constructor() {
    const mockDataPath = join(__dirname, "../../data/mock-data.json");
    const mockData = JSON.parse(readFileSync(mockDataPath, "utf-8"));
    this.experiments = mockData.experiments;
    this.users = mockData.users;
  }

  public getExperiments(): Experiment[] {
    return this.experiments;
  }

  public getExperimentById(id: string): Experiment | undefined {
    return this.experiments.find((experiment) => experiment.id === id);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public createExperiment(experiment: Experiment): Experiment {
    this.experiments.push(experiment);
    return experiment;
  }

  public updateExperiment(
    id: string,
    updatedExperiment: Partial<Experiment>,
  ): Experiment | undefined {
    const index = this.experiments.findIndex(
      (experiment) => experiment.id === id,
    );
    if (index !== -1) {
      this.experiments[index] = {
        ...this.experiments[index],
        ...updatedExperiment,
      };
      return this.experiments[index];
    }
    return undefined;
  }

  public deleteExperiment(id: string): boolean {
    const index = this.experiments.findIndex(
      (experiment) => experiment.id === id,
    );
    if (index !== -1) {
      this.experiments.splice(index, 1);
      return true;
    }
    return false;
  }
}
