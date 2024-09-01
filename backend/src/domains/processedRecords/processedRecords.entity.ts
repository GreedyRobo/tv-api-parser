export class ProcessedRecordInput {
  constructor(data: ProcessedRecordInput) {
    Object.assign(this, data);
  }

  readonly ticker: string;

  readonly name: string;

  readonly price: number;

  readonly currency: string;

  readonly exchange: string;

  readonly rsi: number;

  readonly lowest52WeekPrice: number;

  readonly date: Date;
}

export class ProcessedRecord extends ProcessedRecordInput {
  constructor(id: string, data: ProcessedRecordInput) {
    super(data);

    this.id = id;
  }

  readonly id: string;
}
