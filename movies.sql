CREATE TABLE movie (
  id BINARY PRIMARY KEY DEFAULT UUID(),
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  poster TEXT,
  rate DECIMAL(2, 1) UNSIGNED NOT NULL  
);

CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE  
);

CREATE TABLE movie_genres (
  movie_id BINARY(16) REFERENCES movies(id),
  genre_id INT REFERENCES genres(id),
  PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(DEFAULT, 'Interstellar', 2014,'Christopher Nolan',180,'https://mir-s3-cdn-cf.behance.net/project_modules/hd/8d8f28105415493.619ded067937d.jpg',8.1),
(DEFAULT, 'Jurassic Park', 1993,'Steven Spielberg',120,'https://pbs.twimg.com/media/FZvcritaQAAvRSA?format=jpg&name=900x900',9.2),
(DEFAULT, 'Avatar', 2009, 'James Cameron', 170,'https://pics.filmaffinity.com/Avatar-208925608-large.jpg',7.8);

INSERT INTO movie_genres (movie_id, genre_id) VALUES ((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
((SELECT id FROM movie WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'Avatar'), (SELECT id FROM genre WHERE name = 'Action'));