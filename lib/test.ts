import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function loadData() {
    return open({
        filename: process.env.DB_PATH || "",
        driver: sqlite3.Database
    }).then(async (db) => {
        return await db.get('SELECT * FROM test');
    });
};