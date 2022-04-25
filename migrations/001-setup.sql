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
    status TEXT REFERENCES PROJECT_STATUS
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

INSERT INTO PROJECTS (title, description, logo, version, status) 
    VALUES ('One Word', 'A simple password-manager.', 'oneWord.svg', '0.0.0', 'HOLD');
INSERT INTO PROJECTS (title, description, logo, version, status) 
    VALUES ('RC-Manager', 'A tool to manage everything for your RC-experience. Get yourself an overview of all your LiPo''s, PID-tuning, rates, etc.', NULL, '0.0.0', 'WORK');

-- Down
DROP TABLE PROJECT_STATUS;
DROP TABLE PROJECTS;