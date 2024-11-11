-- Migration number: 0001 	 2024-10-30T03:58:10.615Z
CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    sub TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    bio TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    deleted_at DATETIME
);

CREATE TABLE settings (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE prompts (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    prompt TEXT NOT NULL
);

insert into users (sub, email, name) values ('auth0|6666666666666666', 'test@test.com', 'Test User');