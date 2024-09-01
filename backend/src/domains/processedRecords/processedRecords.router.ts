import { Router } from "express";
import { Db } from "mongodb";
import { ProcessedRecordsController } from "./processedRecords.controller";
import { ProcessedRecordsRepository } from "./processedRecords.repository";
import { ProcessedRecordsService } from "./processedRecords.service";

export const generateProcessedRecordsRouter = (database: Db) => {
  const router = Router();

  const repository = new ProcessedRecordsRepository(database);
  const service = new ProcessedRecordsService(repository);
  const controller = new ProcessedRecordsController(service);

  router.get("/", async (req, res) => {
    return await controller.findAll(req, res);
  });

  router.post("/submit", async (req, res) => {
    return await controller.insertData(req, res);
  });

  return router;
};
