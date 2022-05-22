-- Up
CREATE TABLE PROJECT_STATUS (
    id TEXT PRIMARY KEY,
    status TEXT,
    colorCode TEXT 
);

CREATE TABLE PROJECTS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    logo TEXT NULL,
    version TEXT,
    statusId TEXT REFERENCES PROJECT_STATUS,
    externalPath TEXT NULL
);

INSERT INTO PROJECT_STATUS (id, status, colorCode) 
    VALUES ('IDEA', 'Idea', '#1976d2');
INSERT INTO PROJECT_STATUS (id, status, colorCode) 
    VALUES ('WORK', 'In progress', '#ffb302');
INSERT INTO PROJECT_STATUS (id, status, colorCode) 
    VALUES ('STAB', 'Stable', '#88a28b');
INSERT INTO PROJECT_STATUS (id, status, colorCode) 
    VALUES ('HOLD', 'On hold', '#7f7f7f');
INSERT INTO PROJECT_STATUS (id, status, colorCode) 
    VALUES ('DISC', 'Discarded', '#b3533a');

INSERT INTO PROJECTS (title, description, logo, version, statusId, externalPath) 
    VALUES (
        'Project-Dashboard', 
        'A custom dashboard for visualizing all my different projects.',
         NULL, 
         '1.0.1', 
         'STAB', 
         '/'
    );
INSERT INTO PROJECTS (title, description, logo, version, statusId, externalPath) 
    VALUES (
        'One Word', 
        'A simple custom password-manager of my own needs. It''s only an idea so far.', 
        '1651006024936_oneWord.svg', 
        '0.0.1', 
        'IDEA',
        NULL
    );
INSERT INTO PROJECTS (title, description, logo, version, statusId, externalPath) 
    VALUES (
        'RC-Manager', 
        'A tool to manage everything for your RC-experience. Get yourself an overview of all your LiPo''s, builds and their settings, etc.', 
        NULL, 
        '0.0.1', 
        'IDEA', 
        NULL
    );

-- Down
DROP TABLE PROJECT_STATUS;
DROP TABLE PROJECTS;