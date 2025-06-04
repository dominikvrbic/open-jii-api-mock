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

  public findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
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

  public createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  public updateUser(id: string, updatedUser: Partial<User>): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updatedUser,
        updatedAt: new Date().toISOString(),
      };
      return this.users[index];
    }
    return undefined;
  }

  public deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  public getUsersPaginated(
    limit: number = 10,
    offset: number = 0,
  ): {
    users: User[];
    total: number;
    limit: number;
    offset: number;
  } {
    const total = this.users.length;
    const users = this.users.slice(offset, offset + limit);
    return { users, total, limit, offset };
  }
}
