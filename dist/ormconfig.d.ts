declare const _default: DataSource;
export default _default;
export namespace dbConfig {
    let type: string;
    let host: string;
    let port: number;
    let username: string;
    let password: string;
    let database: string;
    let entities: string[];
    let synchronize: boolean;
    let migrations: string[];
    let migrationsTableName: string;
    let seeds: string[];
}
import { DataSource } from "typeorm";
