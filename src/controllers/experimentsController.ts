import { Request, Response } from "express";

import { DataService } from "../services/dataService";
import { Experiment } from "../types";

export class ExperimentsController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  public createExperiment = (req: Request, res: Response): void => {
    const experiment: Experiment = req.body;
    const newExperiment = this.dataService.createExperiment(experiment);
    res.status(201).json(newExperiment);
  };

  public listExperiments = (req: Request, res: Response): void => {
    const experiments = this.dataService.getExperiments();
    res.status(200).json(experiments);
  };

  public getExperiment = (req: Request, res: Response): void => {
    const { id } = req.params;
    const experiment = this.dataService.getExperimentById(id);
    if (experiment) {
      res.status(200).json(experiment);
    } else {
      res.status(404).json({ message: "Experiment not found" });
    }
  };

  public updateExperiment = (req: Request, res: Response): void => {
    const { id } = req.params;
    const updatedData: Experiment = req.body;
    const updatedExperiment = this.dataService.updateExperiment(
      id,
      updatedData,
    );
    if (updatedExperiment) {
      res.status(200).json(updatedExperiment);
    } else {
      res.status(404).json({ message: "Experiment not found" });
    }
  };

  public deleteExperiment = (req: Request, res: Response): void => {
    const { id } = req.params;
    const success = this.dataService.deleteExperiment(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Experiment not found" });
    }
  };
}
