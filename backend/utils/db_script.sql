CREATE DATABASE demonstrantiondb;

USE demonstrantiondb;

CREATE TABLE populationcensus(
    id INT AUTO_INCREMENT,
    state VARCHAR(32),
    city VARCHAR(32),
    population INT,
    PRIMARY KEY(id)
);

ALTER TABLE populationcensus ADD INDEX state_index (state);