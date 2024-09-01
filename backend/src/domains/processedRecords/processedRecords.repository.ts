import * as mongoDB from "mongodb";
import {
  ProcessedRecordInput,
  ProcessedRecord,
} from "./processedRecords.entity";

type Filters = {
  dateFromInclusive?: Date | null;
  dateToExclusive?: Date | null;
};

export class ProcessedRecordsRepository {
  private readonly collection: mongoDB.Collection<ProcessedRecordInput>;

  constructor(database: mongoDB.Db) {
    this.collection =
      database.collection<ProcessedRecordInput>("processedRecords");

    console.log(
      `Successfully connected to collection: ${this.collection.collectionName}`,
    );
  }

  public async findAll(filters?: Filters) {
    const mongoFilter = this.buildFilter(filters);

    const items = await this.collection.find(mongoFilter).toArray();

    return items.map(
      (item) =>
        new ProcessedRecord(item._id.toString(), {
          rsi: item.rsi,
          date: item.date,
          ticker: item.ticker,
          name: item.name,
          price: item.price,
          exchange: item.exchange,
          currency: item.currency,
          lowest52WeekPrice: item.lowest52WeekPrice,
        }),
    );
  }

  public async insertMany(items: ProcessedRecordInput[]) {
    await this.collection.insertMany(items);
  }

  private buildFilter(filters?: Filters): mongoDB.Filter<ProcessedRecordInput> {
    const query: { [key: string]: unknown } = {};

    if (filters?.dateFromInclusive && filters?.dateToExclusive) {
      query["date"] = {
        $gte: filters.dateFromInclusive ?? undefined,
        $lt: filters.dateToExclusive ?? undefined,
      };
    }

    return query;
  }
}
