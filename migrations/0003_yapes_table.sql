-- Migration number: 0003 	 2024-10-30T04:25:42.654Z
-- create yapes table that recieve , title , amount , datetime (now) and image_url

create table yapes (
    id integer primary key autoincrement,
    title text not null,
    amount integer not null,
    image_url text not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp
);
