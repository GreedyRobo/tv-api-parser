import { ProcessedRecordsRepository } from "./processedRecords.repository";
import { Payload, Query } from "./processedRecords.validator";
import { ProcessedRecordInput } from "./processedRecords.entity";
import { addDays, startOfDay } from "../../shared/utils";

export class ProcessedRecordsService {
  private readonly repository: ProcessedRecordsRepository;

  constructor(repository: ProcessedRecordsRepository) {
    this.repository = repository;
  }

  public async findAll({ date }: Query) {
    const dateFromInclusive = date ? startOfDay(date) : null;
    const dateToExclusive = date ? startOfDay(addDays(date, 1)) : null;

    return await this.repository.findAll({
      dateToExclusive,
      dateFromInclusive,
    });
  }

  public async insertData(payload: Payload) {
    const items = payload.data.map((item) => {
      return new ProcessedRecordInput({
        ticker: item.d[0],
        name: item.d[1],
        price: item.d[6],
        currency: item.d[16],
        exchange: item.d[27],
        rsi: item.d[25],
        lowest52WeekPrice: item.d[26],
        date: new Date(),
      });
    });

    await this.repository.insertMany(items);
  }
}
