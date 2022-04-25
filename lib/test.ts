import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import * as fs from 'fs';

export default async function loadData() {
    return fs.readFileSync(process.env.DB_PATH || "", "utf-8");

    // return open({
    //     filename: process.env.DB_PATH || "",
    //     driver: sqlite3.Database
    // }).then(async (db) => {
    //     return await db.get('SELECT * FROM test');
    // });

};