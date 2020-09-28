CREATE DATABASE portfolio_database;

USE portfolio_database;

CREATE TABLE chat_room (
    username VARCHAR(24),
    chat VARCHAR(100),
    data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
