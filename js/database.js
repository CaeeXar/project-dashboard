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
    return db.all(`SELECT p.id, p.title, p.description, p.logo, p.version, 
                          p.statusId, ps.colorCode, ps.status
                   FROM PROJECTS p JOIN PROJECT_STATUS ps ON p.statusId = ps.id`);
}

async function getProjectById(id) {
    const db = await openDb();
    return db.get(`SELECT p.id, p.title, p.description, p.logo, p.version, 
                          p.statusId, ps.colorCode, ps.status
                   FROM PROJECTS p JOIN PROJECT_STATUS ps ON p.statusId = ps.id
                   WHERE p.id = ${id}`);
}

async function updateProject(project) {
    const { id, title, description, version, logo, statusId } = project;
    const db = await openDb();

    return db.run(`
        UPDATE PROJECTS
        SET title = '${title}',
            description = '${description}',
            --logo = ${logo},
            version = '${version}',
            statusId = '${statusId}'
        WHERE id = ${(id)}; 
    `);
}

async function insertProject(project) {
    const { title, description, version, logo, statusId } = project;
    const db = await openDb();

    return db.run(`
        INSERT INTO PROJECTS (title, description, version, logo, statusId) 
        VALUES ('${title}',
                '${description}',
                '${version}',
                NULL,
                '${statusId}'
        ); 
    `);
}

const config = {
    openDb,
    migrate,
    getProjectStatus,
    getAllProjects,
    getProjectById,
    updateProject,
    insertProject,
}

module.exports = config;