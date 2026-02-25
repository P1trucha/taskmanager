# Task Manager

## Autor
Piotr Mazepka, nr albumu: 95269

## Opis projektu
Task Manager - Aplikacja służąca do zarządzania codziennymi zadaniami w grupie lub indywidualnie. Aplikacja zbudowana w architekturze 3 warstwowej. Użytkownik będzie mógł się zarejestrować do aplikacji, będzie mógł się do niej logować aby nie tracić postępu. Aplikacja umożliwia działania typu CRUD do tworzenia treści, modyfikacje lub usuwanie.

Użytkownik może:
- zarejestrować konto,
- zalogować się do systemu,
- tworzyć zadania (CREATE),
- przeglądać zadania (READ),
- edytować zadania (UPDATE),
- usuwać zadania (DELETE).

## Stos technologiczny
- Frontend: Next.js
- Backend: Node.js (Express)
- Database: PostgreSQL
- Konteneryzacja: Docker + Docker Compose
 
## Architektura
Aplikacja oparta jest na architekturze 3-warstwowej:
- Warstwa prezentacji (Next.js)
- Warstwa aplikacyjna (Express API)
- Warstwa danych (PostgreSQL)
Diagram: `docs/architecture.png`
Kod diagramu: `docs/architecture.mmd`

 Artefakt 2 – Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose).

Instalacja NextJS dla frontend:

- npx create-next-app@latest

## Środowisko wielokontenerowe
Projekt jest uruchamiany jako środowisko wielokontenerowe przy użyciu Docker Composer 

Uruchamiane są 3 kontenery:

- `taskmanager-frontend`
- `taskmanager-backend`
- `taskmanager-database`

Kontenery komunikują się wewnętrznie w jednej sieci Docker.

Uruchomienie aplikacji:

```bash
docker compose up --build

Zatrzymanie kontenerów:

```bash
docker compose down

Sprawdzenie statusu:

docker compose ps 