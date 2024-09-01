import { Request, Response } from "express";
import { ProcessedRecordsService } from "./processedRecords.service";
import { payloadValidator, queryValidator } from "./processedRecords.validator";

export class ProcessedRecordsController {
  private readonly service: ProcessedRecordsService;

  constructor(service: ProcessedRecordsService) {
    this.service = service;
  }

  public async findAll(req: Request, res: Response) {
    const { success, data, error } = queryValidator.safeParse(req.query);

    if (!success && error) {
      res.status(400).send(error.format());
      return;
    }

    const result = await this.service.findAll(data);

    res.status(200).json(result);
  }

  public async insertData(req: Request, res: Response) {
    const { success, data, error } = payloadValidator.safeParse(req.body);

    if (!success && error) {
      res.status(400).send(error.format());
      return;
    }

    await this.service.insertData(data);

    res.status(204).end();
  }
}
