-- Création de la base de données.
CREATE DATABASE IF NOT EXISTS calcul;

USE calcul;

-- Création des TABLES

-- USERS --
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE
);

-- SCORES --
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    score INT,
    num_exercises INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Valeurs de test
INSERT INTO users (name) VALUES ('Malcom');
INSERT INTO users (name) VALUES ('Johnny');
INSERT INTO users (name) VALUES ('Melo');

INSERT INTO scores (user_id, score, num_exercises) VALUES (1, 5, 10);
INSERT INTO scores (user_id, score, num_exercises) VALUES (2, 8, 12);
INSERT INTO scores (user_id, score, num_exercises) VALUES (3, 6, 15);
