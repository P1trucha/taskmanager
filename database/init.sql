CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50)
);

INSERT INTO tasks (title, description, status)
SELECT 'Przygotować Artefakt 3', 'Stworzyć działającą warstwę prezentacji', 'todo'
WHERE NOT EXISTS (
  SELECT 1 FROM tasks WHERE title = 'Przygotować Artefakt 3'
);

INSERT INTO tasks (title, description, status)
SELECT 'Zaktualizować README', 'Dodać opis frontendu i Dockerfile', 'done'
WHERE NOT EXISTS (
  SELECT 1 FROM tasks WHERE title = 'Zaktualizować README'
);

INSERT INTO tasks (title, description, status)
SELECT 'Uruchomić front w Dockerze', 'Sprawdzić działanie pod localhost:8080', 'todo'
WHERE NOT EXISTS (
  SELECT 1 FROM tasks WHERE title = 'Uruchomić front w Dockerze'
);