

/*INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID(), 'Interstellar', 2014,'Christopher Nolan',180,'https://mir-s3-cdn-cf.behance.net/project_modules/hd/8d8f28105415493.619ded067937d.jpg',8.1),
(UUID(), 'Jurassic Park', 1993,'Steven Spielberg',120,'https://pbs.twimg.com/media/FZvcritaQAAvRSA?format=jpg&name=900x900',9.2),
(UUID(), 'Avatar', 2009, 'James Cameron', 170,'https://pics.filmaffinity.com/Avatar-208925608-large.jpg',7.8);

INSERT INTO movie_genres (movie_id, genre_id) VALUES ((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
((SELECT id FROM movie WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'Avatar'), (SELECT id FROM genre WHERE name = 'Action'));*/

