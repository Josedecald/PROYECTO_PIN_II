SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE posts (
    id INT AUTO_INCREMENT,
    text VARCHAR(255),
    publicationTime TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE responses (
    id INT AUTO_INCREMENT,
    post_id INT,
    text VARCHAR(255),
    publicationTime TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

