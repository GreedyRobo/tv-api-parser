import express from "express";
import * as dotenv from "dotenv";
import { Connection } from "./shared/db";
import { generateProcessedRecordsRouter } from "./domains/processedRecords";

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

//TODO:: Fix ts-node-dev reloading
//TODO:: Fix build folder location

async function start() {
  const connection = new Connection();

  const db = await connection.connect();

  app.use("/processed-records", generateProcessedRecordsRouter(db));

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start().catch(console.error);
