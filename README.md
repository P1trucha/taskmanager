Task Manager
Autor

Piotr Mazepka
Nr albumu: 95269

Opis projektu

Task Manager to aplikacja webowa służąca do zarządzania codziennymi zadaniami zarówno indywidualnie jak i w grupie.
System umożliwia użytkownikom tworzenie, przeglądanie, edytowanie oraz usuwanie zadań.

Aplikacja została zaprojektowana w architekturze trójwarstwowej, w której oddzielono warstwę prezentacji, logikę aplikacji oraz warstwę danych.

System umożliwia wykonywanie operacji CRUD:

CREATE – tworzenie nowych zadań

READ – przeglądanie listy zadań

UPDATE – edycję istniejących zadań

DELETE – usuwanie zadań

Docelowo aplikacja może zostać rozszerzona o funkcjonalności takie jak:

rejestracja użytkownika

logowanie użytkownika

zapisywanie postępu użytkownika

Stos technologiczny

Projekt został zbudowany z wykorzystaniem następujących technologii:

Warstwa	Technologia
Frontend	Next.js
Backend	.NET Web API
Baza danych	PostgreSQL
Konteneryzacja	Docker + Docker Compose
API	REST
Architektura systemu

Aplikacja została zaprojektowana w architekturze 3-warstwowej:

Warstwa prezentacji

Frontend aplikacji napisany w Next.js, odpowiedzialny za interfejs użytkownika.

Warstwa aplikacyjna

Backend w postaci REST API, który obsługuje logikę aplikacji oraz komunikację z bazą danych.

Warstwa danych

Baza danych PostgreSQL, w której przechowywane są zadania.

Diagram architektury systemu znajduje się w katalogu:

docs/architecture.png

Kod diagramu:

docs/architecture.mmd
Środowisko wielokontenerowe

Projekt uruchamiany jest jako środowisko wielokontenerowe przy użyciu Docker Compose.

Uruchamiane są trzy kontenery:

Kontener	Opis
taskmanager-frontend	aplikacja frontendowa
taskmanager-backend	backend REST API
taskmanager-database	baza danych PostgreSQL

Kontenery komunikują się wewnętrznie w jednej sieci Docker.

Uruchomienie projektu

Aby uruchomić aplikację należy w katalogu projektu wykonać polecenie:

docker compose up --build

Po uruchomieniu aplikacja będzie dostępna pod adresami:

Frontend:

http://localhost:8080

Backend API:

http://localhost:8081

Swagger (dokumentacja API):

http://localhost:8081/swagger
Zarządzanie kontenerami

Zatrzymanie kontenerów:

docker compose down

Sprawdzenie statusu kontenerów:

docker compose ps

Podgląd logów aplikacji:

docker compose logs
Endpointy API
Pobranie wszystkich zadań
GET /api/tasks

Przykład użycia:

curl http://localhost:8081/api/tasks
Dodanie nowego zadania
POST /api/tasks

Przykład użycia:

curl.exe -X POST http://localhost:8081/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Test zadania\",\"description\":\"Dodane przez curl\",\"status\":\"todo\"}"
Aktualizacja zadania
PUT /api/tasks/{id}
Usunięcie zadania
DELETE /api/tasks/{id}
Struktura projektu
taskmanager
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Services
│   ├── Repositories
│   └── Program.cs
│
├── frontend
│   ├── pages
│   ├── components
│   └── package.json
│
├── database
│   └── init.sql
│
├── docker-compose.yml
└── README.md
Testowanie API

API można testować przy użyciu:

Swagger UI

curl

Postman

Swagger dostępny jest pod adresem:

http://localhost:8081/swagger