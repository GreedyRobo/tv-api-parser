import * as mongoDB from "mongodb";

export class Connection {
  private client: mongoDB.MongoClient;

  constructor() {
    this.client = new mongoDB.MongoClient(
      `mongodb://root:root@localhost:27017/`, //TODO:: .env
    );
  }

  async connect() {
    await this.client.connect();

    const database = this.client.db("test"); //TODO:: .env

    console.log(`Successfully connected to database: ${database.databaseName}`);

    return database;
  }
}
