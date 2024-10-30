-- Migration number: 0001 	 2024-10-30T03:58:10.615Z
CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    name TEXT NOT NULL
);

insert into users (email, name) values ('test@test.com', 'test');
insert into users (email, name) values ('test2@test.com', 'test2');
insert into users (email, name) values ('test3@test.com', 'test3');