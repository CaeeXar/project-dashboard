const sqlite3 = require('sqlite3');
const sqlite = require("sqlite");

async function openDb() {
    return sqlite.open({
        filename: process.env.DB_PATH,
        // filename: "D:\\sqlite\\DB\\project-dashboard.db",
        driver: sqlite3.Database
    });
}

async function migrate() {
    const db = await openDb();
    db.migrate({ force: "last", migrationsPath: "./migrations/" })
}

async function getProjectStatus() {
    const db = await openDb();
    return db.all(`SELECT * FROM PROJECT_STATUS`);
}

async function getAllProjects() {
    const db = await openDb();
    return db.all(`SELECT p.*, ps.id as statusId, ps.COLORCODE, ps.status 
                   FROM PROJECTS p JOIN PROJECT_STATUS ps ON p.STATUS = ps.ID`);
}

async function getProjectById(id) {
    const db = await openDb();
    return db.get(`SELECT p.*, ps.id as statusId, ps.COLORCODE, ps.status 
                   FROM PROJECTS p JOIN PROJECT_STATUS ps ON p.STATUS = ps.ID
                   WHERE p.id = ${id}`);
}

async function updateProject(project) {
    const { colorCode, description, id, logo, status, statusId, title, version } = project;

    // const db = await openDb();

    // return db.run(`
    //     UPDATE PROJECT
    //     SET title = ${title},
    //         description = ${description},
    //         logo = ${logo},
    //         version = ${version},
    //         status = ${status}
    //     WHERE id = ${id};  
    // `);
}

const config = {
    openDb,
    migrate,
    getProjectStatus,
    getAllProjects,
    getProjectById,
    updateProject,
}

module.exports = config;